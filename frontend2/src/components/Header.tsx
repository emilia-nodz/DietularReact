import React from 'react';
import { NavLink, Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className="top_nav">
            <nav>
                <ul>
                <li><a href="">Dietular</a></li>
                <li>plan for a better tomorrow</li>
                <li className="split"></li>
                    {/* <NavLink to=''>Calendar</NavLink>                </li>
                <li className="split"><a routerLink="/meal-list-component" routerLinkActive="active" ariaCurrentWhenActive="page">Meals</a></li>
                <li className="split"><a routerLink="/item-list-component" routerLinkActive="active" ariaCurrentWhenActive="page">Items</a>
                </li>
                <li className="split"><a routerLink="/allergen-list-component" routerLinkActive="active" ariaCurrentWhenActive="page">Allergens</a></li> */}
                
                
                <div className="dropdown">
                    <li ><button className="dropbtn">+</button></li>
                    <div className="dropdown-content">
                    {/* <a routerLink="/add-allergen-component" routerLinkActive="active" ariaCurrentWhenActive="page">New allergen</a>
                    <a routerLink="/add-item-component" routerLinkActive="active" ariaCurrentWhenActive="page">New item</a>
                    <a routerLink="/add-meal-component" routerLinkActive="active" ariaCurrentWhenActive="page">New meal</a> */}
                    </div>
                </div>
                </ul>
            </nav>
        </div>
    )
} 