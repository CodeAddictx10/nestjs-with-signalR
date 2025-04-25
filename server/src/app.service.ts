import { Injectable } from '@nestjs/common';
import { PriceGateway } from './price/price.gateway';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private readonly gateway: PriceGateway) {}
  @Interval(5000)
  updatePrice(): void {
    this.gateway.handleMessage();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
