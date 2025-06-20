"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../types/user/type";

type UserDataContextType = {
    userData: UserType | null,
    setUserData: (userData: UserType | null) => void;
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [userData, setUserData] = useState<UserType | null>(null)

    useEffect(()=>{
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(userData))
    },[userData])

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) throw new Error("useSellerAuth must be used within AuthProvider");
    return context;
};
