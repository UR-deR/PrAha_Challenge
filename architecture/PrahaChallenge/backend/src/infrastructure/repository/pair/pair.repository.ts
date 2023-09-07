import { PrismaClient } from '@prisma/client';
import { IPairRepository } from '../../../domain/pair/pair-repository';
import { Pair } from '../../../domain/pair/pair';
import { Injectable } from '@nestjs/common';
import { PairId, ParticipantId } from '../../../domain/id/id';
import { PairName } from '../../../domain/pair/pair-name';

@Injectable()
export class PairRepository implements IPairRepository {
  private prismaClient: PrismaClient;
  public constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async findAll(): Promise<Pair[]> {
    const allPairs = await this.prismaClient.pair.findMany();
    const allParticipantAssignments =
      await this.prismaClient.participantAssignment.findMany();

    return allPairs.map((pair) =>
      Pair.reconstruct({
        id: new PairId(pair.id),
        name: new PairName(pair.name),
        pairMemberIds: allParticipantAssignments.flatMap(
          (participantAssignment) =>
            participantAssignment.pairId === pair.id
              ? [new ParticipantId(participantAssignment.participantId)]
              : [],
        ),
      }),
    );
  }

  public async findById(pairId: PairId): Promise<Pair> {
    const pair = await this.prismaClient.pair.findFirstOrThrow({
      where: {
        id: pairId.value,
      },
    });

    const participantAssignments =
      await this.prismaClient.participantAssignment.findMany({
        where: {
          pairId: pair.id,
        },
      });

    return Pair.reconstruct({
      id: new PairId(pair.id),
      name: new PairName(pair.name),
      pairMemberIds: participantAssignments.map(
        ({ participantId }) => new ParticipantId(participantId),
      ),
    });
  }

  public async register(pair: Pair): Promise<void> {
    await this.prismaClient.pair.upsert({
      where: { id: pair.id.value },
      update: {
        name: pair.name.value,
      },
      create: {
        id: pair.id.value,
        name: pair.name.value,
      },
    });
  }
}
