export class AllPairsDto {
  constructor(
    public readonly pair: {
      id: number;
      name: string;
    }[],
  ) {}
}
export interface IGetAllPairsQueryService {
  execute(): Promise<AllPairsDto>;
}
