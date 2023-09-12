import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flower } from '../../../utils/types';

export const fetchFlowers = async (): Promise<Flower[] | null> => {
    try {
        const storedFlowers = await AsyncStorage.getItem('flowerData');
        return storedFlowers ? JSON.parse(storedFlowers) : null;
    } catch (error) {
        console.error('Failed to fetch the flowers from storage', error);
        return null;
    }
};

export const deleteFlowerFromStorage = async (flowerId: string, currentFlowers: Flower[]): Promise<Flower[]> => {
    const updatedFlowers = currentFlowers.filter(flower => flower.id !== flowerId);

    try {
        await AsyncStorage.setItem('flowerData', JSON.stringify(updatedFlowers));
    } catch (error) {
        console.error('Failed to delete the flower from storage', error);
    }
    return updatedFlowers;
};
