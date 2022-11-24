import React from 'react';
import About from '../About/About';
import Features from '../Features/Features';
import HomeBanner from '../HomeBanner/HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <Features></Features>
            <About></About>
        </div>
    );
};

export default Home;