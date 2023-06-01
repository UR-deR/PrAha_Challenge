import { IPairRepository } from '../../../domain/pair/repository';
import prisma from '../../client/prisma-client';
import { Pair } from '../../../domain/pair/model';
import { AttendeeId, PairId } from '../../../domain/id/model';
import { PairName } from '../../../domain/pair-name/model';

export class PairRepository implements IPairRepository {
  public async findAll(): Promise<Pair[]> {
    const allPairs = await prisma.pair.findMany({
      include: {
        members: true,
      },
    });

    return allPairs.map(({ id, name, members }) =>
      Pair.reconstruct({
        id: new PairId(id),
        name: new PairName(name),
        pairMemberAttendeeIds: members.map(
          (member) => new AttendeeId(member.id),
        ),
      }),
    );
  }
}
