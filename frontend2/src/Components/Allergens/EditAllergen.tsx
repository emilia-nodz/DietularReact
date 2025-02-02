import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { AllergenData, getAllergenById, updateAllergen } from "../../Services/AllergenService";
import "../../Styles/Form.css";
import { LightButton, RedButton } from "../Button";
import Error from "../Error";



const EditAllergen = () => {
    const { id } = useParams<{ id: string }>(); 
    
    const [NewAllergenName, setAllergenName] = useState<string>('');
    const [allergens, setAllergens] = useState<AllergenData[]>([]); 
    const [isFormNotValid, setIsFormNotValid] = useState(true);
    const [OldAllergenName, setOldAllergenName] = useState<string>(''); 

    const[nameContainsOnlyLetters, updatenameContainsOnlyLetters] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);

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

    const handlePost = async () => {
        if (NewAllergenName.length > 0) {
            try {
                const updatedAllergen = await updateAllergen(Number(id), { name: NewAllergenName });

                setAllergens(prevAllergens =>
                    prevAllergens.map(allergen =>
                        allergen.id === updatedAllergen.id ? updatedAllergen : allergen
                    )
                );

                setAllergenName('');
                console.log("Allergen updated successfully!");
            } catch (error) {
                console.error("Error updating allergen:", error);
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllergenName(event.target.value);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        setAllergenName(OldAllergenName); 
        setIsFormNotValid(true); 
        console.log("Cancel button clicked");
    };

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
        if (!nameTouched){
            setNameTouched(true);
        }
        handleInputChange(event);
        validateData(event);
    };

    return (
        <>
        <div className="main-container">
            <h1>Edit allergen</h1>
            <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); handlePost(); }}>
                <div className="form-thing">
                <label>Name</label>
                <input 
                    name="name" 
                    value={NewAllergenName} 
                    onChange={handleCombinedChange} 
                />
                <Error status={nameContainsOnlyLetters || !nameTouched} info="Name must consist of only letters"/>
                </div>
                <div className="form-thing">
                    <LightButton
                        label="Confirm"
                        disabled={isFormNotValid}
                    />
                    <br></br>
                    <RedButton
                        label="Cancel"
                        onClick={(e) => handleCancel(e)}
                    />
                </div>
            </form>
            </div>
        </div>
        </>
    );
};

export default EditAllergen;