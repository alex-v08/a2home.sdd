"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const User_1 = require("./User");
class Provider extends User_1.User {
    constructor(id, email, name, rating, enrollment) {
        super(id, email, name);
        this.rating = rating;
        this.enrollment = enrollment;
        this.validateProvider();
    }
    validateProvider() {
        if (this.rating < 0 || this.rating > 5) {
            throw new Error("Rating must be between 0 and 5.");
        }
        if (!this.enrollment || this.enrollment.trim().length === 0) {
            throw new Error("Provider enrollment (matrícula) is required.");
        }
    }
}
exports.Provider = Provider;
//# sourceMappingURL=Provider.js.map