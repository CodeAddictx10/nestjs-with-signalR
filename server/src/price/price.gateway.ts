import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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

  handleMessage(): void {
    this.server.emit('newprice', this.priceService.simulatePrices());
  }
}
