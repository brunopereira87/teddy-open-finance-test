export function parseBrlInputToNumber(value: string | null): number {
  if (!value) return 0;
  const digitsOnly = value.replace(/\D/g, '');
  const padded = digitsOnly.padStart(3, '0');
  const integerPart = padded.slice(0, -2);
  const decimalPart = padded.slice(-2);

  const final = `${integerPart}.${decimalPart}`;

  return parseFloat(final);
}
export function getBRLValue(value: number | null): string {
  if(!value) return '';

  return value.toLocaleString(
    "pt-BR", 
    { 
      style: "currency", currency: "BRL",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }
  )
}