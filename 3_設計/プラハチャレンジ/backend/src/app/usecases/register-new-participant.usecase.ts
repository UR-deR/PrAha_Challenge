import { Inject, Injectable } from '@nestjs/common';
import { Participant } from '../../domain/participant/participant';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { IParticipantRepository } from '../../domain/participant/participant-repository';
import { DuplicatedEmailChecker } from '../../domain-service/duplicated-email-checker.service';
import { Email } from '../../domain/email/email';
import { ParticipantAssigner } from '../../domain-service/participant-assigner.service';

export type RegistrationParams = {
  name: string;
  email: string;
};

@Injectable()
export class RegisterNewParticipantUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.PARTICIPANT_REPOSITORY)
    private readonly participantRepository: IParticipantRepository,
    private readonly duplicatedEmailChecker: DuplicatedEmailChecker,
    private readonly participantAssigner: ParticipantAssigner,
  ) {}
  public async do(params: RegistrationParams): Promise<void> {
    const email = new Email(params.email);
    const isDuplicatedEmail = await this.duplicatedEmailChecker.isDuplicated(
      email,
    );
    if (isDuplicatedEmail) {
      throw new Error(`Duplicated email: ${params.email}`);
    }

    const newParticipant = Participant.create({
      name: params.name,
      email: email,
    });
    await this.participantRepository.save(newParticipant);
    await this.participantAssigner.assign(newParticipant);
  }
}
