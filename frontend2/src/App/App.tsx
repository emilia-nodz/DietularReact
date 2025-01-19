import { Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import Allergens from '../Components/Allergens';
import NavBar from "../Components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allergens" element={<Allergens />} />
      </Routes>
    </>
  );
}

export default App;
