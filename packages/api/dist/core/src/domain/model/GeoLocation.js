"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocation = void 0;
class GeoLocation {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.validate();
    }
    validate() {
        if (this.latitude < -90 || this.latitude > 90) {
            throw new Error("Invalid latitude. Must be between -90 and 90.");
        }
        if (this.longitude < -180 || this.longitude > 180) {
            throw new Error("Invalid longitude. Must be between -180 and 180.");
        }
    }
}
exports.GeoLocation = GeoLocation;
//# sourceMappingURL=GeoLocation.js.map