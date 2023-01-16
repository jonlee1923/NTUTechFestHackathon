import { createContext, useState, useCallback, useEffect } from "react";

// export const AuthContext = createContext({
//   isLoggedIn: false,
//   userId: null,
//   token: null,
//   login: () => {},
//   logout: () => {}
// });

export const AuthContext = createContext();
let logoutTimer;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");

    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    //if i manually login then the expiry restarts
    //otherwise when i reload, the login is done with the existing token and expiry
    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);

        //existing expiration date or a new one when logging in for the first time
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

        setTokenExpirationDate(tokenExpirationDate);

        //use local storage in browser to store the jwt
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString(), //convert to iso string to ensure that no data gets lost when strig is filled
            })
        );
        setIsLoggedIn(true);
        setUserId(uid);
    }, []);

    //use useeffect to check local storage for a token
    useEffect(() => {
        //convert string back to json format
        const storedData = JSON.parse(localStorage.getItem("userData"));

        //check if storeddata and a token inside exists
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
          console.log("in login useeff")
            login(
                storedData.userId,
                storedData.token,
                new Date(storedData.expiration)
            );
        }
    }, [login]);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        setIsLoggedIn(false);
        //removing token
        localStorage.removeItem("userData");
    }, []);

    //clear the timeout when logging out
    //or when the expiration date changes
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime); //returns id of timer
        } else {
            //clear timers if someone manually logs out
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    return (
        <AuthContext.Provider
            value={{ token, userId, isLoggedIn, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
