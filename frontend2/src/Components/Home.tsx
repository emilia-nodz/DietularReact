import React from 'react';
import "../Styles/Home.css"

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
                    <img src="images/breakfast.jpg" alt="Breakfast"></img>
                </div>
                </div>
                <div className="day-box">
                <h2>Lunch</h2>
                <div className="day-box2">
                    <img src="images/lastone.jpg" alt="Breakfast"></img>
                </div>
                </div>
                <div className="day-box">
                <h2>Dinner</h2>
                <div className="day-box2">
                    <img src="images/dinner.jpg" alt="Breakfast"></img>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
