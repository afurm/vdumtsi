// flowerSelectionUtils.test.ts

import { Flower } from "../../../../utils/types";
import { addFlower, removeFlower, getFlowerQuantity } from "../flowerSelectionUtils";

const mockFlower1: Flower = { id: '1', name: 'Rose', price: '1', description: 'null' };
const mockFlower2: Flower = { id: '2', name: 'Tulip', price: '2',description: 'null' };

describe('flowerSelectionUtils', () => {
  describe('addFlower', () => {
    it('should add a new flower if not present', () => {
      const result = addFlower([], mockFlower1);
      expect(result).toEqual([{ flower: mockFlower1, quantity: 1 }]);
    });

    it('should increment the quantity if flower is already present', () => {
      const initialState = [{ flower: mockFlower1, quantity: 1 }];
      const result = addFlower(initialState, mockFlower1);
      expect(result).toEqual([{ flower: mockFlower1, quantity: 2 }]);
    });
  });

  describe('removeFlower', () => {
    it('should decrement the quantity if more than 1', () => {
      const initialState = [{ flower: mockFlower1, quantity: 2 }];
      const result = removeFlower(initialState, mockFlower1);
      expect(result).toEqual([{ flower: mockFlower1, quantity: 1 }]);
    });

    it('should remove the flower from the list if quantity is 1', () => {
      const initialState = [{ flower: mockFlower1, quantity: 1 }, { flower: mockFlower2, quantity: 2 }];
      const result = removeFlower(initialState, mockFlower1);
      expect(result).toEqual([{ flower: mockFlower2, quantity: 2 }]);
    });

    it('should not change the list if flower is not present', () => {
      const initialState = [{ flower: mockFlower2, quantity: 2 }];
      const result = removeFlower(initialState, mockFlower1);
      expect(result).toEqual(initialState);
    });
  });

  describe('getFlowerQuantity', () => {
    it('should return correct quantity if flower is present', () => {
      const initialState = [{ flower: mockFlower1, quantity: 3 }, { flower: mockFlower2, quantity: 2 }];
      const result = getFlowerQuantity(initialState, mockFlower1.id);
      expect(result).toBe(3);
    });

    it('should return 0 if flower is not present', () => {
      const initialState = [{ flower: mockFlower2, quantity: 2 }];
      const result = getFlowerQuantity(initialState, mockFlower1.id);
      expect(result).toBe(0);
    });
  });
});
