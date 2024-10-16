// Provides authentication context and functions to manage user authentication state
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {getCustomers, login as performLogin} from "../../services/client.js";
import { jwtDecode } from 'jwt-decode';

// Create a context for authentication
const AuthContext = createContext({});

// Authentication provider component
const AuthProvider = ({ children }) => {

    const [customer, setCustomer] = useState(null);

    const setCustomerFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            setCustomer({
                username: token.sub,
                roles: token.scopes
            })
        }
    }

    // Initialize customer state on component mount
    useEffect(() => {
        setCustomerFromToken()
    }, [])

    // Login function that authenticates the user and updates state
    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken);
                const decodedToken = jwtDecode(jwtToken);
                setCustomer({
                    username: decodedToken.sub,
                    roles: decodedToken.scopes
                })
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    // Logout function that clears authentication state
    const logOut = () => {
        localStorage.removeItem("access_token")
        setCustomer(null)
    }

    // Check if the customer is authenticated based on the token expiration
    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp: expiration } = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut()
            return false;
        }
        return true;
    }
    return (
        <AuthContext.Provider value={{
            customer,
            login,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;