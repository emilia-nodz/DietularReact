import React from "react";
import "../../Styles/List.css"

const AllergenList = () => {
    return (
        <>
            <div className="main-container">
            <h1>Allergen list</h1>
        
            <ul>
                <div className="list-container">
                    <li className="list-allergen-container">
                    <p className="name"></p>
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
                    
                    </li>
                
                </div>
                </ul>
            </div>
        </>
    );

}

export default AllergenList;