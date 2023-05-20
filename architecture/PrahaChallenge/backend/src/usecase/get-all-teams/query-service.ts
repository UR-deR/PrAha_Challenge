export class AllTeamsDto {
  constructor(
    public readonly team: {
      id: number;
      name: string;
    }[],
  ) {}
}
export interface IGetAllTeamsQueryService {
  execute(): Promise<AllTeamsDto>;
}
