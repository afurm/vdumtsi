import { useState } from 'react';
import { Flower } from '../../../utils/types';
import { deleteFlowerFromStorage, fetchFlowers } from '../utils/flowerStorageUtils';


export const useFlowerStorage = () => {
    const [flowers, setFlowers] = useState<Flower[]>([]);

    const fetchFlowersFromStorage = async () => {
        const result = await fetchFlowers();
        if (result) {
            setFlowers(result);
        }
    };

    const deleteFlower = async (flowerId: string) => {
        const updatedFlowers = await deleteFlowerFromStorage(flowerId, flowers);
        setFlowers(updatedFlowers);
    };

    return { flowers, fetchFlowersFromStorage, deleteFlower };
};
