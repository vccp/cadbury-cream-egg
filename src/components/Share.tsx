import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.png'
// import Cadbury_Torn_in_Half_R3_Simp from '../assets/images/Egg-Landing.png'
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import JourneyTracker from "../assets/images/JourneyTracker.svg?react";


const Share = ({backgroundImage}: { backgroundImage: string }) => {
    const navigate = useNavigate();

    const handleCtaClick = () => {
        navigate("/question/1");
    };

    return (
        <div className={`share primary-screen`} 
        style={{
            backgroundImage: backgroundImage
        }}>
            <section className="primary-screen-section flex-1">
                <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                <h1 className="main-heading text-white">SHARE HOW YOU <br />EAT YOURS</h1>
                <div className="social">
                    <div className="socialEgg">
                        <JourneyTracker />
                        <img className="socialIcon" src={CadburyCremeEggLogoVectorRGB} alt="" />
                    </div>
                    <div className="socialEgg">
                        <JourneyTracker />
                        <img className="socialIcon" src={CadburyCremeEggLogoVectorRGB} alt="" />
                    </div>
                    <div className="socialEgg">
                        <JourneyTracker />
                        <img className="socialIcon" src={CadburyCremeEggLogoVectorRGB} alt="" />
                    </div>
                    <div className="socialEgg">
                        <JourneyTracker />
                        <img className="socialIcon" src={CadburyCremeEggLogoVectorRGB} alt="" />
                    </div>
                </div>
                <div className='orSeparator'>OR</div>
                <button className='btn primary' onClick={handleCtaClick}>
                    PLAY AGAIN
                </button>
            </section>
            <Footer />

        </div>
    );
}

export default Share;