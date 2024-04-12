import { Login } from "@/auth/Login";

import { Signup } from "@/auth/Signup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuLink } from "./ui/navigation-menu";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type appProps = {
  onIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
};

const Navbar = ({ onIsLoggedIn, isLoggedIn }: appProps) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const currentPagePathname = window.location.pathname;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        onIsLoggedIn(false);
        console.log("Successfully signout");
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <nav className="border-b-[1px] sticky top-0 z-20 bg-gray-50 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50">
      <div className="flex items-center justify-between px-6 py-4 sm:px-28">
        <h1 className="text-xl font-semibold sm:text-2xl font-heading">
          <button onClick={() => navigate("/")}>AI4ALL</button>

          <sup className="text-xs font-normal text-gray-500 font-inter">
            BETA
          </sup>
        </h1>

        {/* Small Screen */}
        <div className="flex gap-3 sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-align-right"
              >
                <line x1="21" x2="3" y1="6" y2="6" />
                <line x1="21" x2="9" y1="12" y2="12" />
                <line x1="21" x2="7" y1="18" y2="18" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel
                className={`${
                  currentPagePathname === "/dropzone" &&
                  "font-semibold text-[#770785]"
                }`}
              >
                <Link to="/dropzone">DropZone</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                className={`${
                  currentPagePathname === "/kairos" &&
                  "font-semibold text-[#770785]"
                }`}
              >
                <Link to="/kairos">KairosAI</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                className={`${
                  currentPagePathname === "/autoPreprocessorPage" &&
                  "font-semibold text-[#770785]"
                }`}
              >
                <Link to="/autoPreprocessorPage">AutoPreprocessor</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <a
                  href="https://github.com/R1shabh-Gupta/TextWiz"
                  target="_blank"
                >
                  GitHub
                </a>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!isLoggedIn ? (
                <>
                  <DropdownMenuLabel>
                    <Login onIsLoggedIn={onIsLoggedIn} isbutton={false} />
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>
                    <Signup
                      type="default"
                      onIsLoggedIn={onIsLoggedIn}
                      isbutton={false}
                    />
                  </DropdownMenuLabel>
                </>
              ) : (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>
                    <p onClick={handleSignOut}>Sign Out</p>
                  </DropdownMenuLabel>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Large Screen */}
        <div className="hidden sm:flex">
          <ul className="flex items-center justify-center gap-1 text-gray-600">
            <li>
              <NavigationMenu className="mr-8">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white border border-slate-200">
                      Toolbox
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                              onClick={() => navigate("/")}
                            >
                              <div>
                                <img
                                  src="/assets/images/toolbox.svg"
                                  alt="toolbox"
                                />
                              </div>
                              <div className="mt-4 mb-2 text-lg font-medium">
                                Nexus
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                From Scattered to Streamlined within minutes 🚀
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li onClick={() => navigate("/dropzone")}>
                          <NavigationMenuLink
                            asChild
                            className={`${
                              currentPagePathname === "/dropzone"
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                          >
                            <a className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">
                                DropZone
                              </div>
                              <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                                Drag It. Drop It. Generate It 🔁
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>

                        <li onClick={() => navigate("/kairos")}>
                          <NavigationMenuLink
                            asChild
                            className={`${
                              currentPagePathname === "/kairos"
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                          >
                            <a className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">
                                KairosAI
                              </div>
                              <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                                Your AI Champion: Drop, Generate, Explain,
                                Deploy ⚡️
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>

                        <li onClick={() => navigate("/autoPreprocessorPage")}>
                          <NavigationMenuLink
                            asChild
                            className={`${
                              currentPagePathname === "/autoPreprocessorPage"
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                          >
                            <a className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">
                                AutoPreprocessor
                              </div>
                              <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                                From Mess to Masterpiece: Preprocess your data
                                in a jiffy 🎨
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>

            <li>
              {/* large screen */}
              <div className="hidden gap-5 md:flex">
                <NavigationMenu className="flex gap-2">
                  {!isLoggedIn ? (
                    <div className="flex flex-wrap justify-around gap-4">
                      <Login onIsLoggedIn={onIsLoggedIn} isbutton={true} />
                      <Signup
                        type="default"
                        onIsLoggedIn={onIsLoggedIn}
                        isbutton={true}
                      />
                      <Button variant="outline" size="icon">
                        <a
                          href="https://github.com/R1shabh-Gupta/AI4ALL"
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-github"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      <Button variant="outline" size="icon">
                        <a
                          href="https://github.com/R1shabh-Gupta/AI4ALL"
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-github"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      </Button>

                      <Button onClick={handleSignOut} variant="outline">
                        Sign Out
                      </Button>
                    </div>
                  )}
                </NavigationMenu>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
