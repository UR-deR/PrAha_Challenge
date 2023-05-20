import { AttendeeStatus } from '../../../domain/attendee-status/model';
import { Attendee } from '../../../domain/attendee/model';
import { Email } from '../../../domain/email/model';
import { PairName } from '../../../domain/pair-name/model';
import { Pair } from '../../../domain/pair/model';
import { TeamName } from '../../../domain/team-name/model';
import { Team } from '../../../domain/team/model';
import { ITeamRepository } from '../../../domain/team/repository';
import prisma from '../../client/prisma-client';

export class TeamRepository implements ITeamRepository {
  public async findById(id: number): Promise<Team | undefined> {
    const team = await prisma.teams.findUnique({
      where: {
        id,
      },
      include: {
        pairs: {
          include: {
            attendees: {
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
      const attendees = pair.attendees.map((attendee) => {
        const attendeeStatus: AttendeeStatus =
          Object.values(AttendeeStatus).find(
            (status) => status === attendee.status.name,
          ) ??
          (() => {
            throw new Error(
              `Invalid attendee status. given: ${attendee.status.name}`,
            );
          })();

        return Attendee.reconstruct(
          attendee.id.toString(),
          attendee.name,
          new Email(attendee.email),
          attendeeStatus,
        );
      });

      return Pair.reconstruct(pair.id, new PairName(pair.name), attendees);
    });

    return Team.reconstruct(
      team.id,
      new TeamName(parseInt(team.name, 10)),
      pairs,
    );
  }
}
