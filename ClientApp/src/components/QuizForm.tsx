import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { QuizFormData } from '../types/formTypes';
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'

import BGQ3DotsBottomDesktop from "../assets/images/BGQ3DotsBottomDesktop.svg?react";
import BGQ3DotsBottomMobile from "../assets/images/BGQ3DotsBottomMobile.svg?react";
import BGQ3DotsTopDesktop from "../assets/images/BGQ3DotsTopDesktop.svg?react";
import BGQ3DotsTopMobile from "../assets/images/BGQ3DotsTopMobile.svg?react";

// import BGQ3DotsTopMobile from "../assets/images/BGQ3DotsTopMobile.svg?react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router';
import { setLocalStorageValue } from '../utils/useLocalStorage';
// import { MatrixState } from '../types/resultTypes';
// import { getLocalStorageValue } from '../utils/useLocalStorage';

gsap.registerPlugin(ScrollToPlugin)

const timeline = gsap.timeline({
    paused: true
});

const QuizForm = () => {
    const navigate = useNavigate();
    const tl = useRef(timeline);
    // const location = useLocation();
    // const resultData = getLocalStorageValue<MatrixState>("matrixState", {
    //     code: "",
    //     matrixResults: [],
    // });
    const recaptcha = useRef<ReCAPTCHA | null>(null);
    const app = useRef<HTMLDivElement>(null);
    const eggShapeBgRef = useRef<HTMLDivElement | null>(null);
    const creamLogoRef = useRef<HTMLDivElement | null>(null);
    const mainHeadingRef = useRef<HTMLDivElement | null>(null);
    const secondaryHeadingRef = useRef<HTMLDivElement | null>(null);
    const formWrapperRef = useRef<HTMLDivElement | null>(null);

    const [formData, setQuizFormData] = useState<QuizFormData>({
        firstName: '',
        surname: '',
        email: '',
        confirmEmail: '',
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [timeline]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            tl.current
                .to(eggShapeBgRef.current, { bottom: 0, duration: 2, ease: 'power2.inOut' })
                .to(window, { duration: 0.1, scrollTo: 0 })
                .fromTo(mainHeadingRef.current, { opacity: 0, top: "30%", duration: 0.8 }, { opacity: 1, top: 0, duration: 1, ease: 'power2.inOut' })
                .fromTo(secondaryHeadingRef.current, { opacity: 0, top: "30%", duration: 0.8 }, { opacity: 1, top: 0, duration: 1, ease: 'power2.inOut' })
                .from(creamLogoRef.current, { opacity: 0, scale: 0.1, duration: 0.6, ease: 'power2.inOut' })
                .from(formWrapperRef.current, { opacity: 0, scale: 0.1, top: "50%", duration: 0.4, ease: 'power2.inOut' });


            tl.current
                .from('.quiz-top-left_bg svg', { opacity: 0, x: '-120%', rotation: -20, duration: 1, ease: "power2.inOut" }, 1.5)
                .from('.quiz-bottom_bg svg', { opacity: 0, y: '50%', rotation: -20, duration: 1, ease: "power2.inOut" }, 1.5);

            tl.current
                .addLabel("openForm")
                .to(creamLogoRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openForm')
                .to(formWrapperRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openForm');

        }, app.current as Element | undefined);

        tl.current.restart();
        return () => ctx.revert();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuizFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        }

        if (!formData.surname.trim()) {
            errors.surname = 'Surname is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email Address is required';
        }

        if (!formData.confirmEmail.trim()) {
            errors.confirmEmail = 'Confirm Email Address is required';
        } else if (formData.email !== formData.confirmEmail) {
            errors.confirmEmail = 'Email addresses do not match';
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // const captchaValue = recaptcha.current?.getValue();
        if (!validateForm()) {
            alert('Form contains validation errors. Please check.');
            // } else if (!captchaValue) {
            //     alert("Please verify the reCAPTCHA!");
        } else {
            setLocalStorageValue("answers", []);
            navigate("/result");
        }
    };

    return (
        <div className='quizForm' >
            <div className='quiz-main egg-shape-bg_parent' ref={app}>
                <div ref={eggShapeBgRef} className="egg-shape__bg"></div>
                <div className="quiz-bottom_bg">
                    <BGQ3DotsBottomDesktop className='desktop' />
                    <BGQ3DotsBottomMobile className='mobile' />
                </div>
                <div className="quiz-top-left_bg">
                    <BGQ3DotsTopDesktop className='desktop' />
                    <BGQ3DotsTopMobile className='mobile' />
                </div>
                <div className="quiz-main__items">
                    <div className="que-form-container">
                        <div ref={creamLogoRef}>
                            <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                        </div>
                        <h1 ref={mainHeadingRef} className="main-heading text-yellow">WIN YOUR DREAM PRIZE!</h1>
                        <h2 ref={secondaryHeadingRef} className="secondary-heading text-white">ENTER TO WIN THE PERFECT PRIZE<br/> FOR WHO YOU REALLY ARE</h2>
                        <div ref={formWrapperRef} className="quiz-form-wrapper">
                            <form onSubmit={handleSubmit}>
                                <div className='formGroup'>
                                    <label htmlFor="firstName">FIRST NAME</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.firstName && (
                                        <div className="validation-error">{validationErrors.firstName}</div>
                                    )}
                                </div>
                                <div className='formGroup'>
                                    <label htmlFor="surname">SURNAME</label>
                                    <input
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        placeholder="Surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.surname && (
                                        <div className="validation-error">{validationErrors.surname}</div>
                                    )}
                                </div>
                                <div className='formGroup'>
                                    <label htmlFor="email">EMAIL ADDRESS</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.email && (
                                        <div className="validation-error">{validationErrors.email}</div>
                                    )}
                                </div>
                                <div className='formGroup'>
                                    <label htmlFor="confirmEmail">CONFIRM EMAIL ADDRESS</label>
                                    <input
                                        type="email"
                                        id="confirmEmail"
                                        name="confirmEmail"
                                        placeholder="Confirm Email"
                                        value={formData.confirmEmail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.confirmEmail && (
                                        <div className="validation-error">{validationErrors.confirmEmail}</div>
                                    )}
                                </div>
                                <div className='formGroup checkboxes'>
                                    <div className='checkbox'>
                                        <input
                                            type='checkbox'
                                            id='checkbox1'
                                            name='checkbox1'
                                        />
                                        <label htmlFor='checkbox1'>Tick for the chance to win a prize</label>
                                    </div>
                                    <h4 className="text-white keepUpToDate">KEEP UP TO DATE</h4>
                                    <div className='checkbox'>
                                        <input
                                            type='checkbox'
                                            id='checkbox2'
                                            name='checkbox2'
                                        />
                                        <label htmlFor='checkbox2'>18+ tick box</label>
                                    </div>
                                    <div className='checkbox'>
                                        <input
                                            type='checkbox'
                                            id='checkbox3'
                                            name='checkbox3'
                                        />
                                        <label htmlFor='checkbox3'>Opt in for marketing comms (tick box)</label>
                                    </div>
                                </div>
                                <div className='formGroup'>
                                    <ReCAPTCHA ref={recaptcha} sitekey="6Lf2ITYpAAAAAJzYhRbatwZikff-hOk_v-eij2MP" />
                                </div>
                                <button type="submit" className='btn primary'>SUBMIT</button>
                                <div className="linkWrapper">
                                    <a className='link text-center text-yellow' href={'/question/1'}>Back to my answers</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default QuizForm;
