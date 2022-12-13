import { json } from "react-router-dom";
import * as ActionsType from "../Contants/contants";
const cartLocal = JSON.parse(localStorage.getItem("cart"));
const userFavor = JSON.parse(localStorage.getItem("userFavor"))
const initialState = {
    products: cartLocal || [],
    productFavor: userFavor || [],
}
const checkDuplicate = (payload, arr) => {
    for (const item of arr) {
        if (
            item.id === payload.id &&
            item.color === payload.color &&
            item.size === payload.size
        ) {
            return item
        }
    }
    return null
}

const checkDuplicateFavor = (payload) => {
    for (const data of userFavor) {
        if (
            data?.name === payload.name &&
            data?.color === payload.color &&
            data?.size === payload.size
        ) {
            return data
        }
    }
    return null
}
const reducerCart = (state = initialState, { type, payload }) => {
    let productsCopy = [...state.products]
    let productFavorCopy = [...state.productFavor]
    switch (type) {
        case ActionsType.ADD_TO_CARD:
            const itemAdd = checkDuplicate(payload, productsCopy)
            if (itemAdd) {
                itemAdd.quantity += 1
            } else {
                productsCopy = [...productsCopy, payload]
            }
            state.products = productsCopy
            localStorage.setItem("cart", JSON.stringify(state.products))
            break;
        case ActionsType.REMOVE_TO_CARD:
            const itemRemove = checkDuplicate(payload, productsCopy)
            const index = productsCopy.findIndex((item) => {
                return item.id === itemRemove.id
            })
            if (itemRemove.quantity > 1) {
                itemRemove.quantity -= 1
            } else {
                productsCopy.splice(index, 1)
            }
            state.products = productsCopy
            localStorage.setItem("cart", JSON.stringify(state.products))
            break
        default:
            break;
    }
    return { ...state }
}
export default reducerCart