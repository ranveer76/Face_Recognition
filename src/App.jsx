import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppContext';
import Home from './pages/Home';
import Layout from './components/Layout';

export default function App() {
    const values = {
        Count: () => {
            const [count, setCount] = React.useState(0);
            useEffect(() => {
                if (count > 10) {
                    const err = new Error('Count is greater than 10');
                    err.code = 500;
                    throw err;
                }
            }, [count]);
            return (
                <div>
                    <p>{count}</p>
                    <button onClick={() => { (count > 10) ? setCount(0) : setCount(count + 1); }}>Increment</button>
                </div>
            );
        },
    };
    return (
        <AppProvider value={values}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Layout>
        </AppProvider>
    );
}