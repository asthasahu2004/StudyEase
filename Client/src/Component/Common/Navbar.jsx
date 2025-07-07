import { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../Asset/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../Data/Navbar-Link";
import { logout } from "../../Service/Operation/authAPI";
import { apiConnector } from "../../Service/apiConnector";
import { courseEndpoints } from "../../Service/apis";
import { ACCOUNT_TYPE } from "../../Util/constants";

import ProfileDropdown from "../Core/Auth/ProfileDropdown";
import HamburgerMenu from "./HamburgerMenu";

import {
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory, BiDetail } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { VscDashboard, VscSignIn, VscSignOut } from "react-icons/vsc";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const { COURSE_PUBLISHED_CATEGORIES_API } = courseEndpoints;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading2, setLoading2] = useState(false); // still unused, keep if needed elsewhere
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);          // always an array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", COURSE_PUBLISHED_CATEGORIES_API);
        // guarantee array – prevents `.length` crash
        setSubLinks(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
        setSubLinks([]);    // fall back to empty
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  /* ---------- Catalog dropdown ---------- */
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p className="uppercase tracking-wider">{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5" />
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length > 0 ? (
                        subLinks
                          .filter((s) => (s.courses || []).length > 0)
                          .map((s, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${s.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            >
                              <p className="uppercase tracking-wider">
                                {s.name}
                              </p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* ---------- Regular links ---------- */
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } uppercase tracking-wider`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* DESKTOP – LOGIN / CART / PROFILE */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 uppercase">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 uppercase">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* MOBILE – HAMBURGER MENU */}
        <div className="mr-4 md:hidden">
          <GiHamburgerMenu
            onClick={() => setIsMenuModalOpen((prev) => !prev)}
            className="fill-richblack-100"
            fontSize={24}
          />

          <HamburgerMenu
            isMenuModalOpen={isMenuModalOpen}
            setIsMenuModalOpen={setIsMenuModalOpen}
          >
            <div className="flex flex-col gap-y-2 py-5 px-5">
              {(loading || loading2) && (
                <div className="text-white font-bold">Loading ...</div>
              )}

              {token === null && (
                <>
                  <Link to="/login" onClick={() => setIsMenuModalOpen(false)}>
                    <div className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider">
                      <VscSignIn className="text-lg" />
                      Log In
                    </div>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuModalOpen(false)}>
                    <div className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider">
                      <AiOutlineLogin className="text-lg" />
                      Sign Up
                    </div>
                  </Link>
                </>
              )}

              {token !== null && (
                <>
                  <Link
                    to="/dashboard/my-profile"
                    onClick={() => setIsMenuModalOpen(false)}
                  >
                    <div className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider">
                      <VscDashboard className="text-lg" />
                      Dashboard
                    </div>
                  </Link>

                  {user?.role === "Student" && (
                    <Link
                      to="/dashboard/cart"
                      onClick={() => setIsMenuModalOpen(false)}
                    >
                      <div className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider">
                        <AiOutlineShoppingCart className="text-lg" />
                        Cart
                      </div>
                    </Link>
                  )}

                  <div
                    onClick={() => dispatch(logout(navigate))}
                    className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 cursor-pointer uppercase tracking-wider"
                  >
                    <VscSignOut className="text-lg" />
                    Log Out
                  </div>
                </>
              )}

              {/* Divider */}
              <div className="h-px my-2 bg-richblack-100 w-3/4 mx-auto" />

              {/* General links */}
              <Link to="/" onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider">
                  <AiOutlineHome className="text-lg" />
                  Home
                </div>
              </Link>

              <Link to="/about" onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider">
                  <BiDetail className="text-lg" />
                  About
                </div>
              </Link>

              <Link to="/contact" onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider">
                  <AiOutlineContacts className="text-lg" />
                  Contact
                </div>
              </Link>

              {/* Category dropdown */}
              <div onClick={() => setCategoryOpen((prev) => !prev)}>
                <details open={categoryOpen}>
                  <summary className="flex items-center gap-x-2 w-full py-2 px-3 text-richblack-100 uppercase tracking-wider cursor-pointer">
                    <BiCategory className="text-lg" />
                    Category
                    {categoryOpen ? (
                      <SlArrowUp className="ml-auto mr-1 translate-y-px" />
                    ) : (
                      <SlArrowDown className="ml-auto mr-1 translate-y-px" />
                    )}
                  </summary>

                  <div className="px-4 text-richblack-100">
                    {subLinks.length > 0 ? (
                      <div className="flex flex-col capitalize">
                        {subLinks.map((s, i) => (
                          <Link
                            key={i}
                            to={`/catalog/${s.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            onClick={() => setIsMenuModalOpen(false)}
                          >
                            <p className="rounded-lg py-2 pl-4 uppercase tracking-wider text-xs">
                              {s.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg py-2 pl-4 select-none cursor-not-allowed">
                        No Catalog Available
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          </HamburgerMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
