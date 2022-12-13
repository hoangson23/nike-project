import * as ActionType from "../Contansts/contants"
import API from "../../../../../Axios/API"
import { json } from "react-router-dom"

export const emitOpenAction = (open) => {
    return {
        type: ActionType.REDUX,
        data: open
    }
}
export const emitOpenSignUp = (openSU) => {
    return {
        type: ActionType.SIGNUP,
        data: openSU
    }
}
export const createAction = ({ type, payload }) => {
    return {
        type,
        payload
    }
}
export const fetchApiLoginUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await API("users/login", "POST", data);
            dispatch(
                createAction({ type: ActionType.FETCH_API_LOGIN, payload: res.data })
            )
            if (res.data.user.userType === 'admin') {
                dispatch(createAction({ type: ActionType.SET_ADMIN, payload: true }))
                localStorage.setItem("isAdmin", true)
            } else {
                localStorage.removeItem("isAdmin")
            }
            localStorage.setItem("user", JSON.stringify(res.data))
            alert(res.data.messager)
            const userLocal = JSON.parse(localStorage.getItem("user"))
            const favorLocal = userLocal?.user.productsFavorite
            localStorage.setItem("userFavor", JSON.stringify(favorLocal))
        } catch (error) {
            alert("Login Fail")
        }
    }
}


export const fetchAiSignUpUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await API("users/create", "POST", data)
            dispatch(emitOpenAction({ type: ActionType.REDUX, data: true }))
            dispatch(emitOpenSignUp(false))
        } catch (error) {
            alert(error.response.data.error)
            console.log("error");
        }
    }
}