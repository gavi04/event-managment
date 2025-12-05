import React from "react";
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>You follow your passions,</h4>
        <p>We'll take care of bookings.</p>
        <img src={playstore} alt="playstore" />
        <img src={Appstore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Event Planning is Hard </h1>
        <p>WE CAN HELP YOU</p>

        <p>Copyrights 2024 &copy; Devit</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/devitsah"><FaGithub/>   Github</a>
        <a href="https://www.instagram.com/devitsah?igsh=MWEyNGFvM2dlN3lpcA=="><FaInstagramSquare/> Instagram</a>
       
       <a href="https://www.linkedin.com/in/devit-sah-d780/"><FaLinkedin/> LinkedIn</a>
        <a href="https://www.facebook.com/devitraj.shah.5?mibextid=ZbWKwL">< FaFacebook/> Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;