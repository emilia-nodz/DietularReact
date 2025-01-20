import AxiosInstance from "./Axios";
import { AllergenData } from "./AllergenService";



export interface NewItemData {
  
  allergens: number[];
  name: string;
  description: string;
  weight: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  }

export interface ItemData {
  id: number;
  allergen_details: AllergenData[];
  name: string;
  description: string;
  weight: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  }



export const getItems = async(): Promise<ItemData[]> => {
    try {
        const response = await AxiosInstance.get('item/');
        return response.data;
        
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
    };

export const addItem = async (itemData: NewItemData): Promise<ItemData> => {
    try {
        const response = await AxiosInstance.post('item/', itemData);
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
};

export const deleteItem = async (id: number): Promise<void> => {
    try {
        await AxiosInstance.delete(`item/${id}/`);
        console.log(`Item with id ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting item with id ${id}:`, error);
        throw error;
    }
};

export const updateItem = async (id: number, itemData: NewItemData): Promise<ItemData> => {
    try {
        const response = await AxiosInstance.patch(`item/${id}/`, itemData);
        return response.data;
    } catch (error) {
        console.error(`Error updating item with id ${id}:`, error);
        throw error;
    }
};


