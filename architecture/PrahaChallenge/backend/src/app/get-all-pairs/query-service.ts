export class AllPairsDto {
  constructor(
    public readonly pair: {
      id: string;
      name: string;
    }[],
  ) {}
}
export interface IGetAllPairsQueryService {
  execute(): Promise<AllPairsDto>;
}
