import { json } from "react-router-dom";
import API from "../../../../Axios/API";
import * as ActionType from "../Contants/contants"
export const createAction = ({ type, payload }) => {
    return {
        type,
        payload
    }
}
export const postAPIcart = (data, token, navigate) => {
    return async (dispatch) => {
        try {
            const res = await API("cart/create", "POST", data, token);
            setTimeout(() => {
                alert("success")
                localStorage.removeItem("cart")
                navigate("/user/order")
                dispatch(createAction({ type: ActionType.RESET_CARD, payload: [] }))
            }, 2000);
        } catch (error) {
            alert('error')
            console.log({ ...error });
        }
    }
}


export const postFavorAPICart = () => {
    return async () => {
        try {
            const userLocal = JSON.parse(localStorage.getItem("user"))
            const { token } = userLocal;
            const userFavor = JSON.parse(localStorage.getItem("userFavor"))
            if (userFavor === null) {
                const res1 = await API(
                    "/users/addUpdateFavorite",
                    "POST",
                    { productsFavorite: [] },
                    token
                )
            } else {
                const res2 = await API(
                    "/users/addUpdateFavorite",
                    "POST",
                    { productsFavorite: userFavor },
                    token
                )
            }

        } catch (error) {
            alert("error")
        }
    }
}