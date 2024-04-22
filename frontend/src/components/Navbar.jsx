import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function StickyNavbar({ user }) {
  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            {user.id === "" ? (
              <Link to="/">FairML</Link>
            ) : (
              <Link to="/dashboard">FairML</Link>
            )}
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <Link to="/">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
