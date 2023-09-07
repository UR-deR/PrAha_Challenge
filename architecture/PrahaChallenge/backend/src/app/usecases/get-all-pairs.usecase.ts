import { Inject, Injectable } from '@nestjs/common';
import { Pair } from '../../domain/pair/pair';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { IPairRepository } from '../../domain/pair/pair-repository';
import { Participant } from '../../domain/participant/participant';
import { IParticipantRepository } from '../../domain/participant/participant-repository';

type PairDto = {
  id: string;
  name: string;
  participants: {
    id: string;
    name: string;
  }[];
}[];

export class GetAllPairsDto {
  public readonly value: PairDto;

  constructor(allPairs: Pair[], allParticipants: Participant[]) {
    this.value = allPairs.map((pair) => ({
      id: pair.id.value,
      name: pair.name.value,
      participants: pair.pairMemberIds.map((pairMemberId) => {
        const participant = allParticipants.find((participant) =>
          participant.id.equals(pairMemberId),
        );

        if (!participant) {
          throw new Error(`
            Participant not found. pairMemberId: ${pairMemberId.value}
          `);
        }

        return {
          id: participant.id.value,
          name: participant.name,
        };
      }),
    }));
  }
}

@Injectable()
export class GetAllPairsUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private readonly PairRepository: IPairRepository,
    @Inject(INJECTION_TOKENS.PARTICIPANT_REPOSITORY)
    private readonly ParticipantRepository: IParticipantRepository,
  ) {}
  public async do(): Promise<GetAllPairsDto> {
    const allPairs = await this.PairRepository.findAll();
    const allParticipants = await this.ParticipantRepository.findAll();
    return new GetAllPairsDto(allPairs, allParticipants);
  }
}
