import React, { useState } from 'react';
import '../assets/scss/Home.scss'
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.png'
import Cadbury_Torn_in_Half_R3_Simp from '../assets/images/Egg-Landing.png'
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
    const navigate = useNavigate();
    const [isQueOpen, setIsQue] = useState(false);

    const handleTakeQuizClick = () => {
        if (isQueOpen === false) {
            navigate("/question/1");
            // timeline.tweenFromTo(0, "openQuiz");
            // timeline.restart();
            setIsQue(true);
        }
    };

    return (
        <div className={`home ${isQueOpen ? "queIsOpen" : ""}`} >
            <section className="home-section" data-scroll-section>
                <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                <img className='cadburyTornImage' src={Cadbury_Torn_in_Half_R3_Simp} alt="" />
                <h1 className="main-heading text-yellow">THE WAY YOU EAT A <br />CREME EGG SAYS <br />EVERYTHING ABOUT YOU</h1>
                <h2 className="secondary-heading text-white">FIND OUT WHO YOU REALY ARE</h2>
                <button className='btn primary' onClick={handleTakeQuizClick}>
                    TAKE QUIZ
                </button>
            </section>

            <Footer />
        </div>
    );
}

export default Home;