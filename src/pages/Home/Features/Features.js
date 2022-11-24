import React from 'react';

const Features = () => {
    return (
        <section className="m-4 md:m-8  dark:text-gray-800">
            <div className="container mx-auto p-2 my-4 space-y-2 text-center">
                <h2 className="text-4xl md:text-5xl font-bold">Our business is based on three rules</h2>
                <p className="dark:text-gray-500">"Log your happiness with us"</p>
            </div>
            <div className="max-w-4xl mx-auto grid justify-center gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center">
                    <div className='text-5xl text-sky-700'>
                        <ion-icon name="bicycle-outline"></ion-icon>
                    </div>
                    <h3 className="my-3 text-3xl font-semibold">Budget Bike</h3>
                </div>
                <div className="flex flex-col items-center">
                    <div className='text-5xl text-teal-700'>
                        <ion-icon name="leaf-outline"></ion-icon>
                    </div>
                    <h3 className="my-3 text-3xl font-semibold">Eco Friendly</h3>
                </div>
                <div className="flex flex-col items-center">
                    <div className='text-5xl text-red-700'>
                        <ion-icon name="locate-outline"></ion-icon>
                    </div>
                    <h3 className="my-3 text-3xl font-semibold">Integrety</h3>
                </div>
            </div>
        </section>
    );
};

export default Features;