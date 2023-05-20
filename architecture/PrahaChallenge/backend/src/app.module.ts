import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamController } from './controller/team/team.controller';
import { PairController } from './controller/pair/pair.controller';
import { AttendeeController } from './controller/attendee/attendee.controller';

@Module({
  imports: [],
  controllers: [TeamController, PairController, AttendeeController],
  providers: [AppService],
})
export class AppModule {}
