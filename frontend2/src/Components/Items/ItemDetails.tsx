import React from "react";
import { ItemData } from "../../Services/ItemService";


interface ItemDetailsProps {
    item: ItemData;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({item}) => {
    return (
        <>
            <p>Weight: {item.weight}</p>
            <p>Calories: {item.calories} </p>
            <p>Carbohydrates: {item.carbohydrates}</p>
            <p >Proteins: {item.proteins} </p>
            <p >Fats: {item.fats} </p>
            <p >Allergens: </p>
            <ul>
        {item.allergen_details.map((allergen) => (
          <li key={allergen.id}>{allergen.name}</li>
        ))}
      </ul>
        </>
    );

}

export default ItemDetails;
