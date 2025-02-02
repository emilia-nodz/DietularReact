import React, { useEffect, useState } from "react";
import "../../Styles/Form.css";
import { useParams } from "react-router-dom";
import { getItems, ItemData } from "../../Services/ItemService";
import { getMealById, updateMeal,  } from "../../Services/MealService";
import { LightButton, RedButton } from "../Button";

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

    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
        setNewMealData(prev => ({ ...prev, items: selectedOptions }));
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
                onChange={handleInputChange} 
                />
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
                onChange={handleInputChange} 
                />
            </div>
            <div className="form-thing">
                <label>Portion weight</label>
                <input 
                name="portionWeight" 
                value={newMealData.portionWeight} 
                onChange={handleInputChange} 
                />
            </div>
            <div className="form-thing">
                <label>Calories per portion</label>
                <input 
                name="caloriesPerPortion" 
                value={newMealData.caloriesPerPortion} 
                onChange={handleInputChange} 
                />
            </div>
            <div className="form-thing">
                <label>Items</label>
                <select multiple value={newMealData.items.map(String)} onChange={handleItemChange}>
                {items.map(item => (
                    <option key={item.id} value={item.id}>
                    {item.name}
                    </option>
                ))}
                </select>
            </div>
            <div className="form-thing">
                <LightButton label="Confirm" />
                <RedButton label="Cancel" onClick={handleCancel} />
            </div>
            </form>
        </div>
        </div>
    );
};

export default EditMeal;

