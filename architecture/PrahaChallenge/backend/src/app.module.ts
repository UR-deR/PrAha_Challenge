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
// import { TeamController } from './controller/team/team.controller';
// import { PairController } from './controller/pair/pair.controller';
// import { AttendeeController } from './controller/attendee/attendee.controller';
// import { AttendeeRepository } from './infrastructure/repository/attendee/repository';
// import { GetAllTeamsUsecase } from './app/get-all-teams/usecase';
// import { GetAllPairsUsecase } from './app/get-all-pairs/usecase';
// import { PROVIDERS } from './constants';
// import { GetAllAttendeesUsecase } from './app/get-all-attendees/usecase';
// import { PairRepository } from './infrastructure/repository/pair/repository';
// import { TeamRepository } from './infrastructure/repository/team/repository';
// import { UpdateAssignmentStatusUsecase } from './app/update-assignment-status/usecase';
// import { AssignmentController } from './controller/assignment/assignment.controller';
// import { AttendeeAssignmentStatusRepository } from './infrastructure/repository/assignment-status-by-attendee/repository';
// import { PairMemberAssigner } from './domain/pair/pair-member-assigner';
// import { AddNewAttendeeUsecase } from './app/add-new-attendee/usecase';
// import { DuplicatedEmailChecker } from './domain/attendee/duplicated-email-checker';

@Module({
  imports: [],
  controllers: [ParticipantController, PairController, TeamController],
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
    GetAllParticipantsUsecase,
    GetAllPairsUsecase,
    GetAllTeamsUsecase,
    RegisterNewParticipantUsecase,
    UpdateParticipantStatusUsecase,
    DuplicatedEmailChecker,
    ParticipantAssigner,

    // {
    //   provide: PROVIDERS.ATTENDEE_ASSIGNMENT_STATUS_REPOSITORY,
    //   useClass: AttendeeAssignmentStatusRepository,
    // },
    // UpdateAssignmentStatusUsecase,
    // GetAllAttendeesUsecase,
    // AddNewAttendeeUsecase,
    // GetAllTeamsUsecase,
    // GetAllPairsUsecase,
    // PairMemberAssigner,
    // DuplicatedEmailChecker,
  ],
})
export class AppModule {}
