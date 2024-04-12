import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import axios from 'axios';
import './SingleDate.css';

const SingleDate = ({ day, weekName, appIndex, totalTodo, fetchTodo }) => {
  const [todoInput, setTodoInput] = useState('');
  const [allTodos, setAllTodos] = useState([]);

  let curr = new Date();
  let today = Number(curr.toString().split(' ')[2]);
  let Numday = day.split('-')[2];

  function getInput(e) {
    setTodoInput(e.target.value);
  }

  const fetchTodoSingle = () => {
    let x = totalTodo.filter((item) => item.date === day);
    setAllTodos(x);
  };

  useEffect(() => {
    fetchTodoSingle();
  }, [totalTodo]);

  useEffect(() => {
    setTodoInput('');
  }, [allTodos]);

  const handleSubmit = () => {
    axios
      .post('http://localhost:3001/todos', {
        date: day,
        data: todoInput,
        done: false,
      })
      .then((response) => {
        console.log('Todo added successfully:', response.data);
        setAllTodos([...allTodos, response.data]);
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete('http://localhost:3001/todos/' + id)
      .then((response) => {
        console.log('Todo deleted successfully:', response.data);
        fetchTodo();
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  const editTodo = (id, updatedTodo) => {
    axios
      .put('http://localhost:3001/todos/' + id, {
        ...updatedTodo,
        done: true,
      })
      .then((response) => {
        console.log('Todo added successfully:', response.data);
        fetchTodo();
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  console.log(Numday === today);

  return (
    <div className='mainSingleDateDiv'>
      <div className='dateDiv'>
        <h3 className={Numday == today ? 'colorDayName' : ''}>
          {weekName[appIndex]}
        </h3>
        <h3 className={Numday == today ? 'dateValue' : 'NondateValue'}>
          {day.split('-')[2]}
        </h3>
      </div>
      <div>
        {allTodos?.map((todo) => {
          return (
            <div className={todo.done ? 'markedTodo' : 'singleTodoItem'}>
              <div>{todo.data}</div>
              <div>
                <div
                  className='deleteIcon'
                  onClick={() => deleteTodo(todo.id)}
                >
                  <MdDeleteForever
                    style={{ height: '25px', width: '25px' }}
                  />
                </div>
                <div
                  className='EditIcon'
                  onClick={() => editTodo(todo.id, todo)}
                >
                  <IoCheckmarkDoneCircle
                    style={{ height: '25px', width: '25px' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {today <= Numday ? (
        <div className='inputDiv'>
          <input
            style={{ backgroundColor: 'beige' }}
            type='text'
            placeholder='Type your tasks and hit enter'
            onChange={getInput}
            value={todoInput}
            onKeyPress={handleKeyPress}
          ></input>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SingleDate;
