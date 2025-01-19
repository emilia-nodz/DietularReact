import React from "react";
import "../../Styles/Form.css"

const AddAllergen = () => {
    return (
        <>
            <div className="main-container">
            <h1>Add allergen</h1>
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