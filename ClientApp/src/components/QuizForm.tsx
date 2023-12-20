import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { QuizFormData } from '../types/formTypes';
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'
import BGQ3DotsBottomDesktop from "../assets/images/BGQ3DotsBottomDesktop.svg?react";
// import BGQ3DotsBottomMobile from "../assets/images/BGQ3DotsBottomMobile.svg?react";
import BGQ3DotsTopDesktop from "../assets/images/BGQ3DotsTopDesktop.svg?react";
// import BGQ3DotsTopMobile from "../assets/images/BGQ3DotsTopMobile.svg?react";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation, useNavigate } from 'react-router';

const QuizForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const resultData = location.state;
    const recaptcha = useRef<ReCAPTCHA | null>(null);
    const [formData, setQuizFormData] = useState<QuizFormData>({
        firstName: '',
        surname: '',
        email: '',
        confirmEmail: '',
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
            navigate("/result", { state: { code: resultData.combinedCode, matrixResults: resultData.matrixResults } });
        }
    };
console.log(import.meta.env.VITE_APP_SITE_KEY);
    return (
        <div className='quizForm' >
            <div className='quiz-main'>
                <div className="quiz-main__bg"></div>
                <div className="quiz-bottom_bg">
                    <BGQ3DotsBottomDesktop />
                </div>
                <div className="quiz-top-left_bg">
                    <BGQ3DotsTopDesktop />
                </div>
                <div className="quiz-main__items">
                    <div className="que-form-container">
                        <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                        <h1 className="main-heading text-yellow">WIN WIN WIN</h1>
                        <h2 className="secondary-heading text-white">ENTER TO WIN</h2>
                        <div className="quiz-form-wrapper">
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
                                        <label htmlFor='checkbox1'>T&Cs/privacy for competition (TBC on actual copy)</label>
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
                                <ReCAPTCHA ref={recaptcha} sitekey="6Lf2ITYpAAAAAJzYhRbatwZikff-hOk_v-eij2MP" />
                                <button type="submit" className='btn primary'>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default QuizForm;
