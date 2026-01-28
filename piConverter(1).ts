// Pi Network Exchange Rate
// 1 Pi = 314,159 USD

export const PI_TO_USD_RATE = 314159;

export function piToUSD(piAmount: number): number {
  return piAmount * PI_TO_USD_RATE;
}

export function formatPiPrice(piAmount: number): string {
  return `${piAmount} π`;
}

export function formatUSDPrice(usdAmount: number): string {
  return `$${(usdAmount / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPiAndUSD(piAmount: number): { pi: string; usd: string } {
  const usdAmount = piToUSD(piAmount);
  return {
    pi: formatPiPrice(piAmount),
    usd: formatUSDPrice(usdAmount),
  };
}
