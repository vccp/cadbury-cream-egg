import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import '../assets/scss/Home.scss'
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.png'
import BGQ1WavebottomDesktop from "../assets/images/BGQ1WavebottomDesktop.svg?react";
import BGQ1WavetopDesktop from "../assets/images/BGQ1WavetopDesktop.svg?react";
import { useNavigate, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

interface QuizItem {
    id: number;
    question: string;
    options: string[];
    layout: string;
    image: string;
    multi_select: boolean;
}

interface Answer {
    questionId: number;
    answer: string;
}

const timeline = gsap.timeline({
    paused: true
});

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { queId } = useParams();
    const [quizData, setQuizData] = useState<QuizItem[]>([]);
    const [question, setQuestion] = useState<QuizItem | undefined>(undefined);
    const tl = useRef(timeline);
    const app = useRef<HTMLDivElement>(null);
    const quizMainBgRef = useRef<HTMLDivElement | null>(null);
    const quizBottomBgRef = useRef<HTMLDivElement | null>(null);
    const quizTopBgRef = useRef<HTMLDivElement | null>(null);
    const quizCreamLogoRef = useRef<HTMLDivElement | null>(null);
    const quizMainQueHeadingRef = useRef<HTMLDivElement | null>(null);
    const quizMainQueRef = useRef<HTMLDivElement | null>(null);
    const quizMainAnsRef = useRef<HTMLDivElement | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [error, setError] = useState<string | null>(null);

    // let shouldRunEffect = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../quiz.json');

                if (!response.ok) {
                    throw new Error(`Failed to fetch JSON: ${response.statusText}`);
                }

                const data: QuizItem[] = await response.json();
                setQuizData(data);
                if (queId) {
                    const parsedQueId = parseInt(queId, 10);
                    if (!isNaN(parsedQueId)) {
                        const foundQuizItem = data.find(obj => obj.id === parsedQueId);
                        if (foundQuizItem) {
                            setQuestion(foundQuizItem);
                        }
                    }
                } else {
                    setQuestion(data[0]);
                }
            } catch (err) {
                setError(`Error fetching JSON data: ${(err as Error).message}`);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (queId) {
            const parsedQueId = parseInt(queId, 10);
            if (!isNaN(parsedQueId)) {
                const foundQuizItem = quizData.find(obj => obj.id === parsedQueId);
                if (foundQuizItem) {
                    setQuestion(foundQuizItem);
                }
            }
        } else {
            setQuestion(quizData[0]);
        }
        // tl.current.tweenFromTo(0, "openQuiz");
    }, [queId]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl.current
                // use scoped selectors
                // i.e., selects matching children only
                .to(quizMainBgRef.current, { bottom: 0, duration: 0.8, ease: 'power2.inOut' })
                // .from(quizMainQueHeadingRef.current, { x:-50, y:-50, opacity: 0, left:"50%", top:"50%", duration: 0.1, ease: 'power2.inOut' })
                .from(quizMainQueHeadingRef.current, { opacity: 0, x: '-50%', y: '-50%', left: "50%", top: "50%", duration: 0.8, ease: 'power2.inOut' })
                .from(quizMainQueRef.current, { opacity: 0, x: '-50%', y: '-50%', scale: 0.1, left: "50%", top: "50%", duration: 0.8, ease: 'power2.inOut' })
                .from(quizCreamLogoRef.current, { opacity: 0, scale: 0.1, duration: 0.6, ease: 'power2.inOut' })
                .from(quizMainAnsRef.current, { opacity: 0, x: '-50%', y: '-50%', scale: 0.1, left: "50%", top: "50%", duration: 0.8, ease: 'power2.inOut' })
                .from('.quiz-top_bg svg', { x: '120%', rotation: -20, duration: 2, ease: "elastic.out(1, 0.8)" }, 0.5)
                .from('.quiz-bottom_bg svg', { x: '-120%', y: '50%', rotation: -20, duration: 2, ease: "elastic.out(1, 0.8)" }, 0.55)
                .addLabel("openQuiz")
                .to(quizMainQueHeadingRef.current, {
                    duration: 1,
                    // y: 0,
                    top: "22%",
                    ease: "power2.out"
                }, 'openQuiz')
                .to(quizMainQueRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openQuiz')
                .to(quizCreamLogoRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openQuiz')
                .to(quizMainAnsRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openQuiz')
                .to('.quiz-top_bg svg', { x: '100%', rotation: 20, duration: 1, ease: "power4.in" }, "openQuiz+=0.35")
                .to('.quiz-bottom_bg svg', { x: '-100%', y: '50%', rotation: -20, duration: 1, ease: "power4.in" }, "openMenu+=0.40")
        }, app.current as Element | undefined);
        tl.current.tweenFromTo(0, "openQuiz");
        return () => ctx.revert();
    }, []);

    // const handleNextQuestion = () => {
    //     if (selectedOption !== null) {

    //       setUserAnswers((prevAnswers) => [
    //         ...prevAnswers,
    //         { question: quizData[currentQuestionIndex].question, selectedAnswer: selectedOption },
    //       ]);

    //       setSelectedOption(null);
    //       setCurrentQuestionIndex(prevIndex => prevIndex + 1);

    //       if (scroll) {
    //         const nextQuestionElement = document.getElementById(`question-${currentQuestionIndex + 1}`);
    //         if (nextQuestionElement) {
    //           scroll.scrollTo(nextQuestionElement);
    //         } else {
    //           const resultEle = document.getElementById('result');
    //           console.log(resultEle);
    //           scroll.scrollTo(resultEle);
    //         }
    //       }
    //     }
    //   };

    // const handleTakeQuizClick = () => {
    //     if (isQueOpen === false) {
    //         navigate("/question/1");
    //         // timeline.tweenFromTo(0, "openQuiz");
    //         // timeline.restart();
    //         setIsQue(true);
    //     }
    // };

    const handleAnswer = (selectedAnswer: string) => {
        const updatedAnswers = answers.filter((a) => a.questionId !== currentQuestion);
        setAnswers([...updatedAnswers, { questionId: currentQuestion, answer: selectedAnswer }]);
    };

    const handleNext = () => {
        if (queId) {
            setCurrentQuestion(currentQuestion + 1);
            if (quizData.length > parseInt(queId, 10)) {
                navigate(`/question/${parseInt(queId, 10) + 1}`);
            } else {
                navigate(`/question/1`);
            }
        } else {
            navigate(`/question/1`);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div ref={app} >
            <div className='quiz-main'>
                <div ref={quizMainBgRef} className="quiz-main__bg"></div>
                <div ref={quizBottomBgRef} className="quiz-bottom_bg">
                    <BGQ1WavebottomDesktop />
                </div>
                <div ref={quizTopBgRef} className="quiz-top_bg">
                    <BGQ1WavetopDesktop />
                </div>
                <div className="quiz-main__items">
                    <div className="que-container">
                        <div ref={quizCreamLogoRef}>
                            <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                        </div>
                        <div ref={quizMainQueHeadingRef} className="queHeading text-yellow">QUESTION {queId}</div>
                        <div ref={quizMainQueRef} className="que text-white">{question?.question}</div>

                            <div ref={quizMainAnsRef} className="ansMain">
                        {question &&
                                <div className={`ansWrapper ${question.layout}`}>
                                    {question.options.map((choice, index) => (
                                        <React.Fragment key={index}>
                                            {choice === 'or' && <span className='or'>OR</span>}
                                            {choice !== 'or' &&
                                                <div
                                                    className={`ans ${answers.find((a) => a.questionId === currentQuestion && a.answer === choice) ? 'selected' : ''}`}
                                                    onClick={() => handleAnswer(choice)}
                                                >
                                                    {question.layout === "egg_shape" &&
                                                        <div className={`ans-option egg-shape ${index === 0 ? 'left' : 'right'}`}></div>
                                                    }
                                                    <span className='ansText'>{choice}</span>
                                                </div>
                                            }
                                        </React.Fragment>
                                    ))}
                                </div>
                                }
                                {answers.some((a) => a.questionId === currentQuestion) &&
                                    <button className='btn primary' onClick={handleNext}>
                                        Next
                                    </button>
                                }
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;