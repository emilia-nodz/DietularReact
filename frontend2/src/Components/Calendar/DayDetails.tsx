import React, { useState, useEffect } from "react";
import styles from "./DayDetail.module.css";
import { updateDay } from "../../Services/DayService";
import ItemList from "./ItemList";

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
        if (day) {
          let updatedItems = day.item_details ? [...day.item_details] : [];
          updatedItems.push(item);
          day.item_details = updatedItems;
          setTempItems(updatedItems);
          console.log("Item added to day:", item);
        }
      };

      const removeItemFromDay = (item: Item): void => {
        if (day && day.item_details) {
          const updatedItems = day.item_details.filter(i => i.id !== item.id);
          day.item_details = updatedItems;
          setTempItems(updatedItems);
          console.log("Item removed from day:", item);
        }
      };

      const addMealToDay = (meal: Meal): void => {
        if (day) {
          let updatedMeals = day.meal_details ? [...day.meal_details] : [];
          updatedMeals.push(meal);
          day.meal_details = updatedMeals;
          setTempMeals(updatedMeals);
          console.log("Meal added to day:", meal);
        }
      };

      const removeMealFromDay = (meal: Meal): void => {
        if (day && day.meal_details) {
          const updatedMeals = day.meal_details.filter(m => m.id !== meal.id);
          day.meal_details = updatedMeals;
          setTempMeals(updatedMeals);
          console.log("Meal removed from day:", meal);
        }
      }

      const saveDay = (): void => {
        if (!day) {
          console.warn("No day to save");
          return;
        }
    
        if (!Array.isArray(day.item_details)) {
          day.item_details = [];
        }
        if (!Array.isArray(day.meal_details)) {
          day.meal_details = [];
        }
    
        const updatedDay = {
          id: day.id,
          date: day.date,
          items: day.item_details.map(item => item.id),
          meals: day.meal_details.map(meal => meal.id)
        };
    
        updateDay(day.id, { date: day.date, item_ids: updatedDay.items })
          .then((updatedDayFromServer) => {
            console.log("Day updated:", updatedDayFromServer);
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
                    alt="Add meal"
                    onClick={mealClick}
                />
                {showMealDropdown && (
                    <div className={styles.dropdown}>
                        <p>Meal list dropdown (to be implemented)</p>
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
