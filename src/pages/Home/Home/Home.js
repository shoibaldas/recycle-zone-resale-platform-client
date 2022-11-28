import React from 'react';
import useTitle from '../../../hook/useTitle';
import About from '../About/About';
import Features from '../Features/Features';
import HomeAd from '../HomeAd/HomeAd';
import HomeBanner from '../HomeBanner/HomeBanner';
import ProductCategory from '../ProductCategory/ProductCategory';

const Home = () => {
    useTitle('Recycle Zone');
    return (
        <div>
            <HomeBanner></HomeBanner>
            <HomeAd></HomeAd>
            <ProductCategory></ProductCategory>
            <Features></Features>
            <About></About>
        </div>
    );
};

export default Home;