import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'
import cardImg from '../assets/images/q2.jpg'
import Footer from './Footer';
// import { useNavigate } from 'react-router-dom';


const Final = ({backgroundImage}: { backgroundImage: string }) => {
    // const navigate = useNavigate();

    const handleCtaClick = () => {
        // navigate("/question/1");
    };

    return (
        <div className={`final primary-screen}`} 
        style={{
            backgroundImage: backgroundImage
        }}>
            <section className="primary-screen-section flex-1">
                <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                <h1 className="main-heading text-white">BASED ON YOUR <br />PERSONALITY TYPE, WE <br />THINK YOU'LL LOVE THIS</h1>
                <img className='cardImg' src={cardImg} alt="" />
                <button className='btn primary' onClick={handleCtaClick}>
                    FIND OUT MORE
                </button>
            </section>

            <Footer />
        </div>
    );
}

export default Final;