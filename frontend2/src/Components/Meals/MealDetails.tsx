import React from "react";
import { MealData } from "../../Services/MealService";


interface MealDetailsProps {
    meal: MealData;
}

const MealDetails: React.FC<MealDetailsProps> = ({meal}) => {
    return (
        <>
            <p >Number of portions: {meal.numberOfPortions}</p>
            <p >Weight of a portion: {meal.portionWeight}</p>
            <p >Calories per portion: {meal.caloriesPerPortion}</p>
            <p>Items in the meal: </p>
            <ul>
      
            {meal.item_details.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
            </ul>   
        </>
    );

}

export default MealDetails;
