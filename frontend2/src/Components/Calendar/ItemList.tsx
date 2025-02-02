import React, { useEffect, useState } from 'react';
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
      <h4>Dostępne Itemy</h4>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id} onClick={() => onItemSelect(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
