import React from "react";
import "../../Styles/Form.css"

const AddItem = () => {
    return (
        <>
            <div className="main-container">
                <h1>Add item</h1>
                <div className="form-container">
                    {/* <form [formGroup]="formModel" (ngSubmit)="submitForm()">
                        <div className="form-thing">
                            <label className="label">Name</label>
                            <input type="text" className="title" formControlName="name" placeholder="Name">
                            @if(formModel.controls['name'].errors?.['required']) {
                            <span className="error">Item name is required</span>
                            } @else if(formModel.controls['name'].errors?.['maxlength']!= null) {
                            <span className="error">Max length name is {{formModel.controls['name'].errors?.['maxlength']['requiredLength']}}</span>
                            }
                        </div>

                        <div className="form-thing">
                            <label className="label">Description</label>
                            <input type="text" className="description" formControlName="desc" placeholder="Description">
                            @if(formModel.controls['desc'].errors?.['required']) {
                            <span className="error">Description is required</span>
                            } 
                        </div>

                        <div className="form-thing">
                            <label className="label">Weight</label>
                            <input type="number" className="weight" placeholder="Weight (g)" formControlName="weight">
                            @if(formModel.controls['weight'].errors?.['required']) {
                            <span className="error">Value is required</span>
                            } @else if(formModel.controls['weight'].errors?.['min']!=null) {
                            <span className="error">Value must be a number grater than 0</span>
                            }
                        </div>

                        <div className="form-thing">
                            <label className="label">Calories</label>
                            <input type="number" className="calories" placeholder="Calories (kCal)" formControlName="cal">
                            @if(formModel.controls['cal'].errors?.['required']) {
                            <span className="error">Value is required</span>
                            } @else if(formModel.controls['cal'].errors?.['min']!=null) {
                            <span className="error">Value must be a number grater than 0</span>
                            }
                        </div>

                        <div className="form-thing">
                            <label className="label">Carbohydrates</label>
                            <input type="number" className="carbs" placeholder="Carbohydrates (g)" formControlName="carbs">
                            @if(formModel.controls['carbs'].errors?.['required']) {
                            <span className="error">Value is required</span>
                            } @else if(formModel.controls['carbs'].errors?.['min']!=null) {
                            <span className="error">Value must be a number grater than 0</span>
                            }
                        </div>

                        <div className="form-thing">
                            <label className="label">Protein</label>
                            <input type="number" className="protein" placeholder="Protein (g)" formControlName="protein">
                            @if(formModel.controls['protein'].errors?.['required']) {
                            <span className="error">Value is required</span>
                            } @else if(formModel.controls['protein'].errors?.['min']!=null) {
                            <span className="error">Value must be a number grater than 0</span>
                            }
                        </div>

                        <div className="form-thing">
                            <label className="label">Fats</label>
                            <input type="number" min="0" className="fats" placeholder="Fats (g)" formControlName="fats">
                            @if(formModel.controls['fats'].errors?.['required']) {
                            <span className="error">Value is required</span>
                            } @else if(formModel.controls['fats'].errors?.['min']!=null) {
                            <span className="error">Value must be a number grater than 0</span>
                            }
                        </div>

                        <div className="form-thing"><label for="allergens" className="label" >Allergens:</label>
                            <select className="allergen" formControlName="allergens" multiple>
                            @for(alle of allergensList; track $index) {
                                <option [value]="alle.id">{{alle.name}}</option>
                            }
                            </select>
                        </div>

                        <div className="form-thing">
                            <input [disabled]="!formModel.valid" type="submit" value="Add item" className="btn-view">
                        </div>
                    </form> */}
                </div>
            </div>
        </>
    );
};

export default AddItem;
