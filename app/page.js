// write use client because using useState and useEffect from react which requires a browser environment
import styles from './page.module.css'
import { FaClipboardList } from "react-icons/fa6";
import { useState, useEffect } from 'react';

export default function Home() {
  // write variables for input value and tasks
  

  // Write useEffect to fetch tasks from Firestore when the component mounts
  
  
  // Write addTask function to call API route and add a new task to Firestore
  

  // Write deleteTask function to call API route and delete a task from Firestore
  

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
                // Call the add task function when Enter is pressed
              }
            }}
          />
          {/* Add a button to call the addTask function when clicked */}
        </div>

        {/* Display the tasks and call deleteTask function when a task is clicked */}

      </div>
    </div>
  );
}
