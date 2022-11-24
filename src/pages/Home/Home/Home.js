import React from 'react';
import About from '../About/About';
import Features from '../Features/Features';
import HomeBanner from '../HomeBanner/HomeBanner';
import ProductCategory from '../ProductCategory/ProductCategory';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <ProductCategory></ProductCategory>
            <Features></Features>
            <About></About>
        </div>
    );
};

export default Home;