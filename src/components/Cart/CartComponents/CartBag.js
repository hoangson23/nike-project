import React from "react";
import { withStyles, makeStyles } from "@mui/styles";
import { padding } from "@mui/system";
import {
  Hidden,
  FormControl,
  InputBase,
  MenuItem,
  NativeSelect,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../Module/Action/action";
import * as ActionType from "../Module/Contants/contants";
const useStyles = makeStyles((theme) => ({
  CartBar: {
    marginBottom: 16,
  },
  Product: {
    display: "flex",
    clear: "both",
    padding: "24px 8px",
    borderBottom: " 1px #cccccc solid",
  },
  ProductImageContainer: {
    padding: 16,
  },
  ProductImage: {
    width: "150px",
    height: "150px",
    marginRight: 10,
  },
  ProductDetail: {
    width: "100%",
    lineHeight: 1.75,
  },
  productName: {
    textDecoration: "none",
    color: "black",
  },
  Price: {
    float: "right",
  },
  SubDetail: {
    color: "#757575"
  },
  SelectContainer: {
    display:"flex",
    alignItems:"baseline",
  },
  SelectFormContainer: {
    display:"flex",
    marginRight:10,
    alignItems: "center"
  },
  CartItemAction: {
    marginTop: 16,
    color: "#757575"
  },
  CartItemActionButton: {
    marginRight: 16,
    textDecoration: " underline",
    cursor: "pointer",
    "&:hover":{
      opacity: 0.7
    },
    MoreoptionsMobile:{
      marginTop: 36,
      width: "100%",
      color: "black",
      backgroundColor: "white",
      padding: "8px 24px",
      borderRadius: 20,
      outline: 0,
      border: "1px #cccccc solid",
      fontSize: 16,
      cursor: "pointer",
      lineHeight: 1.75
    }
  },
}));
const CustomSelect = withStyles((theme) => ({
  input: {
    fontSize: 16,
    color: "#757575",
    padding: "0px 12px",
    lineHeight: "inherit",
  },
}))(InputBase);

const CartBag = () => {
  const classes = useStyles();
  const products = useSelector((state) => state.reducerCart.products);
  const Qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const openMoreOptions = () => {
    let moreOption = document.getElementById("MoreOptionsContainer");
    React.ReactDOM.findDOMNode(moreOption).style.display = "block";
  };
  const [itemProduct, setItemProduct] = React.useState("");
  const dispatch = useDispatch();
  const handleChangeSize = (event) => {
    const { value } = event.target;
    const payload = {
      item: itemProduct,
      size: value,
    };
    dispatch(
      Action.createAction({
        type: ActionType.UPDATE_SIZE_COLOR,
        payload: payload,
      })
    );
  };
  //
  const handleChangeQuantity = (event) => {
    const { value } = event.target;
    const payload = {
      item: itemProduct,
      quantity: value,
    };
    dispatch(
      Action.createAction({
        type: ActionType.UPDATE_SIZE_COLOR,
        payload: payload,
      })
    );
  };
  return (
    <div className={classes.CartBar}>
      {/* product */}
      {products &&
        products.map((item, key) => {
          return (
            <div className={classes.Product} key={key}>
              <div className={classes.ProductImageContainer}>
                <img className={classes.ProductImage} src={item.img} alt="" />
              </div>
              <div className={classes.ProductDetail}>
                <div className={classes.productName}>{item.name}</div>
                <div className={classes.Price}>
                  {item.price.toLocaleString()}đ
                </div>
                <div className={classes.SubDetail}>
                  <div>Men's Shoes</div>
                  <div>White/ Black/ Custom Clay/White</div>
                  <div className={classes.SelectContainer}>
                    <span className={classes.SelectFormContainer}>Size</span>
                    <FormControl>
                      <NativeSelect
                        input={
                          <CustomSelect
                            onChange={handleChangeSize}
                            onClick={() => {
                              setItemProduct(item);
                            }}
                          />
                        }
                      >
                        {item.sizes.map((i, key) => {
                          return (
                            <option
                              selected={item.size === i.size ? "selected" : ""}
                              value={i.size}
                              key={key}
                            >
                              {i.size}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </div>
                  <div className={classes.SelectFormContainer}>
                    Quantity
                    <FormControl>
                      <NativeSelect
                        input={
                          <CustomSelect
                            onChange={handleChangeQuantity}
                            onClick={() => {
                              setItemProduct(item);
                            }}
                          />
                        }
                      >
                        {Qty.map((i, key) => {
                          return (
                            <option
                              selected={
                                item.quantity === i.size ? "selected" : ""
                              }
                              key={key}
                              value={i}
                            >
                              {i}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </div>
                </div>
              </div>
              <Hidden xsDown>
                <div className={classes.CartItemAction}>
                  <div
                    className={classes.CartItemActionButton}
                    onClick={() => {
                      dispatch(
                        Action.createAction({
                          type: ActionType.REMOVE_TO_CARD_FAVOR,
                          payload: item,
                        })
                      );
                      dispatch(Action.postFavorAPICart());
                    }}
                  >
                    Move To Favorites
                  </div>
                </div>
                <div className={classes.CartItemAction}>
                  <div
                    className={classes.CartItemActionButton}
                    onClick={() => {
                      dispatch(
                        Action.createAction({
                          type: ActionType.REMOVE_TO_CARD,
                          payload: item,
                        })
                      );
                      dispatch(Action.postFavorAPICart());
                    }}
                  >
                    Remove
                  </div>
                </div>
              </Hidden>
              <Hidden smUp>
                <button
                  className={classes.MoreoptionsMobile}
                  onClick={() => {
                    openMoreOptions();
                  }}
                >
                  More Options
                </button>
              </Hidden>
            </div>
          );
        })}
    </div>
  );
};

export default CartBag;
