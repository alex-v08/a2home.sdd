export declare class CreateBookingDto {
    serviceId: string;
    location: {
        latitude: number;
        longitude: number;
    };
    price: {
        amount: number;
        currency: string;
    };
    bookingId?: string;
}
