import { RequestService } from "./application/use-cases/RequestService";
import { InMemoryBookingRepository } from "./infrastructure/adapters/InMemoryBookingRepository";

async function demo() {
  console.log("--- A2Home Core Domain Demo ---");

  // 1. Setup Infrastructure
  const bookingRepo = new InMemoryBookingRepository();

  // 2. Setup Use Case
  const requestService = new RequestService(bookingRepo);

  // 3. Define Input
  const input = {
    bookingId: "book_001",
    clientId: "user_client_123",
    serviceId: "srv_plumbing",
    location: { latitude: -34.6037, longitude: -58.3816 }, // Buenos Aires
    price: { amount: 5000, currency: "ARS" },
  };

  try {
    // 4. Execute Flow
    console.log("Requesting service...");
    const booking = await requestService.execute(input);

    // 5. Validate Result
    console.log("Booking created successfully:");
    console.log(JSON.stringify(booking, null, 2));

    if (booking.status === "PENDING") {
      console.log("\n✅ SUCCESS: Booking is in PENDING state.");
    } else {
      console.log("\n❌ ERROR: Unexpected booking status.");
    }

    // 6. Verify Persistence
    const savedBooking = await bookingRepo.findById("book_001");
    if (savedBooking) {
      console.log("✅ SUCCESS: Booking persisted in memory.");
    }

  } catch (error) {
    console.error("❌ Demo failed:", error);
  }
}

demo();
