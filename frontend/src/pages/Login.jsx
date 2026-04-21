import axios from "axios";
import { useState, useEffect } from "react";
const API_BASE_URL = "http://localhost:10000";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = ({ setUser, switchToRegister, msg }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const errors = {};
    let isValid = true;

    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    setFieldErrors(errors);

    if (!isValid) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });

      const username =
        typeof res.data?.username === "string"
          ? res.data.username
          : res.data?.username?.name || "User";

      setResult(`Welcome back, ${username}!`);
      localStorage.setItem("user", JSON.stringify({ username }));
      setUser({ username });
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred during login.",
      );
      console.log("Error details:", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect for auto-clearing messages
  useEffect(() => {
    if (error || result) {
      const timer = setTimeout(() => {
        setError(null);
        setResult(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error, result]);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <main className="relative z-10 flex-grow flex justify-center">
        <div className="w-full max-w-lg md:max-w-xl px-6 py-12">

          <Card className="backdrop-blur-sm bg-neutral-900 dark:bg-white border border-neutral-800 dark:border-neutral-200 shadow-lg rounded-2xl">

            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-center text-white dark:text-neutral-900">
                Login
              </CardTitle>
              <CardDescription className="text-center text-neutral-400 dark:text-neutral-500">
                Enter your email and password to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {error && (
                <div className="rounded-lg p-3 bg-red-900/20 text-red-400 border border-red-800 dark:bg-red-50 dark:text-red-600 dark:border-red-200">
                  {String(error)}
                </div>
              )}

              {result && (
                <div className="rounded-lg p-3 bg-green-900/20 text-green-400 border border-green-800 dark:bg-green-50 dark:text-green-600 dark:border-green-200">
                  {String(result) || String(msg)}
                </div>
              )}

              <form 
                onSubmit={handleSubmit} 
                onChange={(e) => setFieldErrors(prev => ({ ...prev, [e.target.name]: null }))}
                className="space-y-4"
              >

                <div className="space-y-2">
                  <Label className="text-neutral-300 dark:text-neutral-700">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`h-11 bg-neutral-800 dark:bg-neutral-100 border text-white dark:text-black focus:ring-2 ${
                      fieldErrors.email 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-neutral-700 dark:border-neutral-300 focus:ring-neutral-500"
                    }`}
                  />
                  {fieldErrors.email && <div className="text-xs text-red-500 mt-1">{fieldErrors.email}</div>}
                </div>

                <div className="space-y-2 flex flex-col relative">
                  <Label className="text-neutral-300 dark:text-neutral-700">
                    Password
                  </Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className={`h-11 pr-16 bg-neutral-800 dark:bg-neutral-100 border text-white dark:text-black focus:ring-2 ${
                      fieldErrors.password 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-neutral-700 dark:border-neutral-300 focus:ring-neutral-500"
                    }`}
                  />

                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-[34px] -translate-y-1/2 px-2 py-1 text-xs bg-neutral-700 dark:bg-neutral-200 text-white dark:text-black hover:bg-neutral-600 dark:hover:bg-neutral-300"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                  {fieldErrors.password && <div className="text-xs text-red-500 mt-1">{fieldErrors.password}</div>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold text-[16px] bg-white text-black hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 active:scale-95 transition"
                >
                  {isLoading ? "Logging..." : "Login"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  onClick={switchToRegister}
                  className="text-sm text-neutral-400 dark:text-neutral-600 hover:underline"
                >
                  Create account
                </button>
              </div>

            </CardContent>
          </Card>

        </div>
      </main>

    </>
  );
};

export default Login;
