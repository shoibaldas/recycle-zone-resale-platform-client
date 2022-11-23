import React from 'react';
import img1 from '../../../assets/Banner/cycle1.jpg';
import img2 from '../../../assets/Banner/cycle2.png';
import img3 from '../../../assets/Banner/cycle3.jpg';
import HomeCarousel from './HomeCarousel';

const bannerItem = [
    {
        image: img1,
        title: "Branding with particular logo",
        info: "A logo is what identifies your brand using a particular mark, type design, or both.",
        id: 1,
        prev: 4,
        next: 2
    },
    {
        image: img2,
        title: "Marketing design of visual assets",
        info: "Marketing design applies graphic design principles to the ultimate goals of a marketing effort.",
        id: 2,
        prev: 1,
        next: 3
    },
    {
        image: img3,
        title: "Visual design of a site",
        info: "Visual design focuses on the aesthetics of a site and its related materials with suitable combination.",
        id: 3,
        prev: 2,
        next: 4
    }
]

const HomeBanner = () => {
    return (
        <div className="carousel">
            {
                bannerItem.map(slide => <HomeCarousel
                    key={slide.id}
                    slide={slide}
                ></HomeCarousel>)
            }
        </div>
    );
};

export default HomeBanner;