import { createSlice } from "@reduxjs/toolkit";


const initialvalue = {
    allCategory:[],
    allsubCategory : [],
    product : [],

}


const productSlice = createSlice({
    name: "product",
    initialState: initialvalue,
    reducers: {
        setAllCategory : (state,action) => {
            state.allCategory = [...action.payload];
        },
        setAllSubCategory : (state,action) => {
            state.allsubCategory = [...action.payload];
        }


        }
    
})
 
export const { setAllCategory,setAllSubCategory } = productSlice.actions;

export default productSlice.reducer;