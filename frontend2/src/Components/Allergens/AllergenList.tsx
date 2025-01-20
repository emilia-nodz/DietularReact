import React, { useState, useEffect } from 'react';
import "../../Styles/List.css"
import { getAllAllergens, AllergenData} from "../../Services/AllergenService";

const AllergenList = () => {
    const [allergens, setAllergens] = useState<AllergenData[]>([]); 

    useEffect(() => {
        const fetchAllergens = async () => {
          try {
            const data = await getAllAllergens();
            if (Array.isArray(data)) {
                setAllergens(data);
            }
          } catch (error) {
            console.error('Error loading allergens:', error);
          }
        };
        fetchAllergens();
      }, []);

      
    return (
        
            <div className="main-container">
        
            <h1>Allergen list</h1>
        
            <ul>
                <div className="list-container">
                    {allergens.map((allergen) => (
                        <li key = {allergen.id} className="list-item-container">
                            <p className="name">{allergen.name}</p>
                            </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};
                    



                    {/* <button className="btn-view" (click)="update(allergen.id)"> Edit </button> */}
                    
                    {/*   <button className="btn-view2" (click)="showConfirmation(allergen.id)"> Delete </button> */}
                
                    {/*
                    {
                        <div className="form-container">
                        <div className="form-thing">
                            <h3>Are you sure you want to delete {{allergen.name}}?</h3>
                        </div>
                        <div className="form-buttons">
                            <button className="btn-view2" (click)="deleteThing(allergen.id)">Yes</button>
                            <button className="btn-view" (click)="undo()">No</button>
                        </div>
                        </div>
                    } */}
                    
 

export default AllergenList;