import React from 'react';

export const ErrorContext = React.createContext();

export function ErrorProvider({ children }) {
    const [error, setError] = React.useState(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
}

export function useErrorContext() {
    return React.useContext(ErrorContext);
}
