"use client";

import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoginContext } from "@/Contexts/LoginContext";

export default function Login() {
  const loginContext = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage (only on client side)
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        loginContext?.setLoggedIn(true);
        router.push("/inventory"); // Redirect to inventory if token exists
      }
    }
  }, [loginContext?.isLoggedIn, router]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // Send login request to Strapi
      const response = await axios.post("https://factorystrapi.mcgilleus.ca/api/auth/local", {
        identifier: username,
        password: password,
      });

      // Store the JWT token
      const jwt = response.data.jwt;
      setToken(jwt);

      // Store the JWT in localStorage for future use
      localStorage.setItem("token", jwt);

      // Handle successful login (e.g., redirect to Inventory page)
      loginContext?.setLoggedIn(true);
      toast.success("Successfully Logged In!");
      router.push("/inventory"); // Redirect to the Inventory page after login
    } catch (error) {
      setErrorMessage("Invalid login credentials.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-[500px]">
      <Box className="flex flex-col items-center ">
        <Typography variant="h2">Login</Typography>
        <Divider
          aria-hidden="true"
          sx={{
            opacity: 1,
            borderColor: "#000000",
            borderWidth: 2,
            width: "10%",
            alignSelf: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        />
        <p className="text-gray-600 mb-2">
          Note that this is for Factory <strong>Managers</strong> only.
        </p>
        <form className="flex flex-col w-full max-w-md min-w-fit gap-y-3 px-6" onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="username"
            label="Username"
            variant="outlined"
            className="m-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state on change
            required
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            className="m-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required
          />
          <Button
            variant="contained"
            type="submit"
            className="m-4"
            sx={{
              backgroundColor: "#57bf94",
              color: "white",
              "&:hover": {
                backgroundColor: "#4ca981",
              },
            }}
          >
            Login
          </Button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Box>
    </div>
  );
}
