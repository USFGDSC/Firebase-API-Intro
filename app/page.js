"use client"
import styles from './page.module.css'
import { FaClipboardList } from "react-icons/fa6";
import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch tasks from Firestore when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/get-tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setTasks(data.tasks); // Assuming data.tasks is an array of {id, task}
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks(); // Call the function to fetch tasks on component mount
  }, []);

  const handleAddTask = async () => {
    if (inputValue.trim()) {
      try {
        const response = await fetch('/api/add-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: inputValue }),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log('Task added:', data);
          // Update the tasks array to include both task text and id
          setTasks([...tasks, { id: data.id, task: inputValue }]);
          setInputValue(''); // Clear input after adding
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/delete-task?id=${taskId}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Task deleted:', data);
        setTasks(tasks.filter(task => task.id !== taskId)); // Use id from the tasks array
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.todo}>
        <h2>To-Do List<FaClipboardList /></h2>
        <div className={styles.row}>
          <input 
            type="text" 
            placeholder="Enter a task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTask(); // Call the add task function when Enter is pressed
              }
            }}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>

        <div className={styles.tasksContainer}>
          {tasks.map((task) => (
            <button key={task.id} className={styles.taskButton} onClick={() => handleDeleteTask(task.id)}>
              {task.task}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
