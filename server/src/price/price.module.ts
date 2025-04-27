import { Module } from '@nestjs/common';
import { PriceGateway } from './price.gateway';
import { PriceService } from './price.service';

@Module({
  providers: [PriceGateway, PriceService],
  exports: [PriceGateway, PriceService],
})
export class PriceModule {}
