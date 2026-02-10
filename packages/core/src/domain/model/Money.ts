export class Money {
  constructor(public readonly amount: number, public readonly currency: string = "USD") {
    this.validate();
  }

  private validate() {
    if (this.amount < 0) {
      throw new Error("Amount cannot be negative.");
    }
    if (!this.currency || this.currency.length !== 3) {
      throw new Error("Invalid currency code. Must be a 3-letter ISO code.");
    }
  }
}
