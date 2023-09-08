import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { IParticipantRepository } from '../../domain/participant/participant-repository';
import { ParticipantId } from '../../domain/id/id';
import { ParticipantStatus } from '../../domain/participant/participant-status';
import { ParticipantAssigner } from '../../domain-service/participant-assigner.service';

export type UpdateParticipantStatusParams = {
  participantId: ParticipantId;
  newParticipantStatus: ParticipantStatus;
};

@Injectable()
export class UpdateParticipantStatusUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.PARTICIPANT_REPOSITORY)
    private readonly participantRepository: IParticipantRepository,
    private readonly participantAssigner: ParticipantAssigner,
  ) {}

  public async do(params: UpdateParticipantStatusParams): Promise<void> {
    const participant = await this.participantRepository.findById(
      params.participantId,
    );

    if (!participant) {
      throw new Error(
        `Participant not found. id: ${params.participantId.value}`,
      );
    }

    const updatedParticipant = participant.updateStatus(
      params.newParticipantStatus,
    );

    await this.participantRepository.save(updatedParticipant);

    const isActivated = params.newParticipantStatus.equals(
      ParticipantStatus.ACTIVE,
    );

    if (isActivated) {
      await this.participantAssigner.assign(updatedParticipant);
    } else {
      //休会・退会の場合
    }
  }
}
