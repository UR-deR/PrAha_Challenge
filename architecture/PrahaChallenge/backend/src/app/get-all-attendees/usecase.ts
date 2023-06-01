import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../constants';
import { IAttendeeRepository } from '../../domain/attendee/repository';
import { Attendee } from '../../domain/attendee/model';

type Dto = {
  id: string;
  name: string;
  email: string;
  status: string;
}[];

export class GetAllAttendeesDto {
  public readonly value: Dto;
  constructor(attendees: Attendee[]) {
    this.value = attendees.map(({ id, name, email, status }) => {
      return {
        id: id.value,
        name: name,
        email: email.value,
        status: status,
      };
    });
  }
}

@Injectable()
export class GetAllAttendeesUsecase {
  constructor(
    @Inject(PROVIDERS.ATTENDEE_REPOSITORY)
    private readonly attendeeRepository: IAttendeeRepository,
  ) {}
  async do(): Promise<GetAllAttendeesDto> {
    const attendees = await this.attendeeRepository.findAll();
    return new GetAllAttendeesDto(attendees);
  }
}
