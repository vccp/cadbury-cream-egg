import { useState } from 'react';
import * as ReactDOMServer from "react-dom/server";

import { Swiper, SwiperSlide } from 'swiper/react';
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'
import JourneyTracker from "../assets/images/JourneyTracker.svg?react";
// import BGResultEggUprightDesktop from "../assets/images/BGResultEggUprightDesktop.svg?react";
// import BGResultEggUprightMobile from "../assets/images/BGResultEggUprightMobile.svg?react";

import { Pagination } from 'swiper/modules';
import Share from './Share';
import Final from './Final';
import { useLocation } from 'react-router-dom';
import { slideData } from '../data/slideData';

const Result = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);
    const resultData = location.state;

    const handleSlideChange = (swiper: any) => {
        const index = swiper.activeIndex;

        setActiveIndex(index);
        setTimeout(() => {
            swiper.pagination.render();
            swiper.pagination.update();
            const activeBullet = Array.from(swiper.pagination.bullets).find(
                (bullet) => (bullet as HTMLElement).classList.contains('swiper-pagination-bullet-active')
            );

            if (activeBullet) {
                const pathEl = (activeBullet as HTMLElement).querySelector('path');
                if (pathEl) {
                    (pathEl as SVGPathElement).style.fill = slideData[index]?.color || '#FFDD00';
                }
            }
        }, 100);
    };

    if (!resultData) {
        return <div>Result Data is Empty</div>;
    }

    return (
        <div className='resultMain'>
            <section className={`resultSection result_${activeIndex + 1}`}>
                <Swiper
                    onSlideChange={handleSlideChange}
                    autoHeight={true}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination-custom',
                        renderBullet: function (index, className) {
                            if (index === activeIndex) {
                                return ReactDOMServer.renderToStaticMarkup(<span className={className}><JourneyTracker /></span>);
                            } else {
                                return ReactDOMServer.renderToStaticMarkup(<span className={className}></span>);
                            }
                        }
                    }}
                    modules={[Pagination]}
                    style={{
                        '--swiper-pagination-bullet-inactive-color': slideData[activeIndex]?.color || '#FFDD00',
                    } as React.CSSProperties}>
                    <div className="swiper-pagination-custom" />
                    {resultData.matrixResults.map((slide: string[], index: number) => (
                        <SwiperSlide
                            key={index + 1}
                            className={`fixedHeight slide_${index + 1}`}
                            >
                            <div className='resultSlideInner' 
                            style={{
                                backgroundColor: slideData[index]?.backgroundColor || '#3B0073',
                                backgroundImage: `url(${new URL(slideData[index]?.backgroundImage || '../assets/images/BGResultEggUprightDesktop.svg', import.meta.url).href})`
                            }}>
                                <span className='emptyJustify'></span>
                                <div className='resultSlideContent'>
                                    <h1 style={{ color: slideData[index]?.color }}>{slide}</h1>
                                    {slideData[index]?.imageUrl &&
                                        <img
                                            className='slideImage'
                                            src={slideData[index]?.imageUrl ? new URL(String(slideData[index]?.imageUrl), import.meta.url).href : ''}
                                            alt={`Image ${index + 1}`} />}
                                </div>
                                <div className='imgWrapper'>
                                    <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide
                        key={9}
                        className={`slide_${9}`}>
                        <Share backgroundImage={`url(${new URL('../images/BGLandingEggRepeatMobile.svg', import.meta.url).href})`} />
                    </SwiperSlide>
                    <SwiperSlide
                        key={10}
                        className={`slide_${10}`}>
                        <Final backgroundImage={`url(${new URL('../images/BGLandingEggRepeatMobile.svg', import.meta.url).href})`} />
                    </SwiperSlide>
                </Swiper>

            </section>
        </div>
    );
}

export default Result;