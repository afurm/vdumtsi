import { Flower } from "../../../utils/types";

export const calculateTotalPrice = (selectedFlowers: {flower: Flower; quantity: number}[]): string => {
  return selectedFlowers
      .reduce(
          (sum, item) => sum + parseFloat(item.flower.price) * item.quantity,
          0
      )
      .toFixed(2);
}