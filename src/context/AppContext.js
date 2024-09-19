import React from 'react';

const AppContext = React.createContext();

export default function AppProvider({ children, value }) {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return React.useContext(AppContext);
}
