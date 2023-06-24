import { Module } from '@nestjs/common';
import { TeamController } from './controller/team/team.controller';
import { PairController } from './controller/pair/pair.controller';
import { AttendeeController } from './controller/attendee/attendee.controller';
import { AttendeeRepository } from './infrastructure/repository/attendee/repository';
import { GetAllTeamsUsecase } from './app/get-all-teams/usecase';
import { GetAllPairsUsecase } from './app/get-all-pairs/usecase';
import { PROVIDERS } from './constants';
import { GetAllAttendeesUsecase } from './app/get-all-attendees/usecase';
import { PairRepository } from './infrastructure/repository/pair/repository';
import { TeamRepository } from './infrastructure/repository/team/repository';
import { PairMemberAssigner } from './domain/pair/pair-member-assigner';
import { AddNewAttendeeUsecase } from './app/add-new-attendee/usecase';
import { DuplicatedEmailChecker } from './domain/attendee/duplicated-email-checker';

@Module({
  imports: [],
  controllers: [TeamController, PairController, AttendeeController],
  providers: [
    {
      provide: PROVIDERS.ATTENDEE_REPOSITORY,
      useClass: AttendeeRepository,
    },
    {
      provide: PROVIDERS.PAIR_REPOSITORY,
      useClass: PairRepository,
    },
    {
      provide: PROVIDERS.TEAM_REPOSITORY,
      useClass: TeamRepository,
    },
    GetAllAttendeesUsecase,
    AddNewAttendeeUsecase,
    GetAllTeamsUsecase,
    GetAllPairsUsecase,
    PairMemberAssigner,
    DuplicatedEmailChecker,
  ],
})
export class AppModule {}
