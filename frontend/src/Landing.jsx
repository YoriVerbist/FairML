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
    console.log(user);
    axios
      .post(
        BASE_API + "/validateusers",
        {
          UserId: user.id,
          Cohort: user.group,
          Language: user.language,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
            "Access-Control-Allow-Headers":
              "X-Auth-Token, Origin, Authorization, X-Requested-With, Content-Type, Accept",
          },
        },
      )
      .then(function (response) {
        //console.log(response.data);
        if (response.data["StatusCode"]) {
          navigate("/dashboard/" + user.cohort);
        } else {
          console.log("Error reported. Login failed.");
          // TO-DO: Navigate to Error Screen.
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
      <StickyNavbar />
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
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="Enter your email to begin:"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={handleInput}
                required
              />
            </div>
            <Button color="gray" size="lg" className="mt-6" fullWidth>
              sign in
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Landing;
