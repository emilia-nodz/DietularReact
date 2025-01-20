import React from 'react';
import { NavLink} from 'react-router-dom';
import "../Styles/NavBar.css"

function NavBar() {
    return (
        <div className="top_nav">
            <nav>
                <ul>
                <li><NavLink to="/">Dietular</NavLink></li>
                <li>plan for a better tomorrow</li>
                <li className="split"><NavLink to="/calendar">Calendar</NavLink></li>
                <li className="split"><NavLink to="/meals">Meals</NavLink></li>
                <li className="split"><NavLink to="/items">Items</NavLink></li>
                <li className="split"><NavLink to="/allergens">Allergens</NavLink></li>

                <div className="dropdown">
                    <li ><button className="dropbtn">+</button></li>
                    <div className="dropdown-content">
                        <NavLink to="/addAllergen">New allergen</NavLink>
                        <NavLink to="/addItem">New item</NavLink>
                        <NavLink to="/addMeal">New meal</NavLink>
                    </div>
                </div>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;