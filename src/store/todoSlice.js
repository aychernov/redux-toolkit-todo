import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
		'todos/fetchTodos',
		async function (_, {rejectWithValue,}) {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
				const data = response.json()
				return data
				if (!response.ok) {
					throw new Error(`Server error! ${response.status}`)
				}
			} catch (error) {
				return rejectWithValue(error.message)
			}

		}
)

export const deleteTodo = createAsyncThunk(
		'todos/deleteTodo',
		async function (id, {rejectWithValue, dispatch}) {
			try {
				const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
					method: 'DELETE'
				})
				console.log(response)
				if (!response.ok) {
					throw new Error('Can`t delete task. Server error.')
				}
				dispatch(removeTodo(id))
			} catch (error) {
				return rejectWithValue(error.message)
			}
		}
)

export const toggleStatus = createAsyncThunk(
		'todos/toggleStatus',
		async function (id, {rejectWithValue, dispatch, getState}) {
			const todo = getState().todos.todos.find(todo => todo.id === id)
			try {
				const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						completed: !todo.completed,
					})
				})
				if (!response.ok) {
					throw new Error('Can`t toggle status task. Server error.')
				}
				dispatch(toggleCheck(id))
			} catch (error) {
				return rejectWithValue(error.message)
			}
		}
)

export const addNewTodo = createAsyncThunk(
		'todos/addNewTodo',
		async function (text, {rejectWithValue, dispatch}) {
			try {
				const todo = {
					title: text,
					userId: 1,
					completed: false
				}
				const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(todo)
				})
				if (!response.ok) {
					throw new Error('Can`t add new task. Server error.')
				}

				const data = await response.json()
				dispatch(addTodo(data))
				console.log(data)
			} catch (error) {
				return rejectWithValue(error.message)
			}
		}
)

const initialState = {
	todos: [],
	status: null,
	error: null
}
const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload
}

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo(state, action) {
			state.todos.push(action.payload)
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload)
		},
		toggleCheck(state, action) {
			const toggledTodo = state.todos.find(todo => todo.id === action.payload)
			toggledTodo.completed = !toggledTodo.completed
		}
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleStatus.rejected]: setError,
		[addNewTodo.rejected]: setError,
	}

})

const {addTodo, removeTodo, toggleCheck} = todoSlice.actions
export const todoReducer = todoSlice.reducer
