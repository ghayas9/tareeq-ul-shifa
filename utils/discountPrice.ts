export function calculateDiscount(originalPrice: number, salePrice: number) {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) return null;
  const discountPercentage = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100
  );
  return discountPercentage;
}
