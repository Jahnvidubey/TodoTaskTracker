import { useState, useEffect } from "react";
import './App.css'
import axios from 'axios'
import Table2 from './components/Table2'
import TodoForm from './components/TodoForm'

function App() {

  const [todos, setTodos] = useState('')
  const [isLoading, setisLoading] = useState(true)

  useEffect( () => {
    fetchData()
    console.log(todos);
  },[])


  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/todo/')
      setTodos(response.data)
      setisLoading(false)

    } catch (error){
      console.log(error);
    }
  }

  return(
    <div className=" bg-white min-h-screen">
      
      {/* bg-amber-50 */}
      <nav className="pt-8">
      {/* <h1 className="text-5xl text-black text-center pb-12">Daily Agenda</h1> */}
      </nav>
      <TodoForm
      setTodos={setTodos}
      fetchData={fetchData}
      />
      <Table2
        todos = {todos}
        setTodos = {setTodos}
        isLoading = {isLoading}
      />
    </div>
  )
}

export default App