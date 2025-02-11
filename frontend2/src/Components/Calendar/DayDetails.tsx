import React, { useState, useEffect } from "react";
import styles from "./DayDetail.module.css";
import { updateDay, NewDayData } from "../../Services/DayService";
import ItemList from "./ItemList";
import MealList from "./MealList";

interface Item {
    id: number;
    name: string;
  }
  
  interface Meal {
    id: number;
    name: string;
  }
interface Day {
    id: number;
    date: string;
    item_details: { id: number; name: string }[] | null;
    meal_details: { id: number; name: string }[] | null;
}

interface DayDetailProps {
    day: Day | null;
    onDayUpdated: () => void;
}

export const DayDetail = (props:DayDetailProps ) => {
    const { day } = props;
    const [showItemDropdown, setShowItemDropdown] = useState(false);
    const [showMealDropdown, setShowMealDropdown] = useState(false);
    const [tempItems, setTempItems] = useState<{ id: number; name: string }[]>([]);
    const [tempMeals, setTempMeals] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        if (day) {
            setTempItems(day.item_details || []);
            setTempMeals(day.meal_details || []);
        }
    }, [day]);

    const itemClick = () => setShowItemDropdown(!showItemDropdown);
    const mealClick = () => setShowMealDropdown(!showMealDropdown);

    const addItemToDay = (item: Item): void => {
        setTempItems(prevItems => {
            const updatedItems = [...prevItems, item];
            console.log("Zaktualizowane tempItems:", updatedItems);
            return updatedItems;
        });
    };

    const removeItemFromDay = (item: Item): void => {
        setTempItems(prevItems => {
            const updatedItems = prevItems.filter(i => i.id !== item.id);
            console.log("Zaktualizowane tempItems po usunięciu:", updatedItems);
            return updatedItems;
        });
    };

    const addMealToDay = (meal: Meal): void => {
        setTempMeals((prevMeals) => {
          const updatedMeals = [...prevMeals, meal];
          console.log("Zaktualizowane tempMeals:", updatedMeals);
          return updatedMeals;
        });
      };

    const removeMealFromDay = (meal: Meal): void => {
      setTempMeals((prevMeals) => {
        const updatedMeals = prevMeals.filter((m) => m.id !== meal.id);
        console.log("Zaktualizowane tempMeals po usunięciu:", updatedMeals);
        return updatedMeals;
      });
    };

      const saveDay = (): void => {
        if (!day) {
          console.warn("No day to save");
          return;
        }
    
        const updatedDayPayload: NewDayData = {
            date: day.date,
            items: tempItems.map(item => item.id),
            meals: tempMeals.map(meal => meal.id) 
        };
    
        updateDay(day.id, updatedDayPayload)
        .then((updatedDayPayload) => {
            console.log("Day updated:", updatedDayPayload);
        })
        .catch((error) => {
            console.error("Error updating day:", error);
        });

      };
    
      if (!day) {
        return null;
      }
      

    return (
        <div className={styles.dayDetailContainer}>
            <h3>
              Szczegóły dnia:{" "}
              {new Date(day.date).toLocaleDateString("pl-PL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </h3>

            {/* ITEMS SECTION */}
            <div className={styles.section}>
                <h4>Produkty</h4>
                <ul className={styles.itemList}>
                    {tempItems.length > 0 ? (
                        tempItems.map((item) => (
                            <li key={item.id} className={styles.itemEntry}>
                                <img
                                    src="http://localhost:8000/media/icons/diamond-minus.png"
                                    alt={item.name}
                                    className={styles.itemIcon}
                                    onClick={() => removeItemFromDay(item)}
                                />
                                {item.name}
                            </li>
                        ))
                    ) : (
                        <li>Brak produktów</li>
                    )}
                </ul>
                <img
                    src="http://localhost:8000/media/icons/circle-ellipsis.png"
                    alt="Dodaj produkt"
                    onClick={itemClick}
                />
                {showItemDropdown && (
                    <div className={styles.dropdown}>
                         <ItemList assignedItems={tempItems} onItemSelect={addItemToDay} />
                    </div>
                )}
            </div>

            {/* MEALS SECTION */}
            <div className={styles.section}>
                <h4>Posiłki</h4>
                <ul className={styles.itemList}>
                    {tempMeals.length > 0 ? (
                        tempMeals.map((meal) => (
                            <li key={meal.id} className={styles.itemEntry}>
                                <img
                                    src="http://localhost:8000/media/icons/diamond-minus.png"
                                    alt={meal.name}
                                    className={styles.itemIcon}
                                    onClick={() => removeMealFromDay(meal)}
                                />
                                {meal.name}
                            </li>
                        ))
                    ) : (
                        <li>There are no meals</li>
                    )}
                </ul>
                <img
                    src="http://localhost:8000/media/icons/circle-ellipsis.png"
                    alt="Dodaj posiłek"
                    onClick={mealClick}
                />
                {showMealDropdown && (
                    <div className={styles.dropdown}>
                        <MealList assignedMeals={tempMeals} onMealSelect={addMealToDay} />
                    </div>
                )}
            </div>

            {/* SAVE BUTTON */}
            <button className={styles.btnView} onClick={saveDay}>
                Save Day
            </button>
        </div>
    );
};

export default DayDetail;
