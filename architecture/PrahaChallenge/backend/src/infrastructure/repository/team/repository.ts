import { TeamId } from './../../../domain/team-id/model';
import { AttendeeId } from '../../../domain/attendee-id/model';
import { AttendeeStatus } from '../../../domain/attendee-status/model';
import { Attendee } from '../../../domain/attendee/model';
import { Email } from '../../../domain/email/model';
import { PairId } from '../../../domain/pair-id/model';
import { PairName } from '../../../domain/pair-name/model';
import { Pair } from '../../../domain/pair/model';
import { TeamName } from '../../../domain/team-name/model';
import { Team } from '../../../domain/team/model';
import { ITeamRepository } from '../../../domain/team/repository';
import prisma from '../../client/prisma-client';

export class TeamRepository implements ITeamRepository {
  public async findById({ value: teamId }: TeamId): Promise<Team | undefined> {
    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        pairs: {
          include: {
            members: {
              include: {
                status: true,
              },
            },
          },
        },
      },
    });

    if (!team) {
      return undefined;
    }

    const pairs = team.pairs.map((pair) => {
      const attendees = pair.members.map((attendee) => {
        const attendeeStatus = Object.values(AttendeeStatus).find(
          (status) => status === attendee.status.name,
        );

        if (!attendeeStatus) {
          throw new Error(
            `Invalid attendee status. given: ${attendee.status.name}`,
          );
        }

        return Attendee.reconstruct({
          id: new AttendeeId(attendee.id.toString()),
          name: attendee.name,
          email: new Email(attendee.email),
          status: attendeeStatus,
        });
      });

      return Pair.reconstruct({
        id: new PairId(pair.id.toString()),
        name: new PairName(pair.name),
        attendees,
      });
    });

    return Team.reconstruct({
      id: new TeamId(team.id.toString()),
      name: new TeamName(parseInt(team.name, 10)),
      pairs,
    });
  }
}
