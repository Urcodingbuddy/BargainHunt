"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ScraperContextType {
    data: any;
    setData: (data: any) => void;
}

const ScraperContext = createContext<ScraperContextType | undefined>(undefined);

export const ScraperProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<any>(null);

    return (
        <ScraperContext.Provider value={{ data, setData }}>
            {children}
        </ScraperContext.Provider>
    );
};

export const useScraper = () => {
    const context = useContext(ScraperContext);
    if (!context) throw new Error("useScraper must be used within a ScraperProvider");
    return context;
};
