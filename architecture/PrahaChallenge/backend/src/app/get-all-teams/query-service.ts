export class AllTeamsDto {
  constructor(
    public readonly teams: {
      id: number;
      name: string;
    }[],
  ) {}
}
export interface IGetAllTeamsQueryService {
  execute(): Promise<AllTeamsDto>;
}
