interface Money {
  add: (money: Money) => Money;
}

class Money {
  constructor(private value: number) {}
}

interface HotelRates {
  fee: () => Money;
}

class RegularRates implements HotelRates {
  fee() {
    return new Money(1000);
  }
}

class PremiumRates implements HotelRates {
  fee() {
    return new Money(2000);
  }
}

// リスコフの置換原則に違反していると条件分岐が増えてしまう
const getBusySeasonFee = (hotelRates: HotelRates) => {
  let busySeasonFee: Money;
  if (hotelRates instanceof PremiumRates) {
    busySeasonFee = hotelRates.fee().add(new Money(500));
  }
  if (hotelRates instanceof RegularRates) {
    busySeasonFee = hotelRates.fee().add(new Money(300));
  }
  return busySeasonFee;
};
