import { Module } from '@nestjs/common';
import { TeamController } from './controller/team/team.controller';
import { PairController } from './controller/pair/pair.controller';
import { AttendeeController } from './controller/attendee/attendee.controller';
import { AttendeeRepository } from './infrastructure/repository/attendee/repository';
import { GetAllTeamsUsecase } from './app/get-all-teams/usecase';
import { GetAllPairsUsecase } from './app/get-all-pairs/usecase';
import { GetAllTeamsQueryService } from './infrastructure/query-service/get-all-teams';
import { GetAllPairsQueryService } from './infrastructure/query-service/get-all-pairs';
import { PROVIDERS } from './constants';

@Module({
  imports: [],
  controllers: [TeamController, PairController, AttendeeController],
  providers: [
    {
      provide: PROVIDERS.ATTENDEE_REPOSITORY,
      useClass: AttendeeRepository,
    },
    {
      provide: PROVIDERS.GET_ALL_TEAMS_QUERY_SERVICE,
      useClass: GetAllTeamsQueryService,
    },
    {
      provide: PROVIDERS.GET_ALL_PAIRS_QUERY_SERVICE,
      useClass: GetAllPairsQueryService,
    },
    GetAllTeamsUsecase,
    GetAllPairsUsecase,
  ],
  exports: [
    {
      provide: PROVIDERS.GET_ALL_PAIRS_QUERY_SERVICE,
      useClass: GetAllPairsQueryService,
    },
    {
      provide: PROVIDERS.GET_ALL_TEAMS_QUERY_SERVICE,
      useClass: GetAllTeamsQueryService,
    },
  ],
})
export class AppModule {}
