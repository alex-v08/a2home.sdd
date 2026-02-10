import { GeoLocation } from "./GeoLocation";
import { Money } from "./Money";
export declare enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export declare class Booking {
    readonly id: string;
    readonly clientId: string;
    readonly providerId: string;
    readonly serviceId: string;
    readonly status: BookingStatus;
    readonly price: Money;
    readonly location: GeoLocation;
    constructor(id: string, clientId: string, providerId: string, serviceId: string, status: BookingStatus, price: Money, location: GeoLocation);
    private validate;
}
