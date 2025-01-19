import React, {useEffect, useState} from 'react';
import { NavLink, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios, { all } from 'axios';


// ten komponent jest tylko na chwile


function Pomocniczny_z_serwisami() {

    const [items, setItems] = useState<any[]>([]);
    const [allergens, setAllergens] = useState<any[]>([]);
    const [meals, setMeals] = useState<any[]>([]);
    const [days, setDays] = useState<any[]>([]);
    
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      Promise.all([
        axios.get('http://127.0.0.1:8000/api/item'),
        axios.get('http://127.0.0.1:8000/api/allergen'),
        axios.get('http://127.0.0.1:8000/api/meal'),
        axios.get('http://127.0.0.1:8000/api/day')
      ])
      .then(([itemsResponse, allergensResponse, mealResponse, dayResponse]) => {
      
        setItems(itemsResponse.data);     
        setAllergens(allergensResponse.data);
        setMeals(mealResponse.data);
        setDays(dayResponse.data);
        setLoading(false);
        })
         
        .catch(err => {
          setError('Error fetching data');
          setLoading(false);
        });
    }, []);
  
  
    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>; 
  
    return (
      <div className="App">
      <ul>
  
          <h1>Items</h1>    
          {items.map(item => (
            <li key={item.id}>
            
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Weight: {item.weight}</p>
              <p>Calories: {item.calories}</p>
              <p>Carbohydrates: {item.carbohydrates}</p>
              <p>Proteins: {item.proteins}</p>
              <p>Fats: {item.fats}</p>
            </li>
          ))}
  
  
  
        <h1>Allergens</h1>
          {allergens.map(allergen=> (
            <li key={allergen.id}>
        
              <h3>{allergen.name}</h3>
              <p>ID: {allergen.id}</p>
            </li>
          ))}
  
     
  <h1>Meals</h1>
      {meals.map(meal => (
      <li key={meal.id}>
        
        <h3>{meal.name}</h3>
        <p>Description: {meal.description}</p>
        <p>Number of Portions: {meal.numberOfPortions}</p>
        <p>Portion Weight: {meal.portionWeight}</p>
        <p>Calories per Portion: {meal.caloriesPerPortion}</p>
        </li>
          ))}
  
  
        </ul>
      </div>
    );
};
export default Pomocniczny_z_serwisami;