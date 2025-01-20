import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"; 
import { AllergenData, getAllergenById, updateAllergen } from "../../Services/AllergenService";

import "../../Styles/Form.css";
import { LightButton, RedButton } from "../Button";


const EditAllergen = () => {
    const { id } = useParams<{ id: string }>(); 
    
    const [NewAllergenName, setAllergenName] = useState<string>('');
    const [allergens, setAllergens] = useState<AllergenData[]>([]); 
    const [isFormNotValid, setIsFormNotValid] = useState(true);
    const [OldAllergenName, setOldAllergenName] = useState<string>(''); 
    

    useEffect(() => {
        const fetchAllergen = async () => {
            try {
                const allergen = await getAllergenById(Number(id));
                setOldAllergenName(allergen.name);
                setAllergenName(allergen.name);
                
            } catch (error) {
                console.error('Error getting allergen:', error);
            }
        };

        if (id) {
            fetchAllergen();
        }
    }, [id]); 

    const HandlePost = async () => {
        if (NewAllergenName.length > 0) {
            try {
                const updatedAllergen = await updateAllergen(Number(id), { name: NewAllergenName });

                setAllergens(prevAllergens =>
                prevAllergens.map(allergen =>
                    allergen.id === updatedAllergen.id ? updatedAllergen : allergen
                )
                );

                setAllergenName('');
                setIsFormNotValid(true);
                console.log("Allergen updated successfully!");
            } catch (error) {
                console.error("Error updating allergen:", error);
            }
        } else {
        console.log("Please provide a valid allergen name.");
        }
    };

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllergenName(event.target.value);
        setIsFormNotValid(event.target.value.trim().length === 0);
    };

    const HandleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        setAllergenName(OldAllergenName); 
        setIsFormNotValid(true); 
        console.log("Cancel button clicked");
    };

    return (
        <>
        <div className="main-container">
            <h1>Edit allergen</h1>
            <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); HandlePost(); }}>
                <div className="form-thing">
                <label>Name</label>
                <input 
                    name="NewAllergenNameInput" 
                    value={NewAllergenName} 
                    onChange={HandleInputChange} 
                />
                </div>
                <div className="form-thing">
                    <LightButton
                        label="Confirm"
                        disabled={isFormNotValid}
                    />
                    <RedButton
                        label="Cancel"
                        onClick={(e) => HandleCancel(e)}
                    />
                </div>
            </form>
            </div>
        </div>
        </>
    );
};

export default EditAllergen;