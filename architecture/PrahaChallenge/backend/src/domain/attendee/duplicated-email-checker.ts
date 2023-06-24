import { IAttendeeRepository } from './repository';
import { Email } from '../email/model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DuplicatedEmailChecker {
  public constructor(
    @Inject('AttendeeRepository')
    private attendeeRepository: IAttendeeRepository,
  ) {}
  public async isDuplicated(email: Email): Promise<boolean> {
    const attendee = await this.attendeeRepository.findByEmail(email);
    return attendee ? true : false;
  }
}
