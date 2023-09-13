import { ApiProperty } from '@nestjs/swagger';
import { SwapPairMembersUsecaseParam } from '../../../app/usecases/swap-pair-members.usecase';
import { PairId, ParticipantId } from '../../../domain/id/id';

export class SwapPairMembersRequest {
  @ApiProperty()
  member1: {
    participant_id: string;
    new_pair_id: string;
  };
  @ApiProperty()
  member2:
    | {
        participant_id: string;
        new_pair_id: string;
      }
    | undefined;
}

export const convertUsecaseParams = ({
  member1,
  member2,
}: SwapPairMembersRequest): SwapPairMembersUsecaseParam =>
  new SwapPairMembersUsecaseParam(
    {
      participantId: new ParticipantId(member1.participant_id),
      newPairId: new PairId(member1.new_pair_id),
    },
    member2
      ? {
          participantId: new ParticipantId(member2.participant_id),
          newPairId: new PairId(member2.new_pair_id),
        }
      : undefined,
  );
