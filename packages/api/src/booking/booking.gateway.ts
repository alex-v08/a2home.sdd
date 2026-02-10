import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class BookingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_booking')
  handleJoinBooking(client: Socket, bookingId: string) {
    client.join(`booking:${bookingId}`);
    console.log(`Client ${client.id} joined booking room: ${bookingId}`);
  }

  notifyBookingConfirmed(bookingId: string, providerId: string) {
    this.server.to(`booking:${bookingId}`).emit('booking_confirmed', {
      bookingId,
      providerId,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString(),
    });
  }
}
