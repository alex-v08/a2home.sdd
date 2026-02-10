"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.validate();
    }
    validate() {
        if (!this.id)
            throw new Error("User ID is required.");
        if (!this.email || !this.email.includes("@"))
            throw new Error("Valid email is required.");
        if (!this.name || this.name.trim().length === 0)
            throw new Error("Name is required.");
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map