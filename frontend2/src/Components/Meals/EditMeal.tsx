import React, { useEffect, useState } from "react";
import "../../Styles/Form.css";
import { useParams } from "react-router-dom";
import { getItems, ItemData } from "../../Services/ItemService";
import { getMealById, updateMeal,  } from "../../Services/MealService";
import { LightButton, RedButton } from "../Button";
import Error from "../Error";

const EditMeal = () => {
    const { id } = useParams<{ id: string }>();
    
    const [newMealData, setNewMealData] = useState({
        name: "",
        description: "",
        numberOfPortions: 0,
        portionWeight: 0,
        caloriesPerPortion: 0,
        items: [] as number[],
    });

    const [originalMealData, setOriginalMealData] = useState(newMealData);

    const [items, setItems] = useState<ItemData[]>([]);
    const [isFormNotValid, setIsFormNotValid] = useState(true);
    const[nameContainsOnlyLetters, updatenameContainsOnlyLetters] = useState(true);
    const [nameTouched, setNameTouched] = useState(false);
    const [numberGreaterThanZero, updateNumberGreaterThanZero] = useState({
        numberOfPortions: true,
        portionWeight: true,
        caloriesPerPortion: true,
    });

    useEffect(() => {
        const fetchMeal = async () => {
        try {
            const meal = await getMealById(Number(id));
            const itemData = await getItems();
                
            const fetchedData = {
            name: meal.name,
            description: meal.description,
            numberOfPortions: meal.numberOfPortions,
            portionWeight: meal.portionWeight,
            caloriesPerPortion: meal.caloriesPerPortion,
            items: meal.item_details.map(a => a.id),
            };

            setNewMealData(fetchedData);
            setOriginalMealData(fetchedData);

            if (Array.isArray(itemData)) {
            setItems(itemData);
            }
        } catch (error) {
            console.error("Error fetching meal details:", error);
        }
        };

        if (id) fetchMeal();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMealData(prev => ({
        ...prev,
        [name]:
            name === "numberOfPortions" ||
            name === "portionWeight" ||
            name === "celoriesPerPortion" 
            ? Number(value)
            : value
        }));
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const itemId = Number(value); 
    
        setNewMealData(prev => ({
            ...prev,
            items: checked
                ? [...prev.items, itemId] 
                : prev.items.filter(id => id !== itemId) 
        }));
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        setNewMealData(originalMealData);
        setIsFormNotValid(true); 
        console.log("Cancel button clicked - changes reverted");
    };

    const handlePost = async () => {
        if (newMealData.name.trim()) {
        try {
            await updateMeal(Number(id), newMealData);
            console.log("Meal updated successfully!");
        } catch (error) {
            console.error("Error updating meal:", error);
        }
        } else {
        console.log("Please provide a valid meal name.");
        }
    };

    const validateData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        const letters = /^[A-Za-z]+$/;
    
        if (data.length >= 1) {
            if (data.match(letters)) {
                updatenameContainsOnlyLetters(false);  
                setIsFormNotValid(false);  
            } else {
                updatenameContainsOnlyLetters(true); 
                setIsFormNotValid(true); 
            }
        }
    }

    const validateNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numValue = Number(value);
    
        updateNumberGreaterThanZero(prev => {
            const updatedGreaterThanZero = { ...prev, [name]: numValue > 0 };
            
            const allValid = Object.values(updatedGreaterThanZero).every(Boolean);
            setIsFormNotValid(!allValid);
    
            return updatedGreaterThanZero;
        });
    };

    const handleCombinedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!nameTouched){
            setNameTouched(true);
        }
        handleInputChange(event);
        validateData(event);
    };

    const handleNumbersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event);
        validateNumber(event);
    };

    return (
        <div className="main-container">
        <h1>Edit Meal</h1>
        <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); handlePost(); }}>
            <div className="form-thing">
                <label>Name</label>
                <input 
                name="name" 
                value={newMealData.name} 
                onChange={handleCombinedChange} 
                />
                <Error status={!nameContainsOnlyLetters || !nameTouched} info="Name must consist of only letters"/>   
            </div>
            <div className="form-thing">
                <label>Description</label>
                <input 
                name="description" 
                value={newMealData.description} 
                onChange={handleInputChange} 
                />
            </div>
            <div className="form-thing">
                <label>Number of portions</label>
                <input 
                name="numberOfPortions" 
                value={newMealData.numberOfPortions} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.numberOfPortions} info="Number must be greater than zero"/>  
            </div>
            <div className="form-thing">
                <label>Portion weight</label>
                <input 
                name="portionWeight" 
                value={newMealData.portionWeight} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.portionWeight} info="Weight must be greater than zero"/>  
            </div>
            <div className="form-thing">
                <label>Calories per portion</label>
                <input 
                name="caloriesPerPortion" 
                value={newMealData.caloriesPerPortion} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.caloriesPerPortion} info="Calories must be greater than zero"/>  
            </div>
            <div className="form-thing">
                <label>Items</label>
                <div>
                    {items.map(item => (
                        <div key={item.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    checked={newMealData.items.includes(item.id)}
                                    onChange={handleItemChange}
                                />
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="form-thing">
                <LightButton label="Confirm" disabled={isFormNotValid}/>
                <br></br>
                <RedButton label="Cancel" onClick={handleCancel} />
            </div>
            </form>
        </div>
        </div>
    );
};

export default EditMeal;

