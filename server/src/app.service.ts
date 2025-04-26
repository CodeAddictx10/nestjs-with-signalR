import { Injectable, Logger } from '@nestjs/common';
import { PriceGateway } from './price/price.gateway';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly gateway: PriceGateway) {}
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

  getHello(): string {
    return 'Hello World!';
  }
}
