import React from "react";
import "../../Styles/List.css"

const MealList = () => {
    return (
        <>
            <div className="main-container">
            <h1>Meal list</h1>

            <ul>
                <div className="list-container">
                    <li className="list-item-container">
                    <p className="name"></p>
                    <p className="description"></p>
                    {/* <button className="btn-view" (click)="showDetails(meal.id)">View</button>
                    @if(checker === meal.id) { 
                        <app-meal-details [index]="$index"/>
                    }
                    <button className="btn-view" (click)="update(meal.id)"> Edit </button>
                    @if(updateChecker === meal.id) {
                        <app-edit-meal [index]="$index"></app-edit-meal>
                    }

                    <button className="btn-view2" (click)="showConfirmation(meal.id)"> Delete </button>
                
                    @if(checkerfordelete === meal.id) 
                    {
                        <div className="form-container">
                        <div className="form-thing">
                            <h3>Are you sure you want to delete {{meal.name}}?</h3>
                        </div>
                        <div className="form-buttons">
                            <button className="btn-view2" (click)="deleteThing(meal.id)">Yes</button>
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

export default MealList;