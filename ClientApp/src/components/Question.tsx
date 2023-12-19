import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'

import BGQ1WavebottomDesktop from "../assets/images/BGQ1WavebottomDesktop.svg?react";
import BGQ1WavetopDesktop from "../assets/images/BGQ1WavetopDesktop.svg?react";

import BGQ2WaveBottomDesktop from "../assets/images/BGQ2WaveBottomDesktop.svg?react";
// import BGQ2WaveBottomMobile from "../assets/images/BGQ2WaveBottomMobile.svg?react";
import BGQ2WaveTopDesktop from "../assets/images/BGQ2WaveTopDesktop.svg?react";
// import BGQ2WaveTopMobile from "../assets/images/BGQ2WaveTopMobile.svg?react";

import BGQ3DotsBottomDesktop from "../assets/images/BGQ3DotsBottomDesktop.svg?react";
// import BGQ3DotsBottomMobile from "../assets/images/BGQ3DotsBottomMobile.svg?react";
import BGQ3DotsTopDesktop from "../assets/images/BGQ3DotsTopDesktop.svg?react";
// import BGQ3DotsTopMobile from "../assets/images/BGQ3DotsTopMobile.svg?react";

import BGQ4EggRepeatDesktop from "../assets/images/BGQ4EggRepeatDesktop.svg?react";
// import BGQ4EggRepeatMobile from "../assets/images/BGQ4EggRepeatMobile.svg?react";

import BGQ5FullWaveDesktop from "../assets/images/BGQ5FullWaveDesktop.svg?react";
// import BGQ5FullWaveMobile from "../assets/images/BGQ5FullWaveMobile.svg?react";

import { useNavigate, useParams } from 'react-router-dom';
import { Answer, QuizItem, QuizOption, QuizResponse } from '../types/quizTypes';
// import { useNavigate } from 'react-router-dom';


const timeline = gsap.timeline({
    paused: true
});

const Question = () => {
    const navigate = useNavigate();
    const { queId } = useParams();
    const [quizRes, setQuizRes] = useState<QuizResponse>({
        quizData: [],
        matrix: {}
    });
    const [question, setQuestion] = useState<QuizItem | undefined>(undefined);
    const tl = useRef(timeline);
    const app = useRef<HTMLDivElement>(null);
    const quizMainBgRef = useRef<HTMLDivElement | null>(null);
    // const quizBottomBgRef = useRef<HTMLDivElement | null>(null);
    // const quizTopBgRef = useRef<HTMLDivElement | null>(null);
    const quizCreamLogoRef = useRef<HTMLDivElement | null>(null);
    const quizMainQueHeadingRef = useRef<HTMLDivElement | null>(null);
    const quizMainQueRef = useRef<HTMLDivElement | null>(null);
    const questionImageRef = useRef<HTMLDivElement | null>(null);
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

                const res: QuizResponse = await response.json();
                setQuizRes(res);
                if (queId) {
                    const parsedQueId = parseInt(queId, 10);
                    if (!isNaN(parsedQueId)) {
                        const foundQuizItem = res.quizData.find((obj: { id: number; }) => obj.id === parsedQueId);
                        if (foundQuizItem) {
                            setQuestion(foundQuizItem);
                        }
                    }
                } else {
                    setQuestion(res.quizData[0]);
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
                const foundQuizItem = quizRes.quizData.find(obj => obj.id === parsedQueId);
                if (foundQuizItem) {
                    setQuestion(foundQuizItem);
                }
            }
        } else {
            setQuestion(quizRes.quizData[0]);
        }
    }, [queId]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            tl.current
                .to(quizMainBgRef.current, { bottom: 0, duration: 0.8, ease: 'power2.inOut' })
                .fromTo(quizMainQueHeadingRef.current, { opacity: 0, top: "30%", duration: 0.8 }, { opacity: 1, top: 0, duration: 1, ease: 'power2.inOut' })
                .fromTo(quizMainQueRef.current, { opacity: 0, top: "30%", duration: 0.8 }, { opacity: 1, top: 0, duration: 1, ease: 'power2.inOut' })
                .from(quizCreamLogoRef.current, { opacity: 0, scale: 0.1, duration: 0.6, ease: 'power2.inOut' });
            const questionImageEle = questionImageRef?.current;
            if (questionImageEle) {
                tl.current
                    .from(questionImageEle, { opacity: 0, scale: 0.1, top: "50%", duration: 0.4, ease: 'power2.inOut' });
            }
            tl.current
                .from(quizMainAnsRef.current, { opacity: 0, scale: 0.1, top: "50%", duration: 0.4, ease: 'power2.inOut' });
            if (queId === "1" || queId === "2") {
                tl.current
                    .from('.quiz-top-right_bg svg', { opacity: 0, x: '120%', rotation: -20, duration: 2, ease: "power2.inOut" }, 1.5)
                    .from('.quiz-bottom-left_bg svg', { opacity: 0, x: '-120%', y: '50%', rotation: -20, duration: 2, ease: "power2.inOut" }, 1.5);
            }
            if (queId === "3") {
                tl.current
                    .from('.quiz-top-left_bg svg', { opacity: 0, x: '-120%', rotation: -20, duration: 2, ease: "power2.inOut" }, 1.5)
                    .from('.quiz-bottom_bg svg', { opacity: 0, y: '50%', rotation: -20, duration: 2, ease: "power2.inOut" }, 1.5);
            }
            if (queId === "4") {
                tl.current
                    .from('.quiz-egg-repeat_bg svg', { opacity: 0, scale: 1.5, rotation: -20, duration: 1, ease: "power2.inOut" }, 1.5);
            }
            if (queId === "5") {
                tl.current
                    .from('.quiz-full-wave_bg svg', { opacity: 0, scale: 1.5, rotation: -20, duration: 1, ease: "power2.inOut" }, 1.5);
            }

            tl.current
                .addLabel("openQuiz")
                .to(quizMainQueRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openQuiz')
                .to(quizCreamLogoRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openQuiz');
            if (questionImageEle) {
                tl.current
                    .to(questionImageEle, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openQuiz');
            }
            tl.current
                .to(quizMainAnsRef.current, { top: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 'openQuiz');
        }, app.current as Element | undefined);
        tl.current.restart();
        return () => ctx.revert();
    }, [queId]);

    const handleAnswer = (choice: QuizOption) => {
        const { option } = choice;
        const existingAnswer = answers.find((a) => a.questionId === currentQuestion);
        const isMultiSelect = question?.multi_select || false;

        if (existingAnswer) {
            const updatedAnswers = answers.map((a) =>
                a.questionId === currentQuestion
                    ? {
                        ...a,
                        answer: isMultiSelect
                            ? (a.answer as QuizOption[]).some((ans) => ans.option === option)
                                ? (a.answer as QuizOption[]).filter((ans) => ans.option !== option)
                                : [...(a.answer as QuizOption[]), choice]
                            : choice,
                    }
                    : a
            );

            setAnswers(updatedAnswers.filter((a) => isMultiSelect || a.answer !== null));
        } else {
            setAnswers([
                ...answers,
                {
                    questionId: currentQuestion,
                    answer: isMultiSelect ? [choice] : choice
                }
            ]);
        }
    };

    const handleNext = () => {
        if (queId) {
            setCurrentQuestion(currentQuestion + 1);
            if (quizRes.quizData.length > parseInt(queId, 10)) {
                navigate(`/question/${parseInt(queId, 10) + 1}`);
            } else {
                const combinedCode = answers.map((item) =>
                    Array.isArray(item.answer)
                        ? item.answer.map((ans) => ans.code || '').join('')
                        : item.answer?.code || '').join('');
                const answerForFirstResult = answers.find((a) => a.questionId === 2);
                const matrix = quizRes.matrix[combinedCode];
                if (answerForFirstResult) {
                    const matrixResults = [
                        `You eat yours ${(answerForFirstResult.answer as QuizOption).option}. You're really out there`,
                        matrix['personalityLine'],
                         ...matrix['4xTraits'], 
                         ...matrix['2xReccomandations']
                        ];
                    navigate("/result", { state: { code: combinedCode, matrixResults } });
                }
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
                {queId === "1" &&
                    <>
                        <div className="quiz-bottom-left_bg">
                            <BGQ1WavebottomDesktop />
                        </div>
                        <div className="quiz-top-right_bg">
                            <BGQ1WavetopDesktop />
                        </div>
                    </>
                }
                {queId === "2" &&
                    <>
                        <div className="quiz-bottom-left_bg">
                            <BGQ2WaveBottomDesktop />
                        </div>
                        <div className="quiz-top-right_bg">
                            <BGQ2WaveTopDesktop />
                        </div>
                    </>
                }
                {queId === "3" &&
                    <>
                        <div className="quiz-bottom_bg">
                            <BGQ3DotsBottomDesktop />
                        </div>
                        <div className="quiz-top-left_bg">
                            <BGQ3DotsTopDesktop />
                        </div>
                    </>
                }
                {queId === "4" &&
                    <>
                        <div className="quiz-egg-repeat_bg">
                            <BGQ4EggRepeatDesktop />
                        </div>
                    </>
                }
                {queId === "5" &&
                    <>
                        <div className="quiz-full-wave_bg">
                            <BGQ5FullWaveDesktop />
                        </div>
                    </>
                }
                <div className="quiz-main__items">
                    <div className="que-container">
                        <div ref={quizCreamLogoRef}>
                            <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                        </div>
                        <div ref={quizMainQueHeadingRef} className="queHeading text-yellow">QUESTION {queId}</div>
                        <div ref={quizMainQueRef} className="que text-white" dangerouslySetInnerHTML={{ __html: question?.question || '' }} />
                        <div ref={questionImageRef}>
                            {question?.image &&
                                <img className="questionImage"
                                    src={new URL(question?.image, import.meta.url).href}
                                    alt="" />
                            }
                        </div>
                        <div ref={quizMainAnsRef} className="ansMain">
                            {question &&
                                <div className={`ansWrapper ${question.layout}`}>
                                    {question.options.map((choice: QuizOption, index: number) => (
                                        <React.Fragment key={index}>
                                            {question.divider && index === 1 && <span className='or'>{question.divider}</span>}
                                            <div
                                                className={`ans ${answers.some(
                                                    (a) =>
                                                        a.questionId === currentQuestion &&
                                                        (question.multi_select
                                                            ? (a.answer as QuizOption[]).some((ans) => ans.option === choice.option)
                                                            : (a.answer as QuizOption)?.option === choice.option)
                                                )
                                                    ? 'selected'
                                                    : ''
                                                    }`}
                                                onClick={() => handleAnswer(choice)}
                                            >
                                                {question.layout === 'egg_shape' && (
                                                    <div
                                                        className={`ans-option egg-shape ${index === 0 ? 'left' : 'right'
                                                            }`}
                                                    ></div>
                                                )}
                                                <span className='ansText' dangerouslySetInnerHTML={{ __html: choice.option }} />
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            }

                            <button className='btn primary' onClick={handleNext}
                                style={answers.some((a) => a.questionId === currentQuestion) ? { visibility: "visible", opacity: 1 } : { visibility: "hidden", opacity: 0 }}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;