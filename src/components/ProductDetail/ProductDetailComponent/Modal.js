import React from 'react'
import PropTypes from "prop-types"
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal';
import { Alert, Backdrop, Grid, Typography } from '@mui/material';
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: "none",
    height: 400,
    width: 500
  },
  img: {
    width: 200,
    height: 200
  },
  alert: {
    marin: "10px 0px"
  },
  iconClose: {
    cursor: "pointer"
  },
  checkOut: {
    padding: "20px 16px"
  },
  checkOutButton: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    marginBottom: 12
  }
}))
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: open ? 1 : 0
    },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })
  return (
    <animated.div ref={ref} style={style}{...other} >
      {children}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
}
const ModalTranstion = (
  { open,
    handleOpen,
    handleClose,
    productDispatch,
  }
) => {
  const classes = useStyles();
  const navigate = useNavigate();
  setTimeout(() => {
    handleClose()
  }, 10000)
  const products = useSelector(state => state.reducerCart.products)
  const sumQuantity = products.reduce((sum, item) => {
    return sum + item.quantity
  }, 0)
  return (
    <>
      <Modal
        className={classes.modal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        open={open}
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}

      >
        <Fade in={open}>
          <div className={classes.paper} >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={11}>
                <Alert security='success' className={classes.alert} >
                  Add To bag
                </Alert>
              </Grid>
              <Grid item xs={1}>
                <CloseIcon
                  className={classes.iconClose}
                  onClick={handleClose}
                />
              </Grid>

              <Grid item xs={6}>
                <img src={productDispatch.img}
                  className={classes.img}

                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6' component="h6" >
                  {productDispatch.name}
                </Typography>
                <Typography variant='p' component="p" >
                  {productDispatch.message}
                </Typography>
                <Typography variant='p' component="p" >
                  size  {productDispatch.name}
                </Typography>
                <Typography variant='inherit' component="span" >
                  {productDispatch.price.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <div className={classes.checkOut}>
                  <button className={classes.checkOutButton}
                    onClick={() => {
                      navigate("/cart")
                    }}
                  >
                    view bag({sumQuantity})
                  </button>
                </div>
              </Grid>
              <Grid item xs={6} >
                <button className={classes.checkOutButton}
                  onClick={() => {
                    navigate("/cart")
                  }}
                >
                 Checkout
                </button>
              </Grid>




            </Grid>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default ModalTranstion