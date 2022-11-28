import React from 'react';
import img1 from '../../../assets/Banner/cycle1.jpg';
import img2 from '../../../assets/Banner/cycle2.png';
import img3 from '../../../assets/Banner/cycle3.jpg';
import HomeCarousel from './HomeCarousel';

const bannerItem = [
    {
        image: img1,
        title: "The Best Cycle Resale Market Place For You",
        info: "Expand the map by pedaling farther than you can. So that you may explore the roads, trails, and gravel outside of your usual routes, Thule is designed to rack 'em up.",
        id: 1,
        prev: 3,
        next: 2
    },
    {
        image: img2,
        title: "Cycling Seasons Never Ends",
        info: "Expand the map by pedaling farther than you can. So that you may explore the roads, trails, and gravel outside of your usual routes, Thule is designed to rack 'em up.",
        id: 2,
        prev: 1,
        next: 3
    },
    {
        image: img3,
        title: "Keep Your Jorney A Little Bit Interesting",
        info: "Expand the map by pedaling farther than you can. So that you may explore the roads, trails, and gravel outside of your usual routes, Thule is designed to rack 'em up.",
        id: 3,
        prev: 2,
        next: 1
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