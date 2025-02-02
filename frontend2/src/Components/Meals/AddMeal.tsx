import React, { useEffect, useState } from "react";
import "../../Styles/Form.css";
import { MealData, addMeal } from "../../Services/MealService";
import { LightButton } from "../Button";
import { getItems, ItemData} from "../../Services/ItemService";

const AddMeal = () => {
  const [NewMealName, setMealName] = useState<string>('');
  const [NewMealItems, setMealItems] = useState<number[]>([]);
  const [NewMealDescription, setMealDescription] = useState<string>('');
  const [NewMealNumPortions, setMealNumPotions] = useState<number>(0);
  const [NewMealPortion, setMealPortion] = useState<number>(0);
  const [NewMealCalories, setMealCalories] = useState<number>(0);
  const [meals, setMeals] = useState<MealData[]>([]);
  const [isFormNotValid, setIsFormNotValid] = useState(true);
  const [items, setItems] = useState<ItemData[]>([]); 
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

       useEffect(() => {
           const fetchItems = async () => {
             try {
               const data = await getItems();
               if (Array.isArray(data)) {
                   setItems(data);
               }
             } catch (error) {
               console.error('Error loading items:', error);
             }
           };
           fetchItems();
         }, []);
    

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (NewMealName.length > 0) {
        try {
            const newMeal = await addMeal({
                items: selectedItems,
                name: NewMealName,
                description: NewMealDescription,
                numberOfPortions: NewMealNumPortions,
                portionWeight: NewMealPortion,
                caloriesPerPortion: NewMealCalories,
                
            });
            setMeals(prevItems => [...prevItems, newMeal]);
        setMealName('');
      } catch (error) {
        console.error('Error adding meal:', error);
      }
    } else {
      console.log('Please provide a valid meal name.');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealName(event.target.value);
    setIsFormNotValid(event.target.value.trim().length === 0);
  };

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setter(isNaN(value) ? 0 : value); 
  };

  const handleItemChange = (id: number) => {
    if (selectedItems.includes(id)) {
      console.log( "Selsected all: " + id);
      setSelectedItems(selectedItems.filter((allergenId) => allergenId !== id));

    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };



  return (
    <>
      <div className="main-container">
        <h1>Add meal</h1>
        <div className="form-container">
          <form onSubmit={handlePost}>
            <div className="form-thing">
              <label>Name</label>
              <input
                name="NewMealNameInput"
                value={NewMealName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-thing">
              <label>Description</label>
              <input
                name="NewMealDescriptionInput"
                value={NewMealDescription}
                onChange={(e) => setMealDescription(e.target.value)}
              />
            </div>

            <div className="form-thing">
              <label>Number of portions</label>
              <input
                name="NewNumPortionsInput"
                value={NewMealNumPortions}
              onChange={handleNumberChange(setMealNumPotions)}
                type="number"
              />
            </div>

            <div className="form-thing">
              <label>Portion weight</label>
              <input
                name="NewItemPortionInput"
                value={NewMealPortion}
              onChange={handleNumberChange(setMealPortion)}
                type="number"
              />
            </div>

            <div className="form-thing">
              <label>Calories per portions</label>
              <input
                name="NewMealCaloriesInput"
                value={NewMealCalories}
                onChange={handleNumberChange(setMealCalories)}
                type="number"
              />
            </div>            

   
            <div className="form-thing">
              <label>Items</label>
              <div>
                {items.map((item) => (
                  <div key={item.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleItemChange(item.id)}
                      />
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-thing">
              <LightButton
                label="Confirm"
                disabled={isFormNotValid}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMeal;
