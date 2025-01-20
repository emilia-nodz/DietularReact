import React, { useState, useEffect } from 'react';
import "../../Styles/List.css"
import { getItems, ItemData} from "../../Services/ItemService";










const ItemList = () => {


  const [items, setItems] = useState<ItemData[]>([]); 

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const data = await getItems();
            if (Array.isArray(data)) {
                setItems(data);
            }
          } catch (error) {
            console.error('Error loading items:', error);
          }
        };
        fetchItems();
      }, []);








    return (
        <>
            <div className="main-container">
            <h1>Item list</h1>

                <ul>
                <div className="list-container">

                    {items.map((item) => (
                        <li key = {item.id} className="list-item-container">
                            <p className="name">{item.name}</p>
                            </li>
                    ))}
                

                 </div>
                 </ul>
                 </div>
                 </>
    )};
export default ItemList;