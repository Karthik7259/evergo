import { createSlice } from "@reduxjs/toolkit";

const initialvalue={
  
    _id:"",
    name:"",
    email:"",

}

const userSlice=createSlice({
    name:"user",
   initialState: initialvalue,
    reducers:{
        setUserDetails : (state,action) =>{
            state = { ...action.payload };
        }
    }
})


export const setUserDetails = userSlice.actions

export default userSlice.reducer;