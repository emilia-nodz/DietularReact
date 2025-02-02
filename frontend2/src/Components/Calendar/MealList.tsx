import React, { useEffect, useState } from 'react';
import styles from "./DayDetail.module.css";
import { getMeals } from '../../Services/MealService';

interface Meal {
  id: number;
  name: string;
}

interface MealListProps {
  assignedMeals: Meal[];
  onMealSelect: (meal: Meal) => void;
}

const MealList = (props: MealListProps) => {
  const { assignedMeals, onMealSelect } = props;
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getMeals()
      .then((data: Meal[]) => {
        setAllMeals(data);
      })
      .catch((error) => console.error('Error fetching meals:', error));
  }, []);

  useEffect(() => {
    const filtered = allMeals.filter(
      (meal) => !assignedMeals.some((assigned) => assigned.id === meal.id)
    );
    setFilteredMeals(filtered);
  }, [allMeals, assignedMeals]);

  return (
    <div>
      <h4>Dostępne posiłki:</h4>
      <ul>
        {filteredMeals.map((meal) => (
          <li key={meal.id} onClick={() => onMealSelect(meal)} className={styles.itemEntry}>
          <img src="http://localhost:8000/media/icons/diamond-plus.png"
          alt={meal.name}
          className={styles.itemIcon} />
          {meal.name}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
