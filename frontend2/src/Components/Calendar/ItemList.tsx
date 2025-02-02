import React, { useEffect, useState } from 'react';
import styles from "./DayDetail.module.css";
import { getItems } from '../../Services/ItemService';

interface Item {
  id: number;
  name: string;
}

interface ItemListProps {
  assignedItems: Item[];
  onItemSelect: (item: Item) => void;
}

export const ItemList = (props: ItemListProps) => {
  const { assignedItems, onItemSelect } = props;
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems()
      .then((data: Item[]) => {
        setItems(data);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  useEffect(() => {
    const filtered = items.filter(
      (item) => !assignedItems.some((assigned) => assigned.id === item.id)
    );
    setFilteredItems(filtered);
  }, [items, assignedItems]);

  return (
    <div>
      <h4>Dostępne Produkty:</h4>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id} onClick={() => onItemSelect(item)} className={styles.itemEntry}>
            <img src="http://localhost:8000/media/icons/diamond-plus.png"
            alt={item.name}
            className={styles.itemIcon} />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
