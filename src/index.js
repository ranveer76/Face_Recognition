import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import ErrorBoundary from "./utils/ErrorBounds";
import {ErrorProvider} from "./context/ErrorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ErrorProvider>
            <ErrorBoundary>
                <Router>
                    <App />
                </Router>
            </ErrorBoundary>
        </ErrorProvider>
    </React.StrictMode>
);