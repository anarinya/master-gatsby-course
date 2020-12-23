const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function formatCurrency(cents) {
  return formatter.format(cents / 100);
}
