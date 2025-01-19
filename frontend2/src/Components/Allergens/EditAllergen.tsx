import React from "react";
import "../../Styles/Form.css"

const EditAllergen = () => {
    return (
        <>
            <div className="main-container">
            <h1>Add allergen</h1>
                <div className="form-container">
                {/* <form [formGroup]="formModel" (ngSubmit)="submitForm()">
                    <div className="form-thing">
                        <h3><label>Allergen name:</label></h3>
                        <input id="name" formControlName="name" />
                        @if(formModel.controls['name'].errors?.['maxlength']!= null) {
                            <span className="error">Max length name is {{formModel.controls['name'].errors?.['maxlength']['requiredLength']}}</span>
                        }
                    </div>
                    <div className="form-buttons">
                        <input [disabled]="!formModel.valid" type="submit" value="Update allergen" className="btn-view">
                        <button className="btn-view2" (click)="cancel()">Cancel</button>
                    </div>
                </form> */}
                </div> 
            </div>
        </>
    );
}
export default EditAllergen;