// import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import CadburyCremeEggLogoVectorRGB from '../assets/images/CadburyCremeEggLogoVectorRGB.webp'
import JourneyTracker from "../assets/images/JourneyTracker.svg?react";
import FacebookIcon from '../assets/images/facebook.svg?react'
import XIcon from '../assets/images/twitter.svg?react'
import InstagramIcon from '../assets/images/instagram.svg?react'
import TiktokIcon from '../assets/images/tiktok.svg?react'
// import { useLocation } from 'react-router-dom';

import {
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";

const InstagramShareButton = ({ className, shareUrl, caption }: { className: string, shareUrl: string, caption: string }) => {
    const handleInstagramShare = () => {
        const url = `https://www.instagram.com/share?url=${encodeURIComponent(shareUrl)}&caption=${encodeURIComponent(caption)}`;
        window.open(url, '_blank');
    };

    return (
        <button className="socialIcon" onClick={handleInstagramShare}>
            <InstagramIcon className={className} />
        </button>
    );
};

const TiktokShareButton = ({ className, shareUrl, caption }: { className: string, shareUrl: string, caption: string }) => {
    const handleTiktokShare = () => {
        console.log(shareUrl);
        console.log(caption);
    };

    return (
        <button className="socialIcon" onClick={handleTiktokShare}>
            <TiktokIcon className={className} />
        </button>
    );
};

const Share = ({ backgroundImage }: { backgroundImage: string }) => {
    // const location = useLocation();
    // const navigate = useNavigate();
    const currentUrl = window.location.origin;

    return (
        <div className={`share primary-screen`}
            style={{
                backgroundImage: backgroundImage
            }}>
            <section className="primary-screen-section flex-1">
                <img className="cadburyCreamLogoImage" src={CadburyCremeEggLogoVectorRGB} alt="" />
                <h1 className="main-heading text-white">SHARE HOW YOU <br />EAT YOURS</h1>
                <div className="social">
                    <div className="socialEgg">
                        <div className="eggSvgWrapper">
                            <JourneyTracker />
                        </div>
                        <FacebookShareButton
                            url={currentUrl}
                            className="socialIcon"
                        >
                            <FacebookIcon className='facebookIcon' />
                        </FacebookShareButton>
                    </div>
                    <div className="socialEgg">
                        <div className="eggSvgWrapper">
                            <JourneyTracker />
                        </div>
                        <InstagramShareButton className='instagramIcon' shareUrl={currentUrl} caption="caption" />
                    </div>
                    <div className="socialEgg">
                        <div className="eggSvgWrapper">
                            <JourneyTracker />
                        </div>
                        <TwitterShareButton
                            url={currentUrl}
                            className="socialIcon"
                        >
                            <XIcon className='xIcon' />
                        </TwitterShareButton>
                    </div>
                    <div className="socialEgg">
                        <div className="eggSvgWrapper">
                            <JourneyTracker />
                        </div>
                        <TiktokShareButton className='tiktokIcon' shareUrl={currentUrl} caption="caption" />
                    </div>
                </div>
                <div className='orSeparator'>OR</div>
                <button className='btn primary'>
                    PLAY AGAIN
                </button>
            </section>
            <Footer />

        </div>
    );
}

export default Share;