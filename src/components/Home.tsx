import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../assets/scss/Home.scss'
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.png'
import Cadbury_Torn_in_Half_R3_Simp from '../assets/images/Egg-Landing.png'

const timeline = gsap.timeline({
    paused: true
});

const Home: React.FC = () => {
    const quizMainRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        timeline
          .to('.quiz-main__bg', { bottom: 0, duration: 0.8, ease: 'power2.inOut' })
          .addLabel("openQuiz")
        //   .to('.quiz-main__bg', { bottom: '-150%', duration: 1, ease: 'power2.inOut' }, 'openQuiz');
      }, []);

    const handleTakeQuizClick = () => {
        timeline.tweenFromTo(0, "openQuiz");
    };

    return (
        <div className="home" >
            <section className="home-section" data-scroll-section>
                <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                <img className='cadburyTornImage' src={Cadbury_Torn_in_Half_R3_Simp} alt="" />
                <h1 className="main-heading text-yellow">THE WAY YOU EAT A <br />CREME EGG SAYS <br />EVERYTHING ABOUT YOU</h1>
                <h2 className="secondary-heading text-white">FIND OUT WHO YOU REALY ARE</h2>
                <button className='btn primary' onClick={handleTakeQuizClick}>TAKE QUIZ</button>
            </section>

            <div ref={quizMainRef} className='quiz-main'>
                <div className="quiz-main__bg"></div>
            </div>

            <footer data-scroll-section>
                <nav>
                    <ul>
                        <li><a href="#home">2023 Mondelelez United Kingdom</a></li>
                    </ul>
                    <ul>
                        <li><a href="#home">Terms and contions</a></li>
                        <li><a href="#about">Privacy notice</a></li>
                        <li><a href="#contact">Accessibility</a></li>
                        <li><a href="#contact">Accessibility</a></li>
                        <li><a href="#contact">Links</a></li>
                        <li><a href="#contact">Cookies</a></li>
                        <li><a href="#contact">Policy</a></li>
                        <li><a href="#contact">Help</a></li>
                    </ul>
                </nav>
            </footer>
        </div>
    );
}

export default Home;