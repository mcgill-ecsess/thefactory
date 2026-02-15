"use client";
import { createContext, useState, useEffect, ReactNode } from 'react';
  import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the token

// Define the shape of the context
interface LoginContextType {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

// Create the context with a default value of `null` initially
export const LoginContext = createContext<LoginContextType | null>(null);

// Create a provider component to wrap around the parts of your app that need access to this context
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // Check for login token in localStorage and validate it
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token and check its expiration
        const decodedToken = jwtDecode<{ exp: number }>(token); // Correct usage of jwtDecode
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
          // Token expired, log out the user
          localStorage.removeItem("token"); // Remove the invalid token
          setIsLoggedIn(false); // Update logged-in status
          router.push("/login"); // Redirect to login page
        } else {
          setIsLoggedIn(true); // Token is valid, user is logged in
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // If the token is invalid or decoding fails, log out the user
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login"); // Redirect to login page
      }
    } else {
      setIsLoggedIn(false); // No token found, user is not logged in
    }
  }, [router]); // This will run only once when the component mounts

  // Function to set login state manually if needed
  const setLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
    if (!value) {
      localStorage.removeItem("token"); // Clear the token if user logs out
    }
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
