import { combineReducers } from "redux";
import reducerCart from "../../components/Cart/Module/Reducer/reducer";
import reducerURL from "../../components/ListProduct/module/reducer/reducer";
import reducerSignInSignUp from "../../components/Navbar/NavMainComponents/Redux/Reducers/reducers"
import reducerOrder from "../../components/User/UserOrder/module/Reducers/reducer"
const rootReducer = combineReducers({
  reducerURL,
  reducerCart,
  reducerSignInSignUp,
  reducerOrder
});
export default rootReducer;
