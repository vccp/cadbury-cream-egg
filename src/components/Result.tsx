// import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.png'
// import BGResultEggUprightDesktop from "../assets/images/BGResultEggUprightDesktop.svg?react";
// import BGResultEggUprightMobile from "../assets/images/BGResultEggUprightMobile.svg?react";

import 'swiper/css';
import 'swiper/css/pagination';
import '../assets/scss/result.scss'

import { Pagination } from 'swiper/modules';

const jsonData = [
    {
        text: 'Big Size Text 1 at Center',
        imageUrl: '../assets/images/Egg-Landing.png',
    },
    {
        text: 'Big Size Text 2 at Center',
    },
    {
        text: 'Big Size Text 3 at Center',
    },
    {
        text: 'Big Size Text 4 at Center',
    },
    {
        text: 'Big Size Text 5 at Center',
    },
    {
        text: 'Big Size Text 6 at Center',
    },
];

const Result = () => {
    return (
        <div className='resultMain'>
            <section className="resultSection" data-scroll-section>
                <Swiper
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
                    modules={[Pagination]}
                >
                    <div className="swiper-pagination-custom" />
                    {jsonData.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className='resultSlideInner'>
                                <h1 className='text-yellow'>{slide.text}</h1>
                                {slide.imageUrl &&
                                    <img className='slideImage' src={new URL(slide.imageUrl, import.meta.url).href} alt={`Image ${index + 1}`} />}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div>
                    <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                </div>
            </section>
        </div>
    );
}

export default Result;