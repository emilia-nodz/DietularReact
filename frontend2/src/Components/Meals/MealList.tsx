import React, { useState, useEffect } from 'react';
import "../../Styles/List.css"
import { deleteMeal, getMeals, MealData} from "../../Services/MealService";
import { LightButton, RedButton } from '../Button';
import { NavLink } from 'react-router-dom';

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

  const handleDelete = async (id: number) => {
    try {
        await deleteMeal(id);
    
        setMeals((prevMeals) =>
            prevMeals.filter((meal) => meal.id !== id)
        );
    
        console.log('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting meal:', error);
    }
  };

  return (
    <>
      <div className="main-container">
      <h1>Meal list</h1>

        <ul>
          <div className="list-container">
            {meals.map((meal) => (
              <li key = {meal.id} className="list-item-container">
                  <p className="name">{meal.name}</p>
                  <NavLink to={`/editMeal/${meal.id}`}>
                    <LightButton label={'Edit'} />
                  </NavLink>
                    <RedButton label={'Delete'} onClick={() => handleDelete(meal.id)}/>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
)};
export default MealList;