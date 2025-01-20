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

export const deleteAllergen = async (id: number): Promise<void> => {
    try {
        await AxiosInstance.delete(`allergen/${id}/`);
        console.log(`Allergen with id ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting allergen with id ${id}:`, error);
        throw error;
    }
};

export const updateAllergen = async (id: number, allergenData: NewAllergenData): Promise<AllergenData> => {
    try {
        const response = await AxiosInstance.patch(`allergen/${id}/`, allergenData);
        return response.data;
    } catch (error) {
        console.error(`Error updating allergen with id ${id}:`, error);
        throw error;
    }
};

export const getAllergenById = async (id: number): Promise<AllergenData> => {
    try {
      const response = await AxiosInstance.get(`allergen/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching allergen with id ${id}:`, error);
      throw error;
    }
};

