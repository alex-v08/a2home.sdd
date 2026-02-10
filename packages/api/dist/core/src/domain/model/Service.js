"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.validate();
    }
    validate() {
        if (!this.id)
            throw new Error("Service ID is required.");
        if (!this.name || this.name.trim().length === 0)
            throw new Error("Service name is required.");
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map