import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { FaGithub } from "react-icons/fa";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/devitsah?igsh=MWEyNGFvM2dlN3lpcA==";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dqhhbkxib/image/upload/v1714819502/avatars/124074174_dicetd.jpg"
              alt="Founder"
            />
            <Typography>Devit Sah</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            "Hi there! I'm [Devit], a passionate developer from Nepal with a knack for turning ideas into reality through code. I love the challenge of solving problems and creating user-friendly solutions that make a difference.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Join Us</Typography>
            <a
              href="https://github.com/devitsah"
              target="blank"
            >
              <FaGithub className="GithubSvgIcon" />
            </a>
            <br></br>

            <a href="https://www.instagram.com/devitsah?igsh=MWEyNGFvM2dlN3lpcA==" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;