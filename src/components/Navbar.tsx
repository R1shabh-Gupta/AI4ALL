import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-28 py-4 border-b-[1px]">
      <h1 className="text-2xl font-semibold font-heading">
        AI4ALL
        <sup className="text-xs font-normal text-gray-500 font-inter">BETA</sup>
      </h1>

      <div>
        <ul className="flex items-center justify-center gap-6 text-gray-600">
          <li>Features</li>
          <li>Pricing</li>
          <li>Blog</li>
          <li>Login</li>
          <li>
            <Button className="bg-[#862FE7] text-white">
              Sign up for free
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
