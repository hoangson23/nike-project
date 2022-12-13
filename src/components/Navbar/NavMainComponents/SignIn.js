import React, { useState } from "react";
import { Dialog, IconButton, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import * as action from "./Redux/Actions/action";
import { useForm } from "react-hook-form";
import SignUp from "./SignUp";
import { PersonOutline } from "@mui/icons-material";
import { LOGOUT } from "./Redux/Contansts/contants";
import { Link } from "react-router-dom";

const preventDefault = (event) => event.preventDefault();
const useStyles = makeStyles((theme) => ({
  nav1Menu: {
    margin: "0 12px",
    textDecoration: "none",
    color: "black",
    fontSize: 12,
    "&:hover": {
      color: "grey",
    },
    cursor: "pointer",
  },
  backdrop: {
    minHeight: 500,
    margin: "auto",
    width: 512,
  },
  SignInContainer: {
    margin: "0 28px",
    padding: 28,
  },
  closeSignIn: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "black",
  },
  nike: {
    width: 50,
    height: 17,
  },
  formHeader: {
    padding: "30px 0",
    margin: " 0 auto",
    fontSize: "20px",
    maxWidth: "25ch",
    lineHeight: "26px",
    textAlign: "center",
    fontWeight: 700,
  },
  inputContainer: {
    margin: "15px 0",
  },
  input: {
    width: "100%",
    border: "1px solid #e5e5e5",
    borderRadius: 3,
    color: "#8d8d8d",
    height: "40px",
    lineHeight: 17,
    padding: "0 16px",
    outline: 0,
  },
  formSupport: {
    margin: "18px 0",
    color: "#8d8d8d",
    fontSize: "12px",
    display: "flex",
  },
  formSupportGrow: {
    flexGrow: 1,
    verticalAlign: "baseline",
  },
  forgotPassword: {
    color: "#8d8d8d",
    textDecoration: "none",
  },
  formTerm: {
    fontSize: 12,
    textAlign: "center",
    color: "#8d8d8d",
    maxWidth: 285,
    margin: "3px auto 24px",
  },
  buttonSignIn: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "black",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  facebookLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#4267B2",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  facebookContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    width: 190,
  },
  Imange: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  googleLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#DE5246",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  googleContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    width: 170,
  },
  joinUsContainer: {
    marginTop: 10,
    color: "#8d8d8d",
    fontSize: 12,
  },
  joinUs: {
    color: "black",
  },
  userMenuContainer:{
    padding:"24px 24px 24px 18px",
    position: "absolute",
    right:0,
    zIndex: 10,
    width: 200,
    fontSize: 14,
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "white"
  },
  userMenuHeader:{
    padding:"4px 8px",
    marginBottom:" 12px",
    fontSize: "16px",
    cursor: "pointer"
  },
  userMenuItem:{
    color:"#757575",
    padding:"4px 8px",
    cursor: "poiter",
    "&:hover": {
      color: "black",
    },
    width: "100%"
  },
  userIcon: {
    margin: 10,
    height: 28
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SignIn = (props) => {
  const classes = useStyles();
  let { open } = props;
  let { openSU } = props;
  let { isAdmin } = props;
  const [userMenu, setUserMenu] = useState(false);

  //   validation form
  const { register, handleSubmit, error } = useForm({
    mode: "onBlur",
  });
  // register giup chung ta validation
  //handleSubmit giupp ta lay duoc data tu input
  const onSubmitSignIn = (data, e) => {
    let form = document.getElementById("formSignIn")
    form.reset()
    // console.log(data);
    props.callAPILogin(data)
  };
  const onCloseSignIn = () => {}
  const onSubmitSignUp = (data,e) => {
    let form = document.getElementById("formSignIn")
    form.reset()
  };
  let { userLocal } = props;
  return (
    <div>
      {!userLocal && (
        <div>
          <span className={classes.nav1Menu}>Join Us</span>
          <span
            className={classes.nav1Menu}
            onClick={() => {
              props.emitOpen(!props.open);
            }}
          >
            Sign In
          </span>
          <Dialog
            open={open ? true : false}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              props.emitOpen(!props.open);
              onCloseSignIn();
            }}
            classes={{
              root: classes.backdrop,
            }}
          >
            <div className={classes.SignInContainer}>
              <IconButton
                className={classes.closeSignIn}
                onClick={() => {
                  props.emitOpen(!open);
                  onCloseSignIn();
                }}
              ></IconButton>
              {/* header */}
              <div>
                <center>
                  <img
                    src="https://www.nike.com/assets/experience/ciclp/landing-pages/static/v2/1494-4685d103b4e/static/icons/jordan.svg"
                    className={classes.nike}
                  />
                </center>
              </div>
              <div className={classes.formHeader}>
                YOUR ACCOUNT FOR EVERYTHING NIKE
              </div>
              {/*Form*/}
              <form id="formSignIn" onSubmit={handleSubmit(onSubmitSignIn)}>
                {/*Input*/}
                <div className={classes.inputContainer}>
                  <input
                    type="text"
                    placeholder="Email"
                    className={classes.input}
                    name="email"
                    {...register("email", {
                      required: "This input is required",
                      pattern: {
                        value: "",
                        message: "This input is number only.",
                      },
                      minLength: {
                        value: "",
                        message: "This input must exceed 10 characters",
                      },
                    })}

                    // {...register("email", { required: true },)}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={classes.input}
                    name="password"
                    // style={{ borderColor: errors.password && "red" }}
                    // ref={register({
                    //   required: true,
                    // })}
                    {...register("password", { required: true })}
                  />
                  {/* {errors.password && (
                    <p className={classes.inputValid}>
                      Please enter a password.
                    </p>
                  )} */}
                </div>
                {/*Support*/}
                <div className={classes.formSupport}>
                  <span className={classes.formSupportGrow}>
                    <input type="checkbox" style={{ margin: "0 15px 0 0" }} />
                    Keep me signed in
                  </span>
                  <span
                    className={classes.formSupportGrow}
                    style={{ textAlign: "right" }}
                  >
                    <a href="#a" className={classes.forgotPassword}>
                      Forgot password?
                    </a>
                  </span>
                </div>
                {/*Term*/}
                <div className={classes.formTerm}>
                  By logging in, you agree to Nike's{" "}
                  <a href="#a" style={{ color: "#8d8d8d" }}>
                    Privary Policy
                  </a>{" "}
                  and{" "}
                  <a href="#a" style={{ color: "#8d8d8d" }}>
                    Term of Use
                  </a>
                </div>
                {/*Sign In*/}
                <input
                  className={classes.buttonSignIn}
                  type="submit"
                  value="SIGN IN"
                />

                <center>
                  <b>OR</b>
                </center>

                {/*Sign In with FB or GG normal*/}
                <span className={classes.signInWithNormal}>
                  <button className={classes.facebookLink}>
                    <span className={classes.facebookContainer}>
                      Sign in with Facebook{" "}
                      <img
                        src="https://www.facebook.com/images/fb_icon_325x325.png"
                        className={classes.Imange}
                        alt=""
                      />
                    </span>
                  </button>
                  <button className={classes.googleLink}>
                    <span className={classes.googleContainer}>
                      Sign in with Google{" "}
                      <img
                        src="https://icons-for-free.com/iconfiles/png/512/app+global+google+plus+ios+media+social+icon-1320193328869704656.png"
                        className={classes.Imange}
                        alt=""
                      />
                    </span>
                  </button>
                </span>

                {/*Sign In with FB or GG mobile*/}
                <center className={classes.signInWithMobile}>
                  <a href="#a">
                    <img
                      src="https://www.facebook.com/images/fb_icon_325x325.png"
                      className={classes.Imange}
                      alt=""
                    />
                  </a>
                  <a href="#a">
                    <img
                      src="https://icons-for-free.com/iconfiles/png/512/app+global+google+plus+ios+media+social+icon-1320193328869704656.png"
                      className={classes.Imange}
                      alt=""
                    />
                  </a>
                </center>

                {/*Sign Up*/}
                <center className={classes.joinUsContainer}>
                  Not a member?{" "}
                  <a
                    className={classes.joinUs}
                    onClick={() => {
                      props.emitOpenSU(!props.openSU);
                      props.emitOpen(!props.open);
                      onCloseSignIn();
                    }}
                  >
                    Join Us
                  </a>
                </center>
              </form>
            </div>
          </Dialog>
          <Dialog
            open={openSU ? true : false}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              props.emitOpenSU(!props.openSU);
              onSubmitSignUp();
            }}
            classes={{
              root: classes.backdrop,
            }}
          >
            <div className={classes.SignInContainer}>
              <IconButton
                className={classes.closeSignIn}
                onClick={() => {
                  props.emitOpenSU(!props.openSU);
                  onSubmitSignUp();
                }}
              >
                <CloseIcon />
              </IconButton>
              <SignUp />
              {/* sign in  */}
              <center className={classes.joinUsContainer}>
                Already a Member?
                <a
                  className={classes.joinUs}
                  onClick={() => {
                    props.emitOpenSU(!props.openSU);
                    props.emitOpen(!props.open);
                    onSubmitSignUp();
                  }}
                >
                  Sign In
                </a>
              </center>
            </div>
          </Dialog>
        </div>
      )}
      {userLocal && (
        <div
        onMouseOver={() => setUserMenu(true)}
        onMouseLeave={() => setUserMenu(false)}
        >
          <span
          className={classes.nav1Menu}
          style={{display:"flex", alignItems:"center"}}
          >
            Hi, {userLocal.user.name}
          </span>
          {userMenu && (
            <div
            className={classes.userMenuContainer}
            >
              <div className={classes.userMenuHeader}>
                Account
              </div>
              <Link to="/user/profile" style={{textDecoration:"none"}}>
                <div className={classes.userMenuItem}>Profile </div>
              </Link>
              <Link to="/user/order" style={{textDecoration:"none"}}>
                <div className={classes.userMenuItem}>Orders </div>
              </Link>
              <Link to="/user/favorite" style={{textDecoration:"none"}}>
                <div className={classes.userMenuItem}>Favorites </div>
              </Link>
              <div className={classes.userMenuItem}>
                Inbox
              </div>
              <div className={classes.userMenuItem}>
                Event
              </div>
              <div className={classes.userMenuItem}>
                Account Setting
              </div>
              {
                localStorage.getItem("isAdmin") ?
                <Link to="/admin" style={{textDecoration:"none"}}>
                  <div className={classes.userMenuItem}>Admin Panel </div>
                </Link>
                :
                ""
              }
              <div className={classes.userMenuItem}
              onClick={() =>{
                props.logoutAction(userLocal)
              }}>
                  Log Out
              </div>
            </div> 
          )}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    open: state.reducerSignInSignUp.open,
    openSu: state.reducerSignInSignUp.openSU,
    userLocal: state.reducerSignInSignUp.user,
    isAdmin: state.reducerSignInSignUp.isAdmin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    emitOpen: (valueOpen) => {
      dispatch(action.emitOpenAction(valueOpen));
    },
    emitOpenSU: (valueOpenSU) => {
      dispatch(action.emitOpenSignUp(valueOpenSU));
    },
    logoutAction: (userLocal) => {
      dispatch(action.emitOpenSignUp({ type: LOGOUT, payload: null }));
      alert(`goodbye ${userLocal.user.name}`);
      localStorage.removeItem("user");
      localStorage.removeItem("userFavor");
      localStorage.removeItem("cart");
    },
    callAPILogin: (data) => {
      dispatch(action.fetchApiLoginUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
