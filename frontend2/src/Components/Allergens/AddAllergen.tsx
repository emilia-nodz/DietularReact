import React, { useState } from "react";
import "../../Styles/Form.css"
import {AllergenData, addAllergen } from "../../Services/AllergenService";
import { LightButton } from "../Button";
import Error from "../Error";

const AddAllergen = () => {
    const [NewAllergenName, setAllergenName] = useState<string>('');
    const [allergens, setAllergens] = useState<AllergenData[]>([]); 
    const [isFormNotValid, setIsFormNotValid] = useState(true);

    const[nameContainsOnlyLetters, updatenameContainsOnlyLetters] = useState(false);

    const handlePost = async () => {
        if(NewAllergenName.length>0) {
            try {
                const newAllergen = await addAllergen({name: NewAllergenName})
                setAllergens([...allergens, newAllergen]);
                setAllergenName('');
                setIsFormNotValid(false);
            }   catch (error) {
                console.error('Error adding allergen:', error);
            }
        } else {
            console.log('Please provide a valid allergen name.');
        }
    };
 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllergenName(event.target.value);
        setIsFormNotValid(event.target.value.trim().length === 0);
    }

    const validateData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        const letters = /^[A-Za-z]+$/;

        if (data.length >= 1) {
            if (data.match(letters)) {
                updatenameContainsOnlyLetters(true);  
                setIsFormNotValid(false);  
            } else {
                updatenameContainsOnlyLetters(false); 
                setIsFormNotValid(true); 
            }
        }
    }
   
    const handleCombinedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event);
        validateData(event);
      };
   
    return (
        <>
            <div className="main-container">
                <h1>Add allergen</h1>
                <div className="form-container">
                    <form onSubmit={handlePost}>
                    <div className="form-thing">
                        <label>Name</label>
                        <input 
                            name="name" 
                            value={NewAllergenName} 
                            onChange={handleCombinedChange} 
                        />
                        <Error status={nameContainsOnlyLetters} info="Name must consist of only letters"/>
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

}

export default AddAllergen;