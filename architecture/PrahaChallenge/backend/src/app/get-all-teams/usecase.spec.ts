import { prismaMock } from '../../singleton';
import { GetAllTeamQueryService } from '../../infrastructure/query-service/get-all-teams';
import { AllTeamsDto } from './query-service';
import { GetAllTeamsUsecase } from './usecase';

describe('GetAllTeamsUsecase', () => {
  test('AllTeamsDtoを返す', () => {
    const getAllTeamsUseCase = new GetAllTeamsUsecase(
      new GetAllTeamQueryService(),
    );

    const allTeams = [
      {
        id: 1,
        name: '1',
      },
      {
        id: 2,
        name: '2',
      },
    ];

    prismaMock.teams.findMany.mockResolvedValue(allTeams);
    expect(getAllTeamsUseCase.do()).resolves.toEqual(new AllTeamsDto(allTeams));
  });
});
