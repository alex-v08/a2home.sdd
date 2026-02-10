"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
class Money {
    constructor(amount, currency = "USD") {
        this.amount = amount;
        this.currency = currency;
        this.validate();
    }
    validate() {
        if (this.amount < 0) {
            throw new Error("Amount cannot be negative.");
        }
        if (!this.currency || this.currency.length !== 3) {
            throw new Error("Invalid currency code. Must be a 3-letter ISO code.");
        }
    }
}
exports.Money = Money;
//# sourceMappingURL=Money.js.map