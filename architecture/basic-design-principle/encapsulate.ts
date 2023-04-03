class GiftPoint {
  private static readonly MIN_POINT = 0;
  private static readonly STANDARD_MEMBERSHIP_POINT = 100;
  private static readonly PREMIUM_MEMBERSHIP_POINT = 200;
  private readonly value: number;
  constructor(point: number) {
    if (point < GiftPoint.MIN_POINT) {
      throw new Error('point must be greater than 0');
    }
    this.value = point;
  }

  static forStandardMembership(): GiftPoint {
    return new GiftPoint(GiftPoint.STANDARD_MEMBERSHIP_POINT);
  }

  static forPremiumMembership(): GiftPoint {
    return new GiftPoint(GiftPoint.PREMIUM_MEMBERSHIP_POINT);
  }

  add(point: GiftPoint): GiftPoint {
    return new GiftPoint(this.value + point.value);
  }
}
