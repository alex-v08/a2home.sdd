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
exports.BookingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let BookingGateway = class BookingGateway {
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleJoinBooking(client, bookingId) {
        client.join(`booking:${bookingId}`);
        console.log(`Client ${client.id} joined booking room: ${bookingId}`);
    }
    notifyBookingConfirmed(bookingId, providerId) {
        this.server.to(`booking:${bookingId}`).emit('booking_confirmed', {
            bookingId,
            providerId,
            status: 'CONFIRMED',
            timestamp: new Date().toISOString(),
        });
    }
};
exports.BookingGateway = BookingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BookingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_booking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], BookingGateway.prototype, "handleJoinBooking", null);
exports.BookingGateway = BookingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], BookingGateway);
//# sourceMappingURL=booking.gateway.js.map