import React, { useState, useEffect } from 'react';
import "../../Styles/List.css"
import { deleteMeal, getMeals, MealData} from "../../Services/MealService";
import { LightButton, RedButton } from '../Button';
import { NavLink } from 'react-router-dom';
import MealDetails from './MealDetails';
const MealList = () => {
  const [meals, setMeals] = useState<MealData[]>([]); 
  const [DetailsVisibility, setDetailsVisibility] = useState<number>(-1);

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


  const AimDetails = (mealID: number): void => {
    if(mealID != DetailsVisibility)
    {
      setDetailsVisibility(mealID);
    }
    else 
    {
      setDetailsVisibility(-1);
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
                  <p className="name"      onClick={() => AimDetails(meal.id)}      >{meal.name}</p>

                  {DetailsVisibility === meal.id && <MealDetails meal={meal}/>}


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