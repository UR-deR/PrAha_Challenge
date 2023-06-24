import { Email } from '../../domain/email/model';
import { IAttendeeRepository } from '../../domain/attendee/repository';
import { Attendee } from '../../domain/attendee/model';
import { PairMemberAssigner } from '../../domain/pair/pair-member-assigner';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../constants';
import { DuplicatedEmailChecker } from '../../domain/attendee/duplicated-email-checker';

export interface AddNewAttendeeCommand {
  name: string;
  email: Email;
}

@Injectable()
export class AddNewAttendeeUsecase {
  constructor(
    private readonly duplicatedEmailChecker: DuplicatedEmailChecker,
    @Inject(PROVIDERS.ATTENDEE_REPOSITORY)
    private readonly attendeeRepository: IAttendeeRepository,
    private readonly pairMemberAssigner: PairMemberAssigner,
  ) {}
  public async do(command: AddNewAttendeeCommand) {
    const isDuplicatedEmail = await this.duplicatedEmailChecker.isDuplicated(
      command.email,
    );
    if (isDuplicatedEmail) {
      throw new Error(`Duplicated email: ${command.email.value}`);
    }
    const newAttendee = Attendee.create({ ...command });
    await this.attendeeRepository.insert(newAttendee);
    await this.pairMemberAssigner.assign(newAttendee);
  }
}
