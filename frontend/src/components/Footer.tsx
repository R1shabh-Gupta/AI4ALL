import { Signup } from "@/auth/Signup";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

type appProps = {
  isLoggedIn: boolean;
  onIsLoggedIn: (value: boolean) => void;
};

const Footer = ({ isLoggedIn, onIsLoggedIn }: appProps) => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 -mt-1 ">
      <div className="flex flex-col justify-between w-3/4 gap-8 mx-auto">
        <div className="flex flex-col content-end w-full">
          <hr className="bg-gray-300 h-[2px] w-full" />
          {!isLoggedIn ? (
            <div className="py-16 ml-auto w-fit">
              <Signup
                type="default"
                onIsLoggedIn={onIsLoggedIn}
                isbutton={true}
              />
            </div>
          ) : (
            <Button
              className="ml-auto my-16 w-fit bg-[#862FE7] hover:bg-[#852fe7d8]"
              onClick={() => navigate("/kairos")}
            >
              See <b className="mx-1">KairosAI</b> in action
            </Button>
          )}

          <hr className="bg-gray-300 h-[2px] w-full" />
        </div>

        {/* subsection */}
        <div>
          <div className="flex flex-col justify-between w-2/3 gap-8 sm:gap-0 sm:flex-row">
            <div>
              <h1 className="mb-2 text-sm font-bold text-gray-800 uppercase">
                Product
              </h1>
              <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
                <li>Pricing</li>
                <li>Alternatives</li>
                <li>View Demo</li>
                <li>Our Roadmap</li>
              </ul>
            </div>

            <div>
              <h1 className="mb-2 text-sm font-bold text-gray-800 uppercase">
                Features
              </h1>
              <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
                <li>Product Changelog</li>
                <li>All Features</li>
              </ul>
            </div>

            <div>
              <h1 className="mb-2 text-sm font-bold text-gray-800 uppercase">
                Resources
              </h1>
              <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
                <li>Blog</li>
                <li>Glossary</li>
                <li>Request a feature</li>
              </ul>
            </div>

            <div>
              <h1 className="mb-2 text-sm font-bold text-gray-800 uppercase">
                Policies
              </h1>
              <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>All Legal</li>
              </ul>
            </div>
          </div>

          {/* subsection */}
          <div className="flex flex-col items-center justify-between gap-3 mt-20 mb-10 cursor-pointer sm:gap-0 sm:flex-row">
            <h3 className="text-sm text-gray-500">
              Copyright © 2024 AI4ALL. All rights reserved.
            </h3>
            <div className="flex gap-4">
              <img
                className="scale-75"
                src="/assets/images/x.png"
                alt="twitter"
              />
              <p className="text-gray-300">/</p>
              <img
                className="scale-75"
                src="/assets/images/in.png"
                alt="linkedin"
              />
              <p className="text-gray-300">/</p>
              <img
                className="scale-75"
                src="/assets/images/insta.png"
                alt="instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
