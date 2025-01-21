import React, { useState, useEffect } from "react";
import styles from "./DayDetail.module.css";

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
    const [showItemDropdown, setShowItemDropdown] = useState(false);
    const [showMealDropdown, setShowMealDropdown] = useState(false);
    const [tempItems, setTempItems] = useState<{ id: number; name: string }[]>([]);
    const [tempMeals, setTempMeals] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        if (props.day) {
            setTempItems(props.day.item_details || []);
            setTempMeals(props.day.meal_details || []);
        }
    }, [props.day]);

    const itemClick = () => setShowItemDropdown(!showItemDropdown);
    const mealClick = () => setShowMealDropdown(!showMealDropdown);

    const addItemToDay = (item: { id: number; name: string }) => {
        setTempItems((prev) => [...prev, item]);
    };

    const removeItemFromDay = (item: { id: number; name: string }) => {
        setTempItems((prev) => prev.filter((i) => i.id !== item.id));
    };

    const addMealToDay = (meal: { id: number; name: string }) => {
        setTempMeals((prev) => [...prev, meal]);
    };

    const removeMealFromDay = (meal: { id: number; name: string }) => {
        setTempMeals((prev) => prev.filter((m) => m.id !== meal.id));
    };

    const saveDay = () => {
        if (!props.day) {
            console.warn("No day to save");
            return;
        }
        console.log("Saving day:", {
            id: props.day.id,
            date: props.day.date,
            items: tempItems,
            meals: tempMeals,
        });
    };

    if (!props.day) {
        return null;
    }

    return (
        <div className={styles.dayDetailContainer}>
            <h3>Details for {new Date(props.day.date).toLocaleDateString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h3>

            {/* ITEMS SECTION */}
            <div className={styles.section}>
                <h4>Items</h4>
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
                        <li>There are no items</li>
                    )}
                </ul>
                <img
                    src="http://localhost:8000/media/icons/circle-ellipsis.png"
                    alt="Add item"
                    onClick={itemClick}
                />
                {showItemDropdown && (
                    <div className={styles.dropdown}>
                        <p>Item list dropdown (to be implemented)</p>
                    </div>
                )}
            </div>

            {/* MEALS SECTION */}
            <div className={styles.section}>
                <h4>Meals</h4>
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
