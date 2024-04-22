import { useState, useEffect } from "react";
import StickyNavbar from "./components/Navbar";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import userService from "./services/users";

function Landing({ user, setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.localStorage.setItem("userid", user.id);
  }, [user.id]);
  useEffect(() => {
    window.localStorage.setItem("language", user.language);
  }, [user.language]);
  useEffect(() => {
    window.localStorage.setItem("group", user.group);
  }, [user.group]);

  const selectedDashType = () => {
    if (userService.createUser(user)) {
      navigate("/dashboard");
    } else {
      naviage("/error-page");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <StickyNavbar user={user} />
      <section className="grid text-center h-screen items-center p-8">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Sign In
          </Typography>
          <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
            Enter your email to get started one.
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mx-auto max-w-[24rem] text-left"
          >
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                color="gray"
                size="lg"
                type="email"
                name="id"
                placeholder="Enter your email to begin:"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={handleInput}
                value={user.id}
                required
              />
            </div>
            <Button
              onClick={selectedDashType}
              type="submit"
              disabled={user.id === ""}
              color="gray"
              size="lg"
              className="mt-6"
              fullWidth
            >
              sign in
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Landing;
