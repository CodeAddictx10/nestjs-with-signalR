import { Injectable, Logger } from '@nestjs/common';
import { PriceGateway } from './price/price.gateway';
import { Interval } from '@nestjs/schedule';
import { PriceService } from './price/price.service';
import { TPrice } from './types';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private readonly gateway: PriceGateway,
    private readonly priceService: PriceService,
  ) {}
  @Interval(5000)
  updatePrice(): void {
    try {
      this.gateway.handleMessage();
    } catch (error) {
      this.logger.log(
        `Failed to send new update prices:  ${JSON.stringify(error)}`,
      );
    }
  }

  getPrices(): TPrice[] {
    return this.priceService.simulatePrices();
  }
}
