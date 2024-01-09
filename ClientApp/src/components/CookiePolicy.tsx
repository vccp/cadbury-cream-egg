import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Footer from './Footer';

const timeline = gsap.timeline({
    paused: true
});

const CookiePolicy: React.FC = () => {
    const tl = useRef(timeline);
    const app = useRef<HTMLDivElement>(null);
    const eggShapeBgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            tl.current
                .to(eggShapeBgRef.current, { bottom: 0, duration: 2, ease: 'power2.inOut' })
                .to(eggShapeBgRef.current, { opacity:0, ease: 'power3.out' })

        }, app.current as Element | undefined);

        tl.current.restart();
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className={`cookiePolicy primary-screen egg-shape-bg_parent`} ref={app} >
                <div ref={eggShapeBgRef} className="egg-shape__bg"></div>
                <section
                    className="cookiePolicy-section primary-screen-section"
                >

                </section>

                <Footer />
            </div>
        </>
    );
}

export default CookiePolicy;