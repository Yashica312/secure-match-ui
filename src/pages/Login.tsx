import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "@/components/AuthCard";

const API = "https://ai-organ-matching-system.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setLoginError("");
    setSignupError("");
    setSignupSuccess("");

    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      localStorage.setItem("isLoggedIn", "true");
      navigate("/matching");
    } catch {
      setLoginError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (username: string, password: string) => {
    setLoading(true);
    setLoginError("");
    setSignupError("");
    setSignupSuccess("");

    try {
      const res = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setSignupSuccess("Account created. Please log in.");
    } catch {
      setSignupError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthCard
        onLogin={handleLogin}
        onSignup={handleSignup}
        loading={loading}
        loginErrorMessage={loginError}
        signupErrorMessage={signupError}
        signupSuccessMessage={signupSuccess}
      />
    </div>
  );
};

export default Login;
