import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Popup from './Popup';

export default function Layout({ children }) {
    return (
        <div>
            <Popup />
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}