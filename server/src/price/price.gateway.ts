import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PriceService } from './price.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PriceGateway {
  constructor(private readonly priceService: PriceService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(): void {
    this.server.emit('new-price', this.priceService.simulatePrices());
  }
}
