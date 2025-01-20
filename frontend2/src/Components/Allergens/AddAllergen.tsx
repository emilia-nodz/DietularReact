import React, { useState } from "react";
import "../../Styles/Form.css"
import {AllergenData, addAllergen } from "../../Services/AllergenService";
import { LightButton } from "../Button";

const AddAllergen = () => {
    const [NewAllergenName, setAllergenName] = useState<string>('');
    const [allergens, setAllergens] = useState<AllergenData[]>([]); 

    const HandlePost = async () => {
        if(NewAllergenName.length>0) {
            try {
                const newAllergen = await addAllergen({name: NewAllergenName})
                setAllergens([...allergens, newAllergen]);
                setAllergenName('');
            }   catch (error) {
                console.error('Error adding allergen:', error);
            }
        } else {
            console.log('Please provide a valid allergen name.');
        }
    };
 
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllergenName(event.target.value);
    }
   
   
    return (
        <>
            <div className="main-container">
                <h1>Add allergen</h1>
                <div className="form-container">
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
                            onClick={HandlePost}
                        />
                    </div>
                </div>
            </div>
        </>
    );

}

export default AddAllergen;