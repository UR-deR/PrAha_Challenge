import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamController } from './controller/team/team.controller';

@Module({
  imports: [],
  controllers: [TeamController],
  providers: [AppService],
})
export class AppModule {}
