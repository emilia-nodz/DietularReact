import React from 'react';
import "../Styles/Home.css"
import breakfast from '../images/breakfast.jpg'; 
import lunch from '../images/lunch.jpg'; 
import dinner from '../images/dinner.jpg'; 

const Home = () => {
    return (
        <>
            <section className="main-content">
                <h1>Welcome</h1>
            </section>

            <section className="days-container">
                <div className="day-box">
                <h2>Breakfast</h2>
                <div className="day-box2">
                    <img src={breakfast} alt="Breakfast"></img>
                </div>
                </div>
                <div className="day-box">
                <h2>Lunch</h2>
                <div className="day-box2">
                    <img src={lunch} alt="Lunch"></img>
                </div>
                </div>
                <div className="day-box">
                <h2>Dinner</h2>
                <div className="day-box2">
                    <img src={dinner} alt="Dinner"></img>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
