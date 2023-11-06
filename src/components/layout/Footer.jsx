import React from "react";
import { Link } from "react-router-dom";
import { FaceBook, Twitter, Youtube } from "../../utils/Icons";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-blue-600  text-white border-t-[3px] border-blue-600">
      <div className="flex  justify-center gap-8">
        <span className="link link-hover">
          <Link to="/" className="hover:border-b-2 border-white py-1">
            About
          </Link>{" "}
        </span>
        <span className="link link-hover">
          <Link to="/" className="hover:border-b-2 border-white py-1">
            Contact Us
          </Link>
        </span>
      </div>
      <div className="flex  justify-center gap-6 my-4">
        <a className="hover:scale-105 hover:translate-x-1 transition-all cursor-pointer">
          {Twitter}
        </a>
        <a className="hover:scale-105 hover:translate-x-1 transition-all cursor-pointer">
          {Youtube}
        </a>
        <a className="hover:scale-105 hover:translate-x-1 transition-all cursor-pointer">
          {FaceBook}
        </a>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved by example</p>
      </div>
    </footer>
  );
};

export default Footer;
