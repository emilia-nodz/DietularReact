import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/item/')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);


  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>; 

  return (
    <div className="App">
    <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <br></br>
            {item.description}   
            <br></br>
            {item.weight}
            <br></br>
            {item.calories}
            <br></br>
            {item.carbohydrates}
            <br></br>
            {item.proteins}
            <br></br>
            {item.fats}       
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
