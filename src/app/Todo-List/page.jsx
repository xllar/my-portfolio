'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error parsing localStorage todos:', error);
        localStorage.removeItem('todos'); // Clear invalid data
      }
    }
  }, []);

  // Update localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleInput = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDelete = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.background}>
      <header className={styles.header}>
        <h1>Todo List Project</h1>
        <p className={styles.subTitle}>A Next-Js todo app project by Ifeanyi</p>
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>My Todo List!</h1>
        <div className={styles.todos}>
          {todos.map((todo, index) => (
            <div key={index} className={styles.todoItem}>
              <span>{todo}</span>
              <button onClick={() => handleDelete(index)} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type='text'
            placeholder='Add a new task'
            value={newTodo}
            onChange={handleInput}
            className={styles.input}
          />
          <button onClick={handleAddTodo} className={styles.addButton}>
            Add Todo
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>This project was made by <strong>Ifeanyi</strong> with ❤️</p>
      </footer>
    </div>
  );
}
