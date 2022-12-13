import React from "react";
import { Hidden } from "@mui/material";
import { Container } from "@mui/system";
import NavMain from "./NavMain";
import Navsub from "./Navsub";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Hidden lgDown>
        <Container maxWidth="xl">
          <Navsub />
          <NavMain />
        </Container>
      </Hidden>
      <Hidden xlUp>
        <Navsub />
        <NavMain />
      </Hidden>
      <Outlet />
    </div>
  );
};

export default NavBar;
