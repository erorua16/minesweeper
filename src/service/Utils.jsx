import { appProvider } from "../reducer/AppProvider";
import React from "react";
const GetUsersInLocalStorage=()=>{
    const { dispatch, state } = React.useContext(appProvider);
    if(localStorage.getItem("minesweeper")){
        var userLevel =JSON.parse(localStorage.getItem("minesweeper"))
    }else{
        localStorage.setItem("minesweeper",JSON.stringify(state.user_level))
    }
  React.useEffect(()=>{
    if(userLevel){
     dispatch({ type: "SET_USER_LEVEL", payload: userLevel });
     }
     console.log('he he')
  },[])  

}
const Utils = {
  GetUsersInLocalStorage,
};
export default Utils;
