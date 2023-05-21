import { prismaMock } from '../../singleton';
import { AllPairsDto } from './query-service';
import { GetAllPairsUsecase } from './usecase';
import { GetAllPairsQueryService } from '../../infrastructure/query-service/get-all-pairs';

describe('GetAllPairsUsecase', () => {
  test('AllPairsDtoを返す', () => {
    const getAllPairsUseCase = new GetAllPairsUsecase(
      new GetAllPairsQueryService(),
    );

    const allPairs = [
      {
        id: 1,
        name: 'a',
        team_id: 1,
      },
      {
        id: 2,
        name: 'b',
        team_id: 2,
      },
    ];

    prismaMock.pairs.findMany.mockResolvedValue(allPairs);
    expect(getAllPairsUseCase.do()).resolves.toEqual(new AllPairsDto(allPairs));
  });
});
