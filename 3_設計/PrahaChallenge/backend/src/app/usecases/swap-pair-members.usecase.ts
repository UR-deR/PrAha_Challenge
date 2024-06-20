import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { PairId, ParticipantId } from '../../domain/id/id';
import { IParticipantAssignmentRepository } from '../../domain/participant-assignment/participant-assignment-repository';
import { IPairRepository } from '../../domain/pair/pair-repository';

export class SwapPairMembersUsecaseParam {
  constructor(
    public readonly member1: {
      participantId: ParticipantId;
      newPairId: PairId;
    },
    public readonly member2:
      | {
          participantId: ParticipantId;
          newPairId: PairId;
        }
      | undefined,
  ) {}
}

//usecase名をchangePairMembersに変更したい
@Injectable()
export class SwapPairMembersUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.PARTICIPANT_ASSIGNMENT_REPOSITORY)
    private readonly participantAssignmentRepository: IParticipantAssignmentRepository,
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private readonly pairRepository: IPairRepository,
  ) {}
  public async do({
    member1,
    member2,
  }: SwapPairMembersUsecaseParam): Promise<void> {
    const isSwappingPair = member2 !== undefined;
    if (isSwappingPair) {
      const oldPairForMember1 = await this.pairRepository.findByMemberId(
        member1.participantId,
      );

      if (!oldPairForMember1) {
        throw new Error(
          `Pair not found. pairId: ${member1.newPairId.toString()}`,
        );
      }

      const oldPairForMember2 = await this.pairRepository.findByMemberId(
        member2.participantId,
      );

      if (!oldPairForMember2) {
        throw new Error(
          `Pair not found. pairId: ${member2.newPairId.toString()}`,
        );
      }

      const newPairForMember1 = oldPairForMember2.exchangeMembers(
        member2.participantId,
        member1.participantId,
      );

      const newPairForMember2 = oldPairForMember1.exchangeMembers(
        member1.participantId,
        member2.participantId,
      );

      const oldParticipantAssignmentForMember1 =
        await this.participantAssignmentRepository.findByParticipantId(
          member1.participantId,
        );

      const oldParticipantAssignmentForMember2 =
        await this.participantAssignmentRepository.findByParticipantId(
          member2.participantId,
        );

      await this.participantAssignmentRepository.upsert(
        oldParticipantAssignmentForMember1.changePair(newPairForMember1.id),
      );

      await this.participantAssignmentRepository.upsert(
        oldParticipantAssignmentForMember2.changePair(newPairForMember2.id),
      );
    } else {
      const oldPairForMember1 = await this.pairRepository.findByMemberId(
        member1.participantId,
      );

      if (!oldPairForMember1) {
        throw new Error(
          `Pair not found. pairId: ${member1.newPairId.toString()}`,
        );
      }

      if (!oldPairForMember1.canRemoveMember) {
        //fix error message
        throw new Error(
          `Pair cannot remove member. pairId: ${member1.newPairId.toString()}`,
        );
      }

      const newPairForMember1 = await this.pairRepository.findById(
        member1.newPairId,
      );

      if (!newPairForMember1) {
        throw new Error(
          `Pair not found. pairId: ${member1.newPairId.toString()}`,
        );
      }

      if (!newPairForMember1.isVacant) {
        //TODO: fix error message
        throw new Error(
          `Pair is not vacant. pairId: ${member1.newPairId.toString()}`,
        );
      }

      const participantAssignmentForMember1 =
        await this.participantAssignmentRepository.findByParticipantId(
          member1.participantId,
        );

      await this.participantAssignmentRepository.upsert(
        participantAssignmentForMember1.changePair(member1.newPairId),
      );
    }
  }
}
