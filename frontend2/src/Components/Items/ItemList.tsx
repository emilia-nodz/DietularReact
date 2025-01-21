import React, { useState, useEffect } from 'react';
import "../../Styles/List.css"
import { deleteItem, getItems, ItemData} from "../../Services/ItemService";
import { NavLink } from 'react-router-dom';
import { LightButton, RedButton } from '../Button';

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

  const HandleDelete = async (id: number) => {
    try {
        await deleteItem(id);

        setItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );

        console.log('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <div className="main-container">
        <h1>Item list</h1>

        <ul>
          <div className="list-container">
            {items.map((item) => (
              <li key = {item.id} className="list-item-container">
                <p className="name">{item.name}</p>
                <NavLink to={`/editItem/${item.id}`}>
                  <LightButton label={'Edit'} />
                </NavLink>
                  <RedButton label={'Delete'} onClick={() => HandleDelete(item.id)}/>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  )};

export default ItemList;