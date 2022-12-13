import React from "react";
import { makeStyles } from "@mui/styles"
import { Slide, useScrollTrigger, AppBar, Toolbar} from "@mui/material"
import { PropTypes } from "prop-types";
const useStyles = makeStyles((theme) =>({
  nav:{
    backgroundColor: "black !important",
    color: "black !important",
    position:"sticky",
    height: 60,
    fontFamily: "-moz-initial",
    boxShadow: "none",
  },
  toolbar:{
    padding: 0
  },
  fallback:{
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    zIndex: -1,
  }
}))

function HideOnScroll(props){
  const {children, window} = props
  const trigger = useScrollTrigger({target: window ? window() : undefined})
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
HideOnScroll.protoTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}

const NavMain = (props) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.nav}>
          <Toolbar className={classes.toolbar}>
            {/* // nav menu */}
            {/* // logo nike */}
            {/* // navmain feature */}
          </Toolbar>
          {/* // search box */}
        </AppBar>
      </HideOnScroll>
      <div id="falback" className={classes.fallback}></div>
    </React.Fragment>
  )
};

export default NavMain;
