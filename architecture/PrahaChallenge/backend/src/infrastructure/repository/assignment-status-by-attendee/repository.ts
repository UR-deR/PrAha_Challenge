import { AttendeeAssignmentStatus } from '../../../domain/attendee-assignment-status/model';
import { IAttendeeAssignmentStatusRepository } from '../../../domain/attendee-assignment-status/repository';
import { AssignmentStatus } from '../../../domain/assignment-status/model';
import { AssignmentId, AttendeeId } from '../../../domain/id/model';
import prisma from '../../client/prisma-client';

export class AttendeeAssignmentStatusRepository
  implements IAttendeeAssignmentStatusRepository
{
  public async findByIds({
    attendeeId,
    assignmentId,
  }: {
    attendeeId: AttendeeId;
    assignmentId: AssignmentId;
  }) {
    const assignmentStatusByAttendee =
      await prisma.attendeeAssignmentStatus.findFirstOrThrow({
        where: {
          attendeeId: attendeeId.value,
          assignmentId: assignmentId.value,
        },
        include: {
          status: true,
        },
      });

    const assignmentStatus =
      Object.values(AssignmentStatus).find(
        (status) => status === assignmentStatusByAttendee.status.name,
      ) ??
      (() => {
        throw new Error(
          `Invalid assignment status. given: ${assignmentStatusByAttendee.status.name}`,
        );
      })();

    return AttendeeAssignmentStatus.reconstruct({
      assignmentId: assignmentId,
      attendeeId: attendeeId,
      status: assignmentStatus,
    });
  }

  public async update(
    assignmentStatusByAttendee: AttendeeAssignmentStatus,
  ): Promise<void> {
    const newStatus = await prisma.assignmentStatus.findFirstOrThrow({
      where: {
        name: assignmentStatusByAttendee.status,
      },
    });

    await prisma.attendeeAssignmentStatus.update({
      where: {
        attendeeId_assignmentId: {
          attendeeId: assignmentStatusByAttendee.attendeeId.value,
          assignmentId: assignmentStatusByAttendee.assignmentId.value,
        },
      },
      data: {
        status: {
          connect: {
            id: newStatus.id,
          },
        },
      },
    });
  }
}
