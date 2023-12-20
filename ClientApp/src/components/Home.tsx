import React, { useState } from 'react';
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'
import Cadbury_Torn_in_Half_R3_Simp from '../assets/images/Egg-Landing.webp'
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
    const navigate = useNavigate();
    const [isQueOpen, setIsQue] = useState(false);

    const handleTakeQuizClick = () => {
        if (isQueOpen === false) {
            navigate("/question/1");
            setIsQue(true);
        }
    };

    return (
        <div className={`home primary-screen ${isQueOpen ? "queIsOpen" : ""}`} >
            <section 
            className="home-section primary-screen-section" 
            style={{
                backgroundImage: `url(${new URL('../assets/images/BGLandingEggRepeatMobile.svg', import.meta.url).href})`
            }}>
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