import AxiosInstance from "./Axios";
import { ItemData } from "./ItemService";

// Definicja struktury danych dnia
export interface DayData {
  id: number;
  date: string;
  items: ItemData[];
}

// Dane potrzebne przy tworzeniu lub aktualizacji dnia.
// Opcjonalnie można przekazać początkową listę itemów (np. jako tablicę id itemów).
export interface NewDayData {
  date: string;
  item_ids?: number[];
}

// Pobranie listy dni
export const getDays = async (): Promise<DayData[]> => {
  try {
    const response = await AxiosInstance.get('day/');
    return response.data;
  } catch (error) {
    console.error('Błąd pobierania dni:', error);
    throw error;
  }
};

// Dodanie nowego dnia
export const addDay = async (dayData: NewDayData): Promise<DayData> => {
  try {
    const response = await AxiosInstance.post('day/', dayData);
    return response.data;
  } catch (error) {
    console.error('Błąd dodawania dnia:', error);
    throw error;
  }
};

// Usunięcie dnia
export const deleteDay = async (id: number): Promise<void> => {
  try {
    await AxiosInstance.delete(`day/${id}/`);
    console.log(`Dzień o id ${id} został pomyślnie usunięty.`);
  } catch (error) {
    console.error(`Błąd usuwania dnia o id ${id}:`, error);
    throw error;
  }
};

// Aktualizacja danych dnia
export const updateDay = async (id: number, dayData: NewDayData): Promise<DayData> => {
  try {
    const response = await AxiosInstance.patch(`day/${id}/`, dayData);
    return response.data;
  } catch (error) {
    console.error(`Błąd aktualizacji dnia o id ${id}:`, error);
    throw error;
  }
};

// Pobranie szczegółowych informacji o konkretnym dniu
export const getDayById = async (id: number): Promise<DayData> => {
  try {
    const response = await AxiosInstance.get(`day/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Błąd pobierania dnia o id ${id}:`, error);
    throw error;
  }
};

// Przypisanie itemu do konkretnego dnia
export const addItemToDay = async (dayId: number, itemId: number): Promise<DayData> => {
  try {
    // Zakładamy, że endpoint przyjmujący dodanie itemu do dnia to 'day/{dayId}/items/'
    const response = await AxiosInstance.post(`day/${dayId}/items/`, { itemId });
    return response.data;
  } catch (error) {
    console.error(`Błąd dodawania itemu o id ${itemId} do dnia ${dayId}:`, error);
    throw error;
  }
};
