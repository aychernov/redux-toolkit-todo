import {createSlice} from "@reduxjs/toolkit";

const countSlice = createSlice({
	name: 'count',
	initialState: {
		count: 0,
	},
	reducers: {
		incrementCount(state){
			state.count++
		},
		decrementCount(state){
			state.count--
		},
	}
})


export const {incrementCount, decrementCount} = countSlice.actions
export const countReducer = countSlice.reducer
