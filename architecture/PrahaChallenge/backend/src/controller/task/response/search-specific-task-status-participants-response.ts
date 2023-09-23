import { ApiProperty } from '@nestjs/swagger';
import { SearchSpecificTaskStatusParticipantsDto } from '../../../app/usecases/search-specific-task-status-participants.usecase';

class Participants {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class SearchSpecificTaskStatusParticipantsResponse {
  @ApiProperty()
  task_id: string;

  @ApiProperty()
  task_name: string;

  @ApiProperty()
  task_status: string;

  @ApiProperty({ type: () => [Participants] })
  participants: Participants[];

  constructor(dto: SearchSpecificTaskStatusParticipantsDto) {
    console.log(dto);

    this.task_id = dto.value[0].taskId.toString();
    this.task_name = dto.value[0].taskName;
    this.task_status = dto.value[0].taskStatus.toString();
    this.participants = dto.value[0].participants.map((participant) => {
      return new Participants(participant.id.toString(), participant.name);
    });
  }
}
