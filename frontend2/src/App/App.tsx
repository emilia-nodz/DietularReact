import { Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import AllergenList from '../Components/Allergens/AllergenList';
import NavBar from "../Components/NavBar";
import ItemList from '../Components/Items/ItemList';
import MealList from '../Components/Meals/MealList';
import AddAllergen from '../Components/Allergens/AddAllergen';
import AddItem from '../Components/Items/AddItem';
import AddMeal from '../Components/Meals/AddMeal';
import EditAllergen from '../Components/Allergens/EditAllergen';
import EditItem from '../Components/Items/EditItem';
import Calendar from '../Components/Calendar/Calendar';
import EditMeal from '../Components/Meals/EditMeal';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allergens" element={<AllergenList />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/meals" element={<MealList />} />
        <Route path="/addAllergen" element={<AddAllergen />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/addMeal" element={<AddMeal />} />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="/editAllergen/:id" element={<EditAllergen />}
        />
        <Route path="/editItem/:id" element={<EditItem/>} />
        <Route path="/editMeal/:id" element={<EditMeal/>} />

      </Routes>
    </>
  );
}

export default App;
