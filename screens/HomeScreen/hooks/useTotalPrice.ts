import { useCallback, useMemo } from 'react';
import { Flower } from '../../../utils/types';
import { calculateTotalPrice } from '../utils/calculateTotalPriceUtils';

export const useTotalPrice = (selectedFlowers: {flower: Flower; quantity: number}[]): string => {
  return useMemo(() => calculateTotalPrice(selectedFlowers), [selectedFlowers]);
};
