"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLogo from "../public/images/MainLogo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const closeMenu = () => {
    setIsMenuClosing(true);

    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 400);
  };

  return (
    <nav
      className="
    relative
    w-full
    min-h-[100px]
    border-t-[3px] border-t-[#c99a43] border-b border-[#d8ddd9]
    bg-[#fffdf8]/95 shadow-[0_8px_30px_rgba(16,36,59,0.06)] backdrop-blur
    flex items-center justify-between
    px-10
    max-[800px]:min-h-[80px]
    max-[800px]:px-5
    max-[800px]:py-3
    max-[700px]:min-h-0
    max-[700px]:py-2
    max-[700px]:px-4
  "
    >
      {/* ================= LOGO + TITLE ================= */}
      {/* <div className="flex items-center min-w-0"> */}
      <div
        className="
    flex
    items-center
    min-w-0

    max-[700px]:gap-x-0
  "
      >
        <Image
          className="
    inline-block
    h-16
    w-auto
    shrink-0

    max-[800px]:h-12
    max-[700px]:h-10
    max-sm:h-9
  "
          src={MainLogo}
          alt="Logo img"
        />

        <div
          className="
            flex items-center
            gap-x-2
            min-w-0
            ml-2

            max-[800px]:gap-x-1
            max-sm:ml-1
          "
        >
          <h1
            className="
    text-[#10243b]
    font-bold
    font-serif tracking-[-0.045em]
    text-5xl
    leading-none

    max-lg:text-4xl
    max-md:text-3xl
    max-[800px]:text-2xl
    max-[700px]:text-xl
    max-sm:text-lg
  "
          >
            Ramazan
          </h1>

          <span
            className="
    text-lg
    text-[#64717b] font-medium tracking-[0.01em]
    whitespace-nowrap
    leading-none

    max-lg:text-base
    max-md:text-sm
    max-[800px]:text-xs
    max-[700px]:text-[11px]
    max-sm:text-[9px]
  "
          >
            Group of Universities
          </span>
        </div>
      </div>

      <div
        className="
          h-full
          flex items-center
          gap-x-9
          shrink-0
          max-[800px]:hidden
        "
      >
        <Link
          href="/"
          className="
            relative
            h-full
            flex items-center
            text-lg
            text-[#147a69] font-medium
            transition-colors

            after:absolute
            after:left-0
            after:-bottom-9
            after:h-[7px]
            after:w-full
            after:bg-[#c99a43]
          "
        >
          Home
        </Link>

        <Link
          href="/AddStudent"
          className="
  relative
  h-full
  flex items-center
  text-lg
  text-[#314558]
  hover:text-[#147a69]
  font-medium
  transition-colors

  after:absolute
  after:left-0
  after:-bottom-9
  after:h-[7px]
  after:w-full
  after:bg-[#c99a43]
  after:opacity-0
  hover:after:opacity-100
  after:transition-opacity
  after:duration-300
"
        >
          Add Student
        </Link>

        <Link
          href="/StudentList"
          className="
  relative
  h-full
  flex items-center
  text-lg
  text-[#314558]
  hover:text-[#147a69]
  font-medium
  transition-colors

  after:absolute
  after:left-0
  after:-bottom-9
  after:h-[7px]
  after:w-full
  after:bg-[#c99a43]
  after:opacity-0
  hover:after:opacity-100
  after:transition-opacity
  after:duration-300
"
        >
          Student List
        </Link>
      </div>

      {/* ================= HAMBURGER BUTTON ================= */}
      <button
        type="button"
        onClick={() => {
          if (isMenuOpen) {
            closeMenu();
          } else {
            setIsMenuOpen(true);
          }
        }}
        className="
          hidden
          max-[800px]:flex

          items-center
          justify-center

          w-10
          h-10

          text-[#10243b]
          hover:text-[#147a69]
          transition-colors
        "
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          /* X ICON */
          <div className="relative w-6 h-6">
            <span
              className="
                absolute
                top-1/2
                left-0
                w-6
                h-[2px]
                bg-current
                rotate-45
              "
            />

            <span
              className="
                absolute
                top-1/2
                left-0
                w-6
                h-[2px]
                bg-current
                -rotate-45
              "
            />
          </div>
        ) : (
          /* HAMBURGER ICON */
          <div className="flex flex-col gap-[5px]">
            <span className="w-6 h-[2px] bg-current" />
            <span className="w-6 h-[2px] bg-current" />
            <span className="w-6 h-[2px] bg-current" />
          </div>
        )}
      </button>

      {/* ================= MOBILE MENU DRAWER ================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* ================= DARK OVERLAY ================= */}
          <div
            onClick={closeMenu}
            className={`
        absolute
        inset-0
        bg-black/60
        backdrop-blur-[2px]

        ${
          isMenuClosing
            ? "animate-[overlayOut_.4s_ease-in-out_forwards]"
            : "animate-[overlayIn_.4s_ease-in-out_forwards]"
        }
      `}
          />

          {/* ================= RIGHT DRAWER ================= */}
          <div
            className={`
        absolute
        top-0
        right-0
        h-full

        w-[320px]
        max-w-[85vw]

        bg-[#10243b]
        border-l border-[#315066]
        shadow-2xl

        ${
          isMenuClosing
            ? "animate-[drawerOut_.4s_cubic-bezier(.77,0,.18,1)_forwards]"
            : "animate-[drawerIn_.5s_cubic-bezier(.77,0,.18,1)_forwards]"
        }

        max-sm:w-[290px]
      `}
          >
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="
          absolute
          top-6
          right-5

          flex
          items-center
          justify-center

          w-10
          h-10

          rounded-full

          border
          border-[#476277]
          text-[#a9bbc4]

          hover:text-white
          hover:border-[#c99a43]
          hover:bg-white/10

          transition-all
          duration-300

          animate-[closeIn_.5s_ease-out_.2s_both]
        "
            >
              <span
                className="
            absolute
            w-6
            h-[2px]
            bg-current
            rotate-45
          "
              />

              <span
                className="
            absolute
            w-6
            h-[2px]
            bg-current
            -rotate-45
          "
              />
            </button>

            {/* ================= MENU CONTENT ================= */}
            <div className="pt-20 px-10">
              <p
                className="
            text-[12px]
            font-bold
            tracking-[4px]
            text-[#d8b66d]

            animate-[titleIn_.5s_ease-out_.25s_both]
          "
              >
                NAVIGATION
              </p>

              {/* ================= LINKS ================= */}
              <div className="mt-10 flex flex-col gap-7">
                {/* HOME */}
                <Link
                  href="/"
                  onClick={closeMenu}
                  style={{ animationDelay: "350ms" }}
                  className="
              group
              flex
              items-center
              gap-3

              text-[16px]
              font-semibold
              text-[#b6c5ce]

              hover:text-white

              transition-colors
              duration-300

              animate-[menuItemIn_.5s_ease-out_both]
            "
                >
                  <span
                    className="
                w-[6px]
                h-[6px]
                rounded-full
                bg-[#c99a43]

                group-hover:scale-150
                group-hover:bg-[#e5c984]

                transition-all
                duration-300
              "
                  />
                  Home
                </Link>

                {/* ADMISSION */}
                <Link
                  href="/about"
                  onClick={closeMenu}
                  style={{ animationDelay: "450ms" }}
                  className="
              group
              flex
              items-center
              gap-3

              text-[16px]
              font-semibold
              text-[#b6c5ce]

              hover:text-white

              transition-colors
              duration-300

              animate-[menuItemIn_.5s_ease-out_both]
            "
                >
                  <span
                    className="
                w-[6px]
                h-[6px]
                rounded-full
                bg-[#c99a43]

                group-hover:scale-150
                group-hover:bg-[#e5c984]

                transition-all
                duration-300
              "
                  />
                  Admission
                </Link>

                {/* ATHLETICS */}
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  style={{ animationDelay: "550ms" }}
                  className="
              group
              flex
              items-center
              gap-3
              text-[16px]
              font-semibold
              text-[#b6c5ce]

              hover:text-white

              transition-colors
              duration-300

              animate-[menuItemIn_.5s_ease-out_both]
            "
                >
                  <span
                    className="
                w-[6px]
                h-[6px]
                rounded-full
                bg-[#c99a43]

                group-hover:scale-150
                group-hover:bg-[#e5c984]

                transition-all
                duration-300
              "
                  />
                  Athletics
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
