import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./todoSlice";
import {countReducer} from "./countSlice.js";

export default configureStore({
	reducer: {
		todos: todoReducer,
		count: countReducer
	}
})

