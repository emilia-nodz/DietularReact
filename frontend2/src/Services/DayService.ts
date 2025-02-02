import AxiosInstance from "./Axios";

export interface Item {
    id: number;
    name: string;
}

export interface Meal {
    id: number;
    name: string;
}

export interface DayData {
    id: number;
    date: string;
    items: number[];
    meals: number[];
    item_details?: Item[];
    meal_details?: Meal[];
}

export interface NewDayData {
  date: string;
  items?: number[];
  meals?: number[];
}

export const getDays = async (): Promise<DayData[]> => {
  try {
    const response = await AxiosInstance.get('day/');
    return response.data;
  } catch (error) {
    console.error('Błąd pobierania dni:', error);
    throw error;
  }
};

export const addDay = async (dayData: NewDayData): Promise<DayData> => {
  try {
    const response = await AxiosInstance.post('day/', dayData);
    return response.data;
  } catch (error) {
    console.error('Błąd dodawania dnia:', error);
    throw error;
  }
};

export const deleteDay = async (id: number): Promise<void> => {
  try {
    await AxiosInstance.delete(`day/${id}/`);
    console.log(`Dzień o id ${id} został pomyślnie usunięty.`);
  } catch (error) {
    console.error(`Błąd usuwania dnia o id ${id}:`, error);
    throw error;
  }
};

export const updateDay = async (id: number, dayData: NewDayData): Promise<DayData> => {
  try {
    const response = await AxiosInstance.patch(`day/${id}/`, dayData);
    return response.data;
  } catch (error) {
    console.error(`Błąd aktualizacji dnia o id ${id}:`, error);
    throw error;
  }
};

export const getDayById = async (id: number): Promise<DayData> => {
  try {
    const response = await AxiosInstance.get(`day/${id}/`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
        throw error;
      } else {
    console.error(`Błąd pobierania dnia o id ${id}:`, error);
    throw error;
    }}
};

export const addItemToDay = async (dayId: number, itemId: number): Promise<DayData> => {
  try {
    const response = await AxiosInstance.post(`day/${dayId}/items/`, { itemId });
    return response.data;
  } catch (error) {
    console.error(`Błąd dodawania itemu o id ${itemId} do dnia ${dayId}:`, error);
    throw error;
  }
};
