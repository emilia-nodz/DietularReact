import React, { useEffect, useState } from "react";
import "../../Styles/Form.css";
import { useParams } from "react-router-dom";
import { AllergenData, getAllAllergens } from "../../Services/AllergenService";
import { getItemById, updateItem } from "../../Services/ItemService";
import { LightButton, RedButton } from "../Button";
import Error from "../Error";

const EditItem = () => {
    const { id } = useParams<{ id: string }>();
    
    const [newItemData, setNewItemData] = useState({
        name: "",
        description: "",
        weight: 0,
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        fats: 0,
        allergens: [] as number[],
    });

    const [originalItemData, setOriginalItemData] = useState(newItemData);

    const [allergens, setAllergens] = useState<AllergenData[]>([]);
    const [isFormNotValid, setIsFormNotValid] = useState(true);
    const[nameContainsOnlyLetters, updateNameContainsOnlyLetters] = useState(false);
    const [numberGreaterThanZero, updateNumberGreaterThanZero] = useState({
        weight: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
    });
  

    useEffect(() => {
        const fetchItem = async () => {
        try {
            const item = await getItemById(Number(id));
            const allergenData = await getAllAllergens();
                
            const fetchedData = {
            name: item.name,
            description: item.description,
            weight: item.weight,
            calories: item.calories,
            carbohydrates: item.carbohydrates,
            proteins: item.proteins,
            fats: item.fats,
            allergens: item.allergen_details.map(a => a.id),
            };

            setNewItemData(fetchedData);
            setOriginalItemData(fetchedData);

            if (Array.isArray(allergenData)) {
            setAllergens(allergenData);
            }
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
        };

        if (id) fetchItem();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewItemData(prev => ({
        ...prev,
        [name]:
            name === "weight" ||
            name === "calories" ||
            name === "carbohydrates" ||
            name === "proteins" ||
            name === "fats"
            ? Number(value)
            : value
        }));
    };

    const handleAllergenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const allergenId = Number(value); 
    
        setNewItemData(prev => ({
            ...prev,
            allergens: checked
                ? [...prev.allergens, allergenId] 
                : prev.allergens.filter(id => id !== allergenId) 
        }));
    };
    

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        setNewItemData(originalItemData);
        setIsFormNotValid(true); 
        console.log("Cancel button clicked - changes reverted");
    };

    const handlePost = async () => {
        if (newItemData.name.trim()) {
        try {
            await updateItem(Number(id), newItemData);
            console.log("Item updated successfully!");
        } catch (error) {
            console.error("Error updating item:", error);
        }
        } else {
        console.log("Please provide a valid item name.");
        }
    };

    const validateData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        const letters = /^[A-Za-z]+$/;
    
        if (data.length >= 1) {
            if (data.match(letters)) {
                updateNameContainsOnlyLetters(true);  
                setIsFormNotValid(false);  
            } else {
                updateNameContainsOnlyLetters(false); 
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
        handleInputChange(event);
        validateData(event);
    };

    const handleNumbersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event);
        validateNumber(event);
    };
    
    return (
        <div className="main-container">
        <h1>Edit Item</h1>
        <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); handlePost(); }}>
            <div className="form-thing">
                <label>Name</label>
                <input 
                name="name" 
                value={newItemData.name} 
                onChange={handleCombinedChange} 
                />
                <Error status={nameContainsOnlyLetters} info="Name must consist of only letters"/>              
            </div>
            <div className="form-thing">
                <label>Description</label>
                <input 
                name="description" 
                value={newItemData.description} 
                onChange={handleInputChange} 
                />
            </div>
            <div className="form-thing">
                <label>Weight</label>
                <input 
                name="weight" 
                value={newItemData.weight} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.weight} info="Weight must be greater than zero"/>  
            </div>
            <div className="form-thing">
                <label>Calories</label>
                <input 
                name="calories" 
                value={newItemData.calories} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.calories} info="Calories must be greater than zero"/>  
            </div>
            <div className="form-thing">
                <label>Carbohydrates</label>
                <input 
                name="carbohydrates" 
                value={newItemData.carbohydrates} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.carbohydrates} info="Carbs must be greater than zero"/>  
            </div>
            <div className="form-thing">
                <label>Proteins</label>
                <input 
                name="proteins" 
                value={newItemData.proteins} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.proteins} info="Proteins must be greater than zero"/> 
            </div>
            <div className="form-thing">
                <label>Fats</label>
                <input 
                name="fats" 
                value={newItemData.fats} 
                onChange={handleNumbersChange} 
                />
                <Error status={numberGreaterThanZero.fats} info="Fats must be greater than zero"/> 
            </div>
            <div className="form-thing">
                <label>Allergens</label>
                <div>
                    {allergens.map(allergen => (
                        <div key={allergen.id}>
                            <label>
                            <input
                                type="checkbox"
                                value={allergen.id}
                                checked={newItemData.allergens.includes(allergen.id)}
                                onChange={handleAllergenChange}
                            />
                            {allergen.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="form-thing">
                <LightButton label="Confirm" disabled={isFormNotValid} />
                <br></br>
                <RedButton label="Cancel" onClick={handleCancel} />
            </div>
            </form>
        </div>
        </div>
    );
};

export default EditItem;
