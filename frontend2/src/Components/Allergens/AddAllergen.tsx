import React, { useState } from "react";
import "../../Styles/Form.css"
import {AllergenData, addAllergen } from "../../Services/AllergenService";
 
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
            
            <input 
                name="NewAllergenNameInput" 
                value={NewAllergenName} 
                onChange={HandleInputChange} 
            />
             <button onClick={HandlePost}>Confirm</button>

            {/* <div className="form-container">
                <form [formGroup]="formModel" (ngSubmit)="submitForm()">
                    <div className="form-thing">
                        <label>Name</label>
                        <input type="text" formControlName="name" placeholder="Name">
                        @if(formModel.controls['name'].errors?.['required']){
                            <span className="error">Name is required</span>
                        }
                    </div>
                    <div className="form-thing">
                        <input [disabled]="!formModel.valid" type="submit" value="Add allergen" className="btn-view">
                    </div>  
                </form> */}
            </div>
        </>
    );

}

export default AddAllergen;