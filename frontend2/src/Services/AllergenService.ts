import AxiosInstance from "./Axios";


export interface AllergenData {
    id: number;
    name: string;
}

export interface NewAllergenData {
    name: string;
 }

export const getAllAllergens = async(): Promise<AllergenData[]> => {
    try {
        const response = await AxiosInstance.get('allergen/');
        return response.data;
        
    } catch (error) {
        console.error('Error fetching allergens:', error);
        throw error;
      }
    };

export const addAllergen = async (allergenData: NewAllergenData): Promise<AllergenData> => {
    try {
        const response = await AxiosInstance.post('allergen/', allergenData);
        return response.data;
    } catch (error) {
        console.error('Error adding allergen:', error);
        throw error;
    }
};


