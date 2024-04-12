import { useEffect, useState } from 'react';
import './App.css';
import SingleDate from './components/SingleDate';
import axios from 'axios';
import { GiFastBackwardButton } from 'react-icons/gi';
import { GiFastForwardButton } from 'react-icons/gi';

function App() {
  const [week, setWeek] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [totalTodo, setTotalTodo] = useState([]);
  const weekName = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  function fetchWeek() {
    let curr = new Date();
    curr.setDate(curr.getDate() + selectedWeek * 7);
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    setWeek(week);
  }

  const fetchTodo = () => {
    axios
      .get('http://localhost:3001/todos')
      .then((response) => {
        setTotalTodo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    fetchWeek();
  }, [selectedWeek]);

  const goToPreviousWeek = () => {
    setSelectedWeek(selectedWeek - 1);
    fetchTodo();
  };

  const goToNextWeek = () => {
    setSelectedWeek(selectedWeek + 1);
    fetchTodo();
  };

  return (
    <div className='App'>
      <h1>To Do App</h1>
      <div className='buttonsDiv'>
        <div onClick={goToPreviousWeek} className='btnInsideDiv'>
          <GiFastBackwardButton className='prvButton' />
          <label>Previous Week</label>
        </div>
        <div onClick={goToNextWeek} className='btnInsideDiv'>
          <GiFastForwardButton className='prvButton' />
          <label>Next Week</label>
        </div>
      </div>
      <div className='weekDayDiv'>
        {week?.map((day, index) => {
          return (
            <div>
              <SingleDate
                day={day}
                weekName={weekName}
                appIndex={index}
                totalTodo={totalTodo}
                fetchTodo={fetchTodo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
