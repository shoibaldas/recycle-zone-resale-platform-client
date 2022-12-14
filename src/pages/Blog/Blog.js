import React from 'react';
import img1 from '../../assets/Blog/state.png';
import img2 from '../../assets/Blog/prototypical.jpg';
import img3 from '../../assets/Blog/Unit-Testing.jpg';
import img4 from '../../assets/Blog/ReactAngularVue.jpeg';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import useTitle from '../../hook/useTitle';

const blogItem = [
    {
        id: 1,
        image: img1,
        title: "What are the different ways to manage a state in a React application?",
        ans: "React state management is a process for managing the data that React components need in order to render themselves. This data is typically stored in the component's state object. When the state object changes, the component will re-render itself. React state management is basically half of a React app.The Four Kinds of React State to Manage are Local state. Global state. Server state. URL state."
    },
    {
        id: 2,
        image: img2,
        title: "How does prototypical inheritance work?",
        ans: "Javascript has a feature called prototypal inheritance that allows you to add methods and attributes to objects. It is a technique that allows an item to take on the attributes and operations of another object. Traditionally, we utilize Object. getPrototypeOf and Object to obtain and modify an object's [[Prototype]]."
    },
    {
        id: 3,
        image: img3,
        title: "What is a unit test? Why should we write unit tests?",
        ans: "Unit testing's primary goal is to separate written code for testing to see if it functions as intended. Unit testing is a crucial stage in the development process because, when done properly, it may aid in finding early code issues that could be more challenging to identify in subsequent testing phases."
    },
    {
        id: 4,
        image: img4,
        title: "React vs. Angular vs. Vue?",
        ans: "Compared to Angular or React, Vue offers greater customizability and is therefore simpler to learn. Additionally, Vue and Angular and React overlap in terms of functionality, such as the use of components. Consequently, switching from either of the two to Vue is a simple option."
    },
]

const Blog = () => {
    useTitle('Blog');
    return (
        <section className=" dark:text-gray-100">
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                {
                    blogItem.map(blog => <div key={blog.id} blog={blog} className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
                        <PhotoProvider>
                            <PhotoView src={blog.image}>
                                <img src={blog.image} alt="" className="object-fit md:object-cover w-full h-64 sm:h-96 lg:col-span-7" />
                            </PhotoView>
                        </PhotoProvider>
                        <div className="bg-teal-800 p-6 space-y-2 lg:col-span-5">
                            <h3 className="text-2xl font-semibold sm:text-4xl">{blog.title}</h3>
                            <p>{blog.ans}</p>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default Blog;