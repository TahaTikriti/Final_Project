import React from 'react';
import logoColor from '../assets/images/logo-color.svg';  // Correct relative path to your image

const MyComponent = () => {
    return (
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={logoColor} alt="Logo Color" />  // Use the imported image here
        </div>
    );
};

export default MyComponent;
