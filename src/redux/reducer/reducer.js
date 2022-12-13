import { combineReducers } from "redux";
import reducerCart from "../../components/Cart/Module/Reducer/reducer";
import reducerURL from "../../components/ListProduct/module/reducer/reducer";
import reducerSignInSignUp from "../../components/Navbar/NavMainComponents/Redux/Reducers/reducers"
const rootReducer = combineReducers({
  reducerURL,
  reducerCart,
  reducerSignInSignUp
});
export default rootReducer;
