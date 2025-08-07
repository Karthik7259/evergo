import { createSlice } from "@reduxjs/toolkit";


const initialvalue = {
    allCategory:[],
    subCategory : [],
    product : [],

}


const productSlice = createSlice({
    name: "product",
    initialState: initialvalue,
    reducers: {
        setAllCategory : (state,action) => {
            state.allCategory = [...action.payload];
        }


        }
    
})
 
export const { setAllCategory } = productSlice.actions;

export default productSlice.reducer;