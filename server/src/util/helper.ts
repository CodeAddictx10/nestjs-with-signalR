export function simulateRandomWalk(price: number): number {
  const direction = Math.random() < 0.5 ? -1 : 1;
  // // 1% to 2% price diff
  const percentChange = direction * (1 + Math.random());
  const fluctuation = percentChange / 100;
  return Number((price * (1 + fluctuation)).toFixed(2));
}

export function now(): string {
  return new Date().toISOString().split('.')[0] + 'Z';
}
