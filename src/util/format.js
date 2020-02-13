// eslint-disable-next-line import/prefer-default-export
export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});
