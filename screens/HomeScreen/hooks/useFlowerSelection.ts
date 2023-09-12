import { useState } from 'react';
import { Flower } from '../../../utils/types';
import { addFlower, removeFlower, getFlowerQuantity } from '../utils/flowerSelectionUtils';

export const useFlowerSelection = () => {
  const [selectedFlowers, setSelectedFlowers] = useState<{ flower: Flower; quantity: number }[]>([]);

  const selectFlower = (selectedFlower: Flower) => {
    setSelectedFlowers(prev => addFlower(prev, selectedFlower));
  };

  const deselectFlower = (selectedFlower: Flower) => {
    setSelectedFlowers(prev => removeFlower(prev, selectedFlower));
  };

  const getSelectedFlowerQuantity = (flowerId: string) => {
    return getFlowerQuantity(selectedFlowers, flowerId);
  };

  return { selectedFlowers, selectFlower, deselectFlower, getSelectedFlowerQuantity };
};
