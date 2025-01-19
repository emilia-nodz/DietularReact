import { Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import AllergenList from '../Components/Allergens/AllergenList';
import NavBar from "../Components/NavBar";
import ItemList from '../Components/Items/ItemList';
import MealList from '../Components/Meals/MealList';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allergens" element={<AllergenList />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/meals" element={<MealList />} />
      </Routes>
    </>
  );
}

export default App;
