import { Flower } from '../../../utils/types';

export const addFlower = (
  currentFlowers: { flower: Flower; quantity: number }[],
  newFlower: Flower
): { flower: Flower; quantity: number }[] => {
  const existing = currentFlowers.find(
    (item) => item.flower.id === newFlower.id
  );

  if (existing) {
    return currentFlowers.map((item) =>
      item.flower.id === newFlower.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...currentFlowers, { flower: newFlower, quantity: 1 }];
  }
};

export const removeFlower = (
  currentFlowers: { flower: Flower; quantity: number }[],
  flowerToRemove: Flower
): { flower: Flower; quantity: number }[] => {
  const existing = currentFlowers.find(
    (item) => item.flower.id === flowerToRemove.id
  );

  if (existing && existing.quantity > 1) {
    return currentFlowers.map((item) =>
      item.flower.id === flowerToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  } else if (existing && existing.quantity === 1) {
    return currentFlowers.filter(
      (item) => item.flower.id !== flowerToRemove.id
    );
  }
  return currentFlowers;
};

export const getFlowerQuantity = (
  currentFlowers: { flower: Flower; quantity: number }[],
  flowerId: string
): number => {
  const found = currentFlowers.find((item) => item.flower.id === flowerId);
  return found ? found.quantity : 0;
};
