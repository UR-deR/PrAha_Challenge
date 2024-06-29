import { Inject, Injectable } from '@nestjs/common';
import { IParticipantRepository } from '../domain/participant/participant-repository';
import { Email } from '../domain/email/email';
import { INJECTION_TOKENS } from '../injection-tokens';

@Injectable()
export class DuplicatedEmailChecker {
  public constructor(
    @Inject(INJECTION_TOKENS.PARTICIPANT_REPOSITORY)
    private participantRepository: IParticipantRepository,
  ) {}
  public async isDuplicated(email: Email): Promise<boolean> {
    const participant = await this.participantRepository.findByEmail(email);
    return participant !== null;
  }
}
