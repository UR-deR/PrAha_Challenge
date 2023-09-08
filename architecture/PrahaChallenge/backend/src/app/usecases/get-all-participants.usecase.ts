import { Inject, Injectable } from '@nestjs/common';
import { Participant } from '../../domain/participant/participant';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { IParticipantRepository } from '../../domain/participant/participant-repository';

type ParticipantDto = {
  id: string;
  name: string;
  email: string;
  status: string;
}[];

export class GetAllParticipantsDto {
  public readonly value: ParticipantDto;

  constructor(allParticipants: Participant[]) {
    this.value = allParticipants.map((participant) => ({
      id: participant.id.value,
      name: participant.name,
      email: participant.email.value,
      status: participant.status.toString(),
    }));
  }
}

@Injectable()
export class GetAllParticipantsUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.PARTICIPANT_REPOSITORY)
    private readonly participantRepository: IParticipantRepository,
  ) {}
  public async do(): Promise<GetAllParticipantsDto> {
    const allParticipants = await this.participantRepository.findAll();
    return new GetAllParticipantsDto(allParticipants);
  }
}
