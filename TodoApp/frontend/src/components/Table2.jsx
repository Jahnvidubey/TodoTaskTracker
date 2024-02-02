import React, { useState } from 'react'
import { MdOutlineDeleteOutline, MdEdit, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import axios from 'axios'

const Table2 = ({ todos, setTodos, isLoading }) => {
  
  const [editText, setEditText] = useState({
    'body': '',
    'id': null,
  });

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:8000/todo/${id}/`)
      const newList = todos.filter(todo => todo.id !== id)
      setTodos(newList)
    } catch (error){
      console.log(error);
    }
  }

  const handleEdit = async (id, value) => {
    try{
      const response = await axios.patch(`http://127.0.0.1:8000/todo/${id}/`,value)
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodos)
    } catch (error){
      console.log(error);
    }
  }


  const handleChange = (e) => {
    setEditText(prev => ({
      ...prev,
      'body': e.target.value
    }))
    console.log(editText);
  }
  const handleCheckbox = (id, value) => {
    handleEdit( id, {
      'completed': !value
    })
  }



  const handleClick = async () => {
    handleEdit(editText.id, editText);
    setEditText(prev => ({ 'body': '' }));
  };
  

  return (
    <>
        <div className="flex flex-row justify-center items-center rounded shadow-lg text-gray-800">
  <div className="px-6 py-4 ">
    <table className='w-11/12 max-w-4xl mx-auto mt-8 text-gray-800'>
      <thead className='border-b-2 border-gray-800'>
        <tr>
          <th className='p-3 text-sm text-black font-semibold tracking-wide text-left'>Check</th>
          <th className='p-3 text-sm text-black font-semibold tracking-wide text-left'>Todo</th>
          <th className='p-3 text-sm text-black font-semibold tracking-wide text-left'>Status</th>
          <th className='p-3 text-sm text-black font-semibold tracking-wide text-left'>Data created</th>
          <th className='p-3 text-sm text-black font-semibold tracking-wide text-left'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan="5" className="text-center">Is Loading</td>
          </tr>
        ) : (
          todos.map((todoItem, index) => (
            <tr key={todoItem.id} className='border-b border-gray-800'>
              <td className='p-3' title={todoItem.id}>
                <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)} 
                  className='inline-block cursor-pointer'>{todoItem.completed ? <MdOutlineCheckBox/> : 
                  <MdOutlineCheckBoxOutlineBlank/>}</span>
              </td>
              <th className='p-3 text-sm text-black'>{todoItem.body}</th>
              <td className='p-3 text-sm text-center'>
                <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-lime-500' : 'bg-red-300'}`}>
                  {todoItem.completed ? 'Done' : 'Incompleted' }
                </span>
              </td>
              <td className='p-3 text-sm text-black'>{new Date(todoItem.created).toLocaleString()}</td>
              <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5'>
                <span className='text-xl cursor-pointer'>
                  <label htmlFor="my_modal_6" className="btn"><MdEdit onClick={() => setEditText(todoItem)} /></label>
                </span>
                <span className='text-xl cursor-pointer'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)}/></span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <input type="checkbox" id="my_modal_6" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box bg-gray-200">
        <h3 className="font-bold text-lg text-gray-800">Edit Todo</h3>
        <input type="text" placeholder="Type here" value={editText.body} onChange={handleChange} className="input input-bordered w-full mt-8 max-w-xs" />
        <div className="modal-action">
          <label htmlFor="my_modal_6" onClick={handleClick} className="btn btn-primary">Edit</label>
          <label htmlFor="my_modal_6" className="btn">Close!</label>
        </div>
      </div>
    </div>
  </div>
</div>
</>
   
  )
}

export default Table2
