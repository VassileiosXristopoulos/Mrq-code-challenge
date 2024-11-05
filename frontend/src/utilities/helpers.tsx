const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});


export function formatCurrency(number: number): string {
  if (number >= 1e9) { // For billions
    return CURRENCY_FORMATTER.format(number / 1e9) + 'B'; // Append B for billion
  } else if (number >= 1e6) { // For millions
    return CURRENCY_FORMATTER.format(number / 1e6) + 'M'; // Append M for million
  } else { // For numbers less than a million
    return CURRENCY_FORMATTER.format(number); // Use the standard currency format
  }
}
