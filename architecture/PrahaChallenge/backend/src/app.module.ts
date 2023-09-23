import { Module } from '@nestjs/common';
import { INJECTION_TOKENS } from './injection-tokens';
import { ParticipantRepository } from './infrastructure/repository/participant/participant.repository';
import { ParticipantController } from './controller/participant/participant.controller';
import { GetAllParticipantsUsecase } from './app/usecases/get-all-participants.usecase';
import { PairController } from './controller/pair/pair.controller';
import { PairRepository } from './infrastructure/repository/pair/pair.repository';
import { GetAllPairsUsecase } from './app/usecases/get-all-pairs.usecase';
import { TeamRepository } from './infrastructure/repository/team/team.repository';
import { GetAllTeamsUsecase } from './app/usecases/get-all-teams.usecase';
import { TeamController } from './controller/team/team.controller';
import { ParticipantAssignmentRepository } from './infrastructure/repository/participant-assignment/participant-assignment.repository';
import { ParticipantAssigner } from './domain-service/participant-assigner.service';
import { RegisterNewParticipantUsecase } from './app/usecases/register-new-participant.usecase';
import { DuplicatedEmailChecker } from './domain-service/duplicated-email-checker.service';
import { UpdateParticipantStatusUsecase } from './app/usecases/update-participant-status.usecase';
import { VacantPairFinder } from './domain-service/vacant-pair-finder.service';
import { PairSplitter } from './domain-service/pair-spliter.service';
import { InactiveParticipantRemover } from './domain-service/inactive-participant-remover.service';
import { SwapPairMembersUsecase } from './app/usecases/swap-pair-members.usecase';
import { SwapTeamPairUsecase } from './app/usecases/swap-team-pair.usecase';
import { TaskController } from './controller/task/task.controller';
import { ParticipantTaskStatusRepository } from './infrastructure/repository/participant-task-status/participant-task-status.repository';
import { UpdateTaskStatusUsecase } from './app/usecases/update-task-status.usecase';
import { SearchSpecificTaskStatusParticipants } from './infrastructure/query-serivice/search-specific-task-status-participants';
import { SearchSpecificTaskStatusParticipantsUsecase } from './app/usecases/search-specific-task-status-participants.usecase';

@Module({
  imports: [],
  controllers: [
    ParticipantController,
    PairController,
    TeamController,
    TaskController,
  ],
  providers: [
    {
      provide: INJECTION_TOKENS.PARTICIPANT_REPOSITORY,
      useClass: ParticipantRepository,
    },
    {
      provide: INJECTION_TOKENS.PAIR_REPOSITORY,
      useClass: PairRepository,
    },
    {
      provide: INJECTION_TOKENS.TEAM_REPOSITORY,
      useClass: TeamRepository,
    },
    {
      provide: INJECTION_TOKENS.PARTICIPANT_ASSIGNMENT_REPOSITORY,
      useClass: ParticipantAssignmentRepository,
    },
    {
      provide: INJECTION_TOKENS.PARTICIPANT_TASK_STATUS_REPOSITORY,
      useClass: ParticipantTaskStatusRepository,
    },
    {
      provide: INJECTION_TOKENS.SEARCH_SPECIFIC_TASK_STATUS_PARTICIPANTS,
      useClass: SearchSpecificTaskStatusParticipants,
    },
    GetAllParticipantsUsecase,
    GetAllPairsUsecase,
    GetAllTeamsUsecase,
    RegisterNewParticipantUsecase,
    UpdateParticipantStatusUsecase,
    UpdateTaskStatusUsecase,
    SwapPairMembersUsecase,
    SwapTeamPairUsecase,
    SearchSpecificTaskStatusParticipantsUsecase,
    DuplicatedEmailChecker,
    ParticipantAssigner,
    InactiveParticipantRemover,
    VacantPairFinder,
    PairSplitter,
  ],
})
export class AppModule {}
