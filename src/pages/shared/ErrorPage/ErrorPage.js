import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16 bg-white text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                    <Link to='/' className="px-8 py-3 font-semibold rounded transition duration-200 shadow-md md:w-auto md:mb-0 bg-sky-600 hover:bg-sky-800 focus:shadow-outline focus:outline-none text-white">Back to homepage</Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;