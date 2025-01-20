import React, { useState, useEffect } from 'react';
import "../../Styles/List.css"
import { getMeals, MealData} from "../../Services/MealService";

const MealList = () => {


  const [meals, setMeals] = useState<MealData[]>([]); 

    useEffect(() => {
        const fetchMeals = async () => {
          try {
            const data = await getMeals();
            if (Array.isArray(data)) {
                setMeals(data);
            }
          } catch (error) {
            console.error('Error loading meals:', error);
          }
        };
        fetchMeals();
      }, []);

    return (
        <>
        <div className="main-container">
        <h1>Meal list</h1>

            <ul>
            <div className="list-container">

                {meals.map((meal) => (
                    <li key = {meal.id} className="list-item-container">
                        <p className="name">{meal.name}</p>
                        </li>
                ))}
            

             </div>
             </ul>
             </div>
             </>
)};
export default MealList;