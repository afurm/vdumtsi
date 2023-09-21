// calculateTotalPrice.test.ts

import { Flower } from "../../../../utils/types";
import { calculateTotalPrice } from "../calculateTotalPriceUtils";

describe('calculateTotalPrice', () => {
    const mockFlower1: Flower = { id: '1', name: 'Rose',  price: '5.50' };
    const mockFlower2: Flower = { id: '2', name: 'Tulip',  price: '3.75'};

    it('should calculate the total price for multiple flowers', () => {
        const selectedFlowers = [
            { flower: mockFlower1, quantity: 2 },
            { flower: mockFlower2, quantity: 3 },
        ];
        
        const result = calculateTotalPrice(selectedFlowers);
        // Calculation: (5.50*2) + (3.75*3) = 22.25
        expect(result).toBe('22.25');
    });

    it('should calculate the total price for a single flower type', () => {
        const selectedFlowers = [{ flower: mockFlower1, quantity: 3 }];

        const result = calculateTotalPrice(selectedFlowers);
        // Calculation: 5.50 * 3 = 16.50
        expect(result).toBe('16.50');
    });

    it('should return 0 when no flowers are selected', () => {
        const result = calculateTotalPrice([]);
        expect(result).toBe('0.00');
    });
});
