export class AllTeamsDto {
  constructor(
    public readonly teams: {
      id: string;
      name: string;
    }[],
  ) {}
}
export interface IGetAllTeamsQueryService {
  execute(): Promise<AllTeamsDto>;
}
