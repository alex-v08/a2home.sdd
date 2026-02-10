"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'srv_plumbing', description: 'Service identifier' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "serviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { latitude: -34.6037, longitude: -58.3816 },
        description: 'Geographic location for the service'
    }),
    __metadata("design:type", Object)
], CreateBookingDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { amount: 5000, currency: 'ARS' },
        description: 'Price for the service'
    }),
    __metadata("design:type", Object)
], CreateBookingDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'book_1234567890',
        description: 'Optional custom booking ID'
    }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "bookingId", void 0);
//# sourceMappingURL=create-booking.dto.js.map