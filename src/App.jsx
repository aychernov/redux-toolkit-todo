import './App.css'
import {useEffect, useState} from "react";
import {TodoList} from "./components/TodoList.jsx";
import {InputField} from "./components/InputField.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, fetchTodos} from "./store/todoSlice.js";
import {decrementCount, incrementCount} from "./store/countSlice.js";

function App() {
	const [text, setText] = useState('')
	const {status, error} = useSelector(state => state.todos)
	const {count} = useSelector(state => state.count)
	const dispatch = useDispatch()

	const addCount = () => {
		dispatch(incrementCount({count}))
	}
	const minusCount = () => {
		if(count === 0) return
		dispatch(decrementCount({count}))
	}


	const addTask = () => {
		if(text.trim().length){
			dispatch(addNewTodo(text))
			setText('')
		}

	}

	useEffect(()=> {
		dispatch(fetchTodos())
	},[dispatch])

	return (
			<div className="App">
				<InputField text={text} handleInput={setText} handleSubmit={addTask}/>
				{status === 'loading' && <h2>Loading...</h2>}
				{error && <h2>An error occurred: {error} </h2>}
				<TodoList/>
				<div>Count: {count} </div>
				<button onClick={addCount}>+</button>
				<button onClick={minusCount}>-</button>
			</div>
	)
}


export default App
