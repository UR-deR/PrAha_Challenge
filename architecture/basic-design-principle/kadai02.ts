interface Purchase {
  userId: string;
  productId: string;
  transaction: {
    succeeded: true;
    completedAt: Date;
  };
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[];
}

class PurchaseService {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}

  public purchase(userId: string, productId: string) {
    const allPurchases = this.paymentRecordRepo.getPurchasesBy(userId);
    const pastPurchase = allPurchases.find((p) => p.productId === productId && p.transaction.succeeded);
    if (pastPurchase) {
      throw new Error('この商品はおひとりさま一品限定です！');
    }

    // 購入手続きに進む
  }
}
