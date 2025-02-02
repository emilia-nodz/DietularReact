import React, { useEffect, useState } from 'react';
import { getItems } from '../../Services/ItemService';

// Definicja interfejsu Item lokalnie
interface Item {
  id: number;
  name: string;
}

interface ItemDetailsProps {
  index: number;
}

export const ItemDetails = (props: ItemDetailsProps) => {
  const { index } = props;
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    getItems()
      .then((data: Item[]) => {
        setItems(data);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  useEffect(() => {
    if (items.length > index) {
      setSelectedItem(items[index]);
    }
  }, [items, index]);

  if (!selectedItem) {
    return <div>Brak szczegółów dla itemu</div>;
  }

  return (
    <div>
      <h4>Szczegóły Itemu</h4>
      <p>ID: {selectedItem.id}</p>
      <p>Nazwa: {selectedItem.name}</p>
      {/* Możesz dodać więcej szczegółów w zależności od wymagań */}
    </div>
  );
};

export default ItemDetails;
