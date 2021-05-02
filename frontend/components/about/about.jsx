import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import marked from "marked";
import MenuItem from "@material-ui/core/MenuItem";
import style from "./style.scss";
import theme from "../theme/theme";
import readme from "../../../README.md";

// test comment

const About = () => {
  return (
    <div
      className={style.markdownWrapper}
      dangerouslySetInnerHTML={{ __html: marked(readme.slice(78)) }}
    ></div>
  );
};

export default About;
