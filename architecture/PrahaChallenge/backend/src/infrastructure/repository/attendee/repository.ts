import { Injectable } from '@nestjs/common';
import { Attendee } from '../../../domain/attendee/model';
import { IAttendeeRepository } from '../../../domain/attendee/repository';
import { Email } from '../../../domain/email/model';
import prisma from '../../client/prisma-client';
import { AttendeeId } from '../../../domain/id/model';
import { AttendeeStatus } from '../../../domain/attendee-status/model';

@Injectable()
export class AttendeeRepository implements IAttendeeRepository {
  public async findById(id: AttendeeId): Promise<Attendee | null> {
    const attendee = await prisma.attendee.findFirstOrThrow({
      where: {
        id: id.value,
      },
      include: {
        status: true,
      },
    });

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

  public async findByIds(ids: AttendeeId[]): Promise<Attendee[]> {
    const allAttendees = prisma.attendee.findMany({
      where: {
        id: {
          in: ids.map((id) => id.value),
        },
      },
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

  public async findByEmail(email: Email): Promise<Attendee | null> {
    const attendee = await prisma.attendee.findFirstOrThrow({
      where: {
        email: email.value,
      },
      include: {
        status: true,
      },
    });

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

  public async insert(attendee: Attendee): Promise<void> {
    const activeAttendeeStatus = await prisma.attendeeStatus.findFirstOrThrow({
      where: {
        name: attendee.status,
      },
    });

    await prisma.attendee.create({
      data: {
        id: attendee.id.value,
        name: attendee.name,
        email: attendee.email.value,
        statusId: activeAttendeeStatus.id,
      },
    });
  }

  public async update(attendee: Attendee): Promise<void> {
    const activeAttendeeStatus = await prisma.attendeeStatus.findFirstOrThrow({
      where: {
        name: attendee.status,
      },
    });

    await prisma.attendee.update({
      where: {
        id: attendee.id.value,
      },
      data: {
        name: attendee.name,
        email: attendee.email.value,
        statusId: activeAttendeeStatus.id,
      },
    });
  }
}
