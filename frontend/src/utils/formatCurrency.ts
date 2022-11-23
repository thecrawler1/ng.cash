export default function formatCurrency(value: number): string {
  return `R$${value.toFixed(2).replaceAll('.', ',')}`;
};

