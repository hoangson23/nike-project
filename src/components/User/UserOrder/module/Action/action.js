import API from "../../../../../Axios/API";
import * as ActionTypeLogin from '../../../../Navbar/NavMainComponents/Redux/Contansts/contants'

export const createAction = ({type, payload}) =>{
    return {
        type, 
        payload
    }
}
export cancelAPIORDER = (data, token) =>{
    return async (dispatch) => {
        try{
            const res = await API(`cart/delete`, "DELETE", {_id:data}, token)
            alert("CANCEL ORDER ID" + data)
        }catch{
            console.log({...error});
            alert("FAIL TO CANCEL ORDER")
        }
    }
}
export updateProfileAPI = (data, token) => {
    return async (dispatch) => {
        try{
            const res = await API(`users/update`, "PUT", data, token)
            const dataLogin = {
                email = data.email,
                passsword = data.passsword
            }
            const resLogin = await API(`users/login`, "POST", dataLogin)
            dispatch(
                createAction({type: ActionTypeLogin.FETCH_API_LOGIN, payload: resLogin.data })
            )
            localStorage.getItem("user", JSON.stringify(resLogin.data))
            alert("Update profile success")
        }catch(err){
            console.log({...err});
            alert("Fail to update profile")
        }
    }
}