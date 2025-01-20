import React, { useEffect, useState } from "react";
import "../../Styles/Form.css"
import { useParams } from "react-router-dom";
import { AllergenData } from "../../Services/AllergenService";
import { getItemById, ItemData } from "../../Services/ItemService";

const EditItem = () => {
    const { id } = useParams<{ id: string }>();
    
    const [NewItemName, setItemName] = useState<string>('');
    const [NewItemDescription, setItemDescription] = useState<string>('');
    const [NewItemWeight, setItemWeight] = useState<number>(0);
    const [NewItemCalories, setItemCalories] = useState<number>(0);
    const [NewItemCarbohydrates, setItemCarbohydrates] = useState<number>(0);
    const [NewItemProteins, setItemProteins] = useState<number>(0);
    const [NewItemFats, setItemFats] = useState<number>(0);
    const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
    const [items, setItems] = useState<ItemData[]>([]);
    const [isFormNotValid, setIsFormNotValid] = useState(true);
    const [allergens, setAllergens] = useState<AllergenData[]>([]); 
    const [OldItemName, setOldItemName] = useState<string>('');
    const [OldItemDescription, setOldItemDescription] = useState<string>('');
    const [OldItemWeight, setOldItemWeight] = useState<number>(0);
    const [OldItemCalories, setOldItemCalories] = useState<number>(0);
    const [OldItemCarbohydrates, setOldItemCarbohydrates] = useState<number>(0);
    const [OldItemProteins, setOldItemProteins] = useState<number>(0);
    const [OldItemFats, setOldItemFats] = useState<number>(0);


    useEffect(() => {
        const fetchItem = async () => {
            try {
                const item= await getItemById(Number(id));
                setOldItemName(item.name);
                setItemName(item.name);
                setOldItemDescription(item.description);
                setItemDescription(item.description);
                setOldItemWeight(item.weight);
                setItemWeight(item.weight);
                setOldItemCalories(item.calories);
                setItemCalories(item.calories);
                setOldItemCarbohydrates(item.carbohydrates);
                setItemCarbohydrates(item.carbohydrates);
                setOldItemProteins(item.proteins);
                setItemProteins(item.proteins);
                setOldItemFats(item.fats);
                setItemFats(item.fats);
                
            } catch (error) {
                console.error('Error getting item:', error);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]); 

    const HandlePost = async () => {
        if (NewItemName.length > 0) {
            try {
                const updatedAllergen = await updateAllergen(Number(id), { name: NewAllergenName });

                setAllergens(prevAllergens =>
                prevAllergens.map(allergen =>
                    allergen.id === updatedAllergen.id ? updatedAllergen : allergen
                )
                );

                setAllergenName('');
                setIsFormNotValid(true);
                console.log("Allergen updated successfully!");
            } catch (error) {
                console.error("Error updating allergen:", error);
            }
        } else {
        console.log("Please provide a valid allergen name.");
        }
    };

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
            
                    <div className="form-buttons">
                    <input [disabled]="!formModel.valid" type="submit" value="Update item" className="btn-view">
                    <button className="btn-view2" (click)="cancel()">Cancel</button>
                    </div>
                </form> */}
                </div>
            </div>
        </>
    );
};

export default EditItem;
