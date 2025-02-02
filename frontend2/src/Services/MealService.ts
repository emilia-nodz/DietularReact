import AxiosInstance from "./Axios";
import { ItemData} from "../Services/ItemService";


export interface MealData {
    id: number,
    name: string,
    description: string,
    item_details: ItemData[],
    numberOfPortions: number,
    portionWeight: number,
    caloriesPerPortion: number,
}

export interface NewMealData {
    items: number[],
    name: string,
    description: string,
    numberOfPortions: number,
    portionWeight: number,
    caloriesPerPortion: number,
}

export const getMeals = async(): Promise<MealData[]> => {
    try {
        const response = await AxiosInstance.get('meal/');
        return response.data;
        
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
      }
    };

export const addMeal = async (mealData: NewMealData): Promise<MealData> => {
    try {
        const response = await AxiosInstance.post('meal/', mealData);
        return response.data;
    } catch (error) {
        console.error('Error adding meal:', error);
        throw error;
    }
};

export const deleteMeal = async (id: number): Promise<void> => {
    try {
        await AxiosInstance.delete(`meal/${id}/`);
        console.log(`Meal with id ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting meal with id ${id}:`, error);
        throw error;
    }
};

export const updateMeal = async (id: number, mealData: NewMealData): Promise<MealData> => {
    try {
        const response = await AxiosInstance.patch(`meal/${id}/`, mealData);
        return response.data;
    } catch (error) {
        console.error(`Error updating meal with id ${id}:`, error);
        throw error;
    }
};

export const getMealById = async (id: number): Promise<MealData> => {
    try {
      const response = await AxiosInstance.get(`meal/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching meal with id ${id}:`, error);
      throw error;
    }
};
