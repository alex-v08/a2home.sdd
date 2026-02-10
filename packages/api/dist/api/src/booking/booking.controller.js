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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core/src/index");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const booking_gateway_1 = require("./booking.gateway");
const create_booking_dto_1 = require("./dto/create-booking.dto");
let BookingController = class BookingController {
    constructor(requestService, acceptBooking, bookingRepository, bookingGateway) {
        this.requestService = requestService;
        this.acceptBooking = acceptBooking;
        this.bookingRepository = bookingRepository;
        this.bookingGateway = bookingGateway;
    }
    async create(input, user) {
        const fullInput = {
            ...input,
            clientId: user.userId,
            bookingId: input.bookingId || `book_${Date.now()}`,
        };
        return await this.requestService.execute(fullInput);
    }
    async getPending() {
        return await this.bookingRepository.findPending();
    }
    async accept(id, user) {
        await this.acceptBooking.execute({ bookingId: id, providerId: user.userId });
        this.bookingGateway.notifyBookingConfirmed(id, user.userId);
        return { message: 'Booking accepted successfully' };
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new booking request', description: 'Client creates a service booking. ClientId is extracted from JWT token.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Booking created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pending bookings', description: 'Providers can see all bookings waiting for acceptance' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of pending bookings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getPending", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a booking', description: 'Provider accepts a booking. ProviderId is extracted from JWT token. Triggers real-time WebSocket notification to client.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking accepted and client notified' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "accept", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiTags)('Bookings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('bookings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(2, (0, common_1.Inject)('BOOKING_REPOSITORY')),
    __metadata("design:paramtypes", [core_1.RequestService,
        core_1.AcceptBooking, Object, booking_gateway_1.BookingGateway])
], BookingController);
//# sourceMappingURL=booking.controller.js.map