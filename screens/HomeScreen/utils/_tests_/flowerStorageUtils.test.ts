// flowerStorageUtils.test.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchFlowers, deleteFlowerFromStorage } from '../flowerStorageUtils';


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
}));

describe('flowerStorageUtils', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchFlowers', () => {
        it('should fetch flowers from storage', async () => {
            const mockFlowers = [{ id: '1', name: 'Rose', color: 'Red' }];
            (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockFlowers));
            const result = await fetchFlowers();
            expect(result).toEqual(mockFlowers);
        });

        it('should handle error gracefully', async () => {
            (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('AsyncStorage Error'));
            const result = await fetchFlowers();
            expect(result).toBeNull();
        });
    });

    describe('deleteFlowerFromStorage', () => {
        it('should delete a flower from storage', async () => {
            const mockFlowers = [{ id: '1', name: 'Rose', color: 'Red', price: '1', description: 'null' }];
            const result = await deleteFlowerFromStorage('1', mockFlowers);
            expect(result).toEqual([]);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('flowerData', JSON.stringify([]));
        });

        it('should handle storage setItem error gracefully', async () => {
            (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('AsyncStorage Error'));
            const mockFlowers = [{ id: '1', name: 'Rose', price: '1', description: 'null' }];
            const result = await deleteFlowerFromStorage('1', mockFlowers);
            expect(result).toEqual([]);
        });
    });
});
