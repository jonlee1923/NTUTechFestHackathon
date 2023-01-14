import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/authHook";

function App() {
    const { token, login, logout, userId } = useAuth();

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token, // !! converts to true and false
                token: token, //need token to send request in the app
                login: login,
                logout: logout,
                userId: userId,
            }}
        >
            <Login />
        </AuthContext.Provider>
    );
}

export default App;
