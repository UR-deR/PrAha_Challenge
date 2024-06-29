import { ApiProperty } from '@nestjs/swagger';
import { PairId, TeamId } from '../../../domain/id/id';
import { SwapTeamPairUsecaseParam } from '../../../app/usecases/swap-team-pair.usecase';

export class SwapTeamPairRequest {
  @ApiProperty()
  pair_id: string;
  @ApiProperty()
  new_team_id: string;
}

export const convertUsecaseParams = (
  request: SwapTeamPairRequest,
): SwapTeamPairUsecaseParam =>
  new SwapTeamPairUsecaseParam(
    new PairId(request.pair_id),
    new TeamId(request.new_team_id),
  );
