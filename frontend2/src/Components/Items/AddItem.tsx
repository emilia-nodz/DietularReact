import React, { useEffect, useState } from "react";
import "../../Styles/Form.css";
import { ItemData, addItem } from "../../Services/ItemService";
import { LightButton } from "../Button";
import { getAllAllergens, AllergenData} from "../../Services/AllergenService";

const AddItem = () => {
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



      const handleAllergenChange = (id: number) => {
        if (selectedAllergens.includes(id)) {
          console.log( "Selsected all: " + id);
          setSelectedAllergens(selectedAllergens.filter((allergenId) => allergenId !== id));

        } else {
          setSelectedAllergens([...selectedAllergens, id]);
        }
      };
      

  const HandlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (NewItemName.length > 0) {
        try {
            console.log("In try");
            const allergenIds: number[] = selectedAllergens as number[];
            
            const allergenDetails = allergens.filter(allergen =>
                selectedAllergens.includes(allergen.id)
              );

              console.log("Sending data:", {
                id:0,
                allergen_details: allergenDetails,
                name: NewItemName,
                description: NewItemDescription,
                weight: NewItemWeight,
                calories: NewItemCalories,
                carbohydrates: NewItemCarbohydrates,
                proteins: NewItemProteins,
                fats: NewItemFats,
            });
            const newItem = await addItem({
              allergens: selectedAllergens,
              name: NewItemName,
              description: NewItemDescription,
              weight: NewItemWeight,
              calories: NewItemCalories,
              carbohydrates: NewItemCarbohydrates,
              proteins: NewItemProteins,
              fats: NewItemFats,
            });
            console.log(allergenIds + " " + NewItemName + " " + NewItemDescription + " " + NewItemWeight);
            setItems(prevItems => [...prevItems, newItem]);
        setItemName('');
        setItemDescription('');
        setItemWeight(0);
        setItemCalories(0);
        setItemCarbohydrates(0);
        setItemProteins(0);
        setItemFats(0);
        setSelectedAllergens([]); 
        setIsFormNotValid(false);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    } else {
      console.log('Please provide a valid item name.');
    }
  };

  const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
    setIsFormNotValid(event.target.value.trim().length === 0);
  };

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setter(isNaN(value) ? 0 : value); 
  };

  return (
    <>
      <div className="main-container">
        <h1>Add item</h1>
        <div className="form-container">
          <form onSubmit={HandlePost}>
            <div className="form-thing">
              <label>Name</label>
              <input
                name="NewItemNameInput"
                value={NewItemName}
                onChange={HandleInputChange}
              />
            </div>
            <div className="form-thing">
              <label>Description</label>
              <input
                name="NewItemDescriptionInput"
                value={NewItemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </div>
            <div className="form-thing">
              <label>Weight</label>
              <input
                name="NewItemWeightInput"
                value={NewItemWeight}
              onChange={handleNumberChange(setItemWeight)}
                type="number"
              />
            </div>
            <div className="form-thing">
              <label>Calories</label>
              <input
                name="NewItemCaloriesInput"
                value={NewItemCalories}
                onChange={handleNumberChange(setItemCalories)}
                type="number"
              />
            </div>
            <div className="form-thing">
              <label>Carbohydrates</label>
              <input
                name="NewItemCarbohydratesInput"
                value={NewItemCarbohydrates}
                onChange={handleNumberChange(setItemCarbohydrates)}
                type="number"
              />
            </div>
            <div className="form-thing">
              <label>Proteins</label>
              <input
                name="NewItemProteinsInput"
                value={NewItemProteins}
                onChange={handleNumberChange(setItemProteins)}
                type="number"
              />
            </div>
            <div className="form-thing">
              <label>Fats</label>
              <input
                name="NewItemFatsInput"
                value={NewItemFats}
                 onChange={handleNumberChange(setItemFats)}
                type="number"
              />
            </div>

   
            <div className="form-thing">
              <label>Allergens</label>
              <div>
                {allergens.map((allergen) => (
                  <div key={allergen.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAllergens.includes(allergen.id)}
                        onChange={() => handleAllergenChange(allergen.id)}
                      />
                      {allergen.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-thing">
              <LightButton
                label="Confirm"
                disabled={isFormNotValid}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
