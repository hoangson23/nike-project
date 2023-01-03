import React, { useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Container, Drawer, Grid, Hidden } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CartBag from './CartComponents/CartBag'
import CartFavorite from './CartComponents/CartFavorite'
import CartSumary from './CartComponents/CartSumary'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReactDOM } from 'react'
import * as action from './Module/Action/action'
import Paypal from '../Paypal/Paypal'

const useStyles = makeStyles((theme) =>({
  Container: {
    margin: "40px 0",
  },
  Cart: {
    width: 1100,
    margin: "0px auto",
    fontSize: 16
  },
  BagMobile: {
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.75
  },
  Bag: {
    fontSize: 22
  },
  NumberItems: {
    color: "#757575"
  },
  PromoCode: {

  },
  CloseIcon: {

  },
  PromoCodeTitle: {

  },
  CheckOutMobileContainer: {
    width: "100%",
    padding: '16px 0px',
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white"
  },
  checkOutButton: {
    width: "100%",
    color: 'white',
    backgroundColor: 'black',
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1.75

  },
  MemberCheckoutContainer: {
    padding: 24
  },
  MoreOptionButton: {
    width: "100 %",
    color: "white",
    backgroundColor: 'black',
    padding: '18px  24px',
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 1.75
  },
  MoreOptionsContainer: {

  }

}))

const Cart = (props) => {
  const classes = useStyles()
  const [PromoCode, setPromoCode] = useState(true)
  const products = useSelector(state => state.reducerCart.products)

  const cancelMoreOptions = () => {
    let moreOption = document.getElementById("MoreOptionsContainer");
    ReactDOM.findDOMNode(moreOption).style.display = 'none'
  }
  const sumMoney = products.reduce((sum, item) => {
    return sum + item.quantity * item.price
  }, 0)
  const { window } = props
  const container = window !== undefined ? () => window().document.body : undefined

  const [checkout, setCheckout] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkOut = () => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      alert("please sign in before checkout")
    } else {
      if (products.length > 0) {
        setCheckout(true)
      } else {
        alert("please buy product before checkout")
      }
    }
  }
  const transactionSuccess = (data) => {
    alert("payment success")
    const userLocal = JSON.parse(localStorage.getItem("user"))
    const { token } = userLocal
    const object = {
      products: products,
      isPayed: false,
      description: "Payment on delivery"
    }
    dispatch(action.postAPIcart(object, token, navigate))
  }
  const transactionLive = () => {
    for (const item of products) {
      delete item.sizes
      delete item.message
    }
    const userLocal = JSON.parse(localStorage.getItem("user"))
    const { token } = userLocal

    const object = {
      products: products,
      isPayed: false,
      description: "Payment on delivery"
    }
    dispatch(action.postAPIcart(object, token, navigate))

  }
  const transactionError = () => {
    setTimeout(() => {
      alert("Payment fail")
    }, 2000)
  }
  const transactionCancel = (data) => {
    console.log("error", data);
  }
  const convertVNDtoUSD = () => {
    return (sumMoney / 23000).toFixed(2)
  }
  return (
    <div className={classes.container}>
      <Container maxWidth="xl" >
        <div className={classes.Cart}>
          <Hidden mdUp>
            <div className={classes.BagMobile}>
              <div className={classes.Bag}>Bag</div>
              <div >
                <span className={classes.NumberItems} >2 Item | </span> {sumMoney.toLocaleString()}đ
              </div>
            </div>
          </Hidden>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              {PromoCode &&
                <div className={classes.PromoCode} >
                  <div className={classes.CloseIcon} onClick={() => setPromoCode(!PromoCode)}>
                    <CloseIcon />
                  </div>
                  <div className={classes.PromoCodeTitle} >HAVE A PROMO CODE ?</div>
                  <div >If you have a promo code you will be able to apply it on the payment page during checkout.
                  </div>
                </div>
              }
              <Hidden smDown>
                <div className={classes.Bag}>BAG</div>
              </Hidden>
              {/* BAG */}
              <CartBag />
            </Grid>
            <Grid item md={4} xs={12} >
              <CartSumary />
            </Grid>
          </Grid>
          {/* Favorite */}
          <CartFavorite />
        </div>
      </Container>
      {/* checkout button mobile */}
      <Hidden mdUp >
        <div className={classes.CheckOutMobileContainer} >
          <div style={{ margin: '0 12px' }}>
            <button className={classes.checkOutButton} onClick={() => checkOut()}>
              Go to Checkout
            </button>
          </div>
        </div>
        <Drawer
          container={container}
          variant="temporary"
          anchor='bottom'
          open={checkOut ? true : false}
          onClose={() => { setCheckout(false) }}
          ModalProps={{
            keepMounted: true,
          }}

        >
          <div className={classes.MemberCheckoutContainer} >
            <Paypal 
            sum={convertVNDtoUSD()}
            transactionSuccess={transactionSuccess}
            transactionCancel={transactionCancel}
            transactionError={transactionError}
            />
            <button className={classes.moreOptionButton} onClick={transactionLive}>
              Member Checkout
            </button>

          </div>
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <div id="MoreOptionsContainer" className={classes.MoreOptionsContainer}>
          <button className={classes.MoreOptionButton}>Move to Favorité</button>
          <button className={classes.MoreOptionButton}>Remove</button>
          <button className={classes.MoreOptionButton}
            onClick={() => cancelMoreOptions()}
          >Cancel</button>

        </div>
      </Hidden>
    </div>
  )
}

export default Cart