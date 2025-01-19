import React from "react";
import "../../Styles/Form.css"

const EditMeal = () => {
    return (
        <>
            <div className="main-container">
                <h1>Add meal</h1>
                <div className="form-container">
                {/* <form [formGroup]="formModel" (ngSubmit)="submitForm()">
                    <div className="form-thing">
                    <label className="label">Name</label>
                    <input type="text" formControlName="name" placeholder="Name">
                    @if(formModel.controls['name'].errors?.['required']) {
                        <span className="error">Meal name is required</span>
                    } @else if(formModel.controls['name'].errors?.['maxlength']!= null) {
                        <span className="error">Max length name is {{formModel.controls['name'].errors?.['maxlength']['requiredLength']}}</span>
                    }
                    </div>
            
                    <div className="form-thing">
                    <label className="label">Description</label>
                    <input type="text" formControlName="desc" placeholder="Description">
                    @if(formModel.controls['desc'].errors?.['required']) {
                        <span className="error">Description is required</span>
                    } 
                    </div>
            
                    <div className="form-thing">
                    <label className="label">Number of portions</label>
                    <input type="number" placeholder="Number of portions" formControlName="portionNo">
                    @if(formModel.controls['portionNo'].errors?.['required']) {
                        <span className="error">Value is required</span>
                    } @else if(formModel.controls['portionNo'].hasError('positiveNumberValidator')) {
                        <span className="error">Value must be a number grater than 0</span>
                    }
                    </div>
            
                    <div className="form-thing">
                    <label className="label">Weight of a portion</label>
                    <input type="number" placeholder="Weight of a portion (g)" formControlName="portionWe">
                    @if(formModel.controls['portionWe'].errors?.['required']) {
                        <span className="error">Value is required</span>
                    } @else if(formModel.controls['portionWe'].hasError('positiveNumberValidator')) {
                        <span className="error">Value must be a number grater than 0</span>
                    }
                    </div>
            
                    <div className="form-thing">
                    <label className="label">Calories per portion</label>
                    <input type="number" placeholder="Calories per portion (kCal)" formControlName="portionCal">
                    @if(formModel.controls['portionCal'].errors?.['required']) {
                        <span className="error">Value is required</span>
                    } @else if(formModel.controls['portionCal'].hasError('positiveNumberValidator')) {
                        <span className="error">Value must be a number grater than 0</span>
                    }
                    </div>

                    <div className="form-thing"><label for="items" className="label" >Items:</label>
                    <select className="item" formControlName="items" multiple>
                        @for(i of itemsList; track $index) {
                        <option [value]="i.id">{{i.name}}</option>
                        }
                    </select>
                    </div>
            
                    <div className="form-buttons">
                        <input [disabled]="!formModel.valid" type="submit" value="Update meal" className="btn-view">
                        <button className="btn-view2" (click)="cancel()">Cancel</button>
                    </div>
                </form> */}
                </div>
            </div>
        </>
    );
};

export default EditMeal;
