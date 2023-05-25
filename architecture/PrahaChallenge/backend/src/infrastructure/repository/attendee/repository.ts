import { Injectable } from '@nestjs/common';
import { Attendee } from '../../../domain/attendee/model';
import { IAttendeeRepository } from '../../../domain/attendee/repository';
import { Email } from '../../../domain/email/model';
import prisma from '../../client/prisma-client';
import { AttendeeId } from '../../../domain/attendee-id/model';
import { AttendeeStatus } from '../../../domain/attendee-status/model';

@Injectable()
export class AttendeeRepository implements IAttendeeRepository {
  public async findByEmail(email: Email): Promise<Attendee | null> {
    const attendee = await prisma.attendee.findFirst({
      where: {
        email: email.value,
      },
      include: {
        status: true,
      },
    });
    if (!attendee) {
      return null;
    }

    const attendeeStatus = Object.values(AttendeeStatus).find(
      (status) => status === attendee.status.name,
    );

    if (!attendeeStatus) {
      throw new Error(`Invalid attendee status. given: ${attendee.status}`);
    }

    return Attendee.reconstruct({
      id: new AttendeeId(attendee.id),
      name: attendee.name,
      email: new Email(attendee.email),
      status: attendeeStatus,
    });
  }

  public async findAll(): Promise<Attendee[]> {
    const allAttendees = prisma.attendee.findMany({
      include: {
        status: true,
      },
    });

    return allAttendees.then((attendees) =>
      attendees.map((attendee) => {
        const attendeeStatus = Object.values(AttendeeStatus).find(
          (status) => status === attendee.status.name,
        );

        if (!attendeeStatus) {
          throw new Error(`Invalid attendee status. given: ${attendee.status}`);
        }

        return Attendee.reconstruct({
          id: new AttendeeId(attendee.id),
          name: attendee.name,
          email: new Email(attendee.email),
          status: attendeeStatus,
        });
      }),
    );
  }

  public async save(attendee: Attendee): Promise<void> {
    const activeAttendeeStatus = await prisma.attendeeStatus.findFirst({
      where: {
        name: attendee.status,
      },
    });

    if (!activeAttendeeStatus) {
      throw new Error(`Invalid attendee status. given: ${attendee.status}`);
    }

    await prisma.attendee.create({
      data: {
        id: attendee.id.value,
        name: attendee.name,
        email: attendee.email.value,
        statusId: activeAttendeeStatus.id,
      },
    });
  }
}
