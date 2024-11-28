import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import logo from "../Navbar/sentryspot-logo.png";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isApiSuccess, setIsApiSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Access localStorage here

    if (token) {
      setIsLoggedIn(true);

      // Check API success
      const checkApiSuccess = async () => {
        try {
          const response = await fetch(
            "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          if (response.ok) {
            setIsApiSuccess(true);
          } else {
            setIsApiSuccess(false);
          }
        } catch (error) {
          setIsApiSuccess(false);
        }
      };

      checkApiSuccess();
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Dependency array should be empty to run only once after the first render

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => setIsMenuOpen(false);

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => setIsHovering(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav
      className=" border-b border-gray-200
    "
      style={{ backgroundColor: "#fff" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              {/* <img src="https://abroadiumlandingemployee.vercel.app/assets/logo-c5bcd0df.png" alt="logo" className="h-10 w-40" /> */}
              <img
                src="https://sentryspotfe.vercel.app/assets/logo-32a042d4.png"
                alt="logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center space-x-4">
            <Link
              href="/dashboard/aibuilder"
              className="text-[#003479] px-3 py-2 rounded-md text-lg font-semibold"
            >
              AI Resume Builder
            </Link>
            <Link
              href="/dashboard/resumelist"
              className="text-[#003479] px-3 py-2 rounded-md text-lg font-semibold"
            >
              My Resumes
            </Link>
            <Link
              href=""
              className="text-[#003479] px-3 py-2 rounded-md text-lg font-semibold"
            >
              About Us
            </Link>
            {/* <Link href="/adminlogin" className="text-[#003479] px-3 py-2 rounded-md text-lg font-semibold">
              <span className="mr-2">🛡️</span>
              <span>Admin</span>
            </Link> */}
            <a
              href="#phone"
              className="text-[#003479] px-3 py-2 rounded-md text-lg font-semibold"
            >
              📞 Contact us{" "}
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center bg-white text-[#003479] px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  <img
                    src="https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full "
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black">
                    <Link
                      href="/"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/dashboard/page"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login2"
                  className="text-[#003479] px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-[#003479] px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMenuClick}
              className="text-[#003479] hover:text-gray-700 focus:outline-none px-3 py-2 rounded-md text-sm font-medium"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/dashboard/aibuilder"
                className="text-[#003479] block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                AI Resume Builder
              </Link>
              <Link
                href="/dashboard/resumelist"
                className="text-[#003479] block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                My Resumes
              </Link>
              <Link
                href=""
                className="text-[#003479] block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                About Us
              </Link>
              <Link
                href=""
                className="text-[#003479] block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                Blog
              </Link>

              {isLoggedIn ? (
                <Link
                  href="/"
                  className="text-[#003479] block px-3 py-2 rounded-md text-base font-semibold"
                  onClick={() => {
                    handleLogout();
                    handleLinkClick();
                  }}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    href="/login2"
                    className="text-[#003479] block px-3 py-2 rounded-md text-base font-semibold"
                    onClick={handleLinkClick}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="text-[#003479] block px-3 py-2 rounded-md text-base font-semibold"
                    onClick={handleLinkClick}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
