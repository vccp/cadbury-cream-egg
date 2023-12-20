import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'
import cremeEggImg from '../assets/images/cremeEgg.png'
import Footer from './Footer';
// import { useNavigate } from 'react-router-dom';


const Final = ({ backgroundImage }: { backgroundImage: string }) => {
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
                <div className="card">
                    <a href="#" className="cardLink">
                        <div className="cardInner">
                            <div className="carTag">
                                CREME EGG
                            </div>
                            <div className="mask">
                            <img src={cremeEggImg} alt="" className="cremeEggImg" />
                            </div>
                            <div className="cardFooter text-white text-center">
                                <h4 className='cardFooterTitle'><span>Cadbury Creme Egg</span></h4>
                            </div>
                        </div>
                    </a>
                </div>
                <button className='btn primary' onClick={handleCtaClick}>
                    FIND OUT MORE
                </button>
            </section>

            <Footer />
        </div>
    );
}

export default Final;