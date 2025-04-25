import { Injectable } from '@nestjs/common';
import { TPrice } from 'src/types';
import { simulateRandomWalk } from 'src/util/helper';

@Injectable()
export class PriceService {
  prices: TPrice[] = [
    { symbol: 'BTCUSD', price: 10000.0 },
    { symbol: 'ETHUSD', price: 3000.0 },
    { symbol: 'LTCUSD', price: 955.5 },
    { symbol: 'XRPUSD', price: 456.55 },
    { symbol: 'BNBUSD', price: 420.1 },
    { symbol: 'SOLUSD', price: 155.75 },
    { symbol: 'ADAUSD', price: 200.45 },
    { symbol: 'DOGEUSD', price: 10.082 },
    { symbol: 'DOTUSD', price: 56.25 },
    { symbol: 'AVAXUSD', price: 38.7 },
  ];

  simulatePrices(): Record<string, any>[] {
    return this.prices.map((item) => {
      const newPrice = simulateRandomWalk(item.price);

      return {
        ...item,
        price: newPrice,
        isIncremental: newPrice > item.price,
        timestamp: new Date().toISOString(),
      };
    });
  }
}
