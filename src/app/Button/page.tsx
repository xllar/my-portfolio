'use client';
import React, { useState } from 'react';
import styles from './style.module.scss';
import { FaRegCheckCircle } from 'react-icons/fa';

export default function Button() {
  const [clickedButtons, setClickedButtons] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    console.log(`Button ${value} clicked`);
    window.alert(`Button ${value} clicked!`);
    setClickedButtons([...clickedButtons, value]);
  };

  const buttons = [
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '4', value: '4' },
    { text: '5', value: '5' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
      {buttons.map((button) => (
        <button
          className={`${styles.button} ${
            clickedButtons.includes(button.value) ? styles.clicked : ''
          }`}
          key={button.value}
          onClick={() => handleButtonClick(button.value)}
          disabled={clickedButtons.includes(button.value)}
        >
          <span className={styles.icon}>
            <FaRegCheckCircle />
          </span>
          {button.text}
          <span className={styles.ripple}></span>
        </button>
      ))}
    </div>
    </div>
  );
}
