'use client';
import { useState } from 'react';
import styles from './style.module.scss';

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');

  const appendDisplay = (value: string) => {
    setDisplayValue((prev) => (prev === '0' ? value : prev + value));
  };

  const clearDisplay = () => {
    setDisplayValue('0');
  };

  const calculateDisplay = () => {
    if (displayValue) {
      try {
        setDisplayValue(eval(displayValue).toString());
      } catch {
        setDisplayValue('Error');
      }
    }
  };

  const percentage = () => {
    if (displayValue) {
      try {
        setDisplayValue((eval(displayValue) / 100).toString());
      } catch {
        setDisplayValue('Error');
      }
    }
  };

  const backspace = () => {
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const buttons = [
    { text: '7', value: '7' },
    { text: '8', value: '8' },
    { text: '9', value: '9' },
    { text: 'DEL', value: 'back' },
    { text: '4', value: '4' },
    { text: '5', value: '5' },
    { text: '6', value: '6' },
    { text: '/', value: '/' },
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '*', value: '*' },
    { text: '0', value: '0' },
    { text: '.', value: '.' },
    { text: '%', value: '%' },
    { text: '-', value: '-' },
    { text: 'C', value: 'clear' },
    { text: '=', value: '=' },
    { text: '+', value: '+' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
      <h1 className={styles.victr}>Victr-ngr Calculator</h1>
      <div className={styles.display}>
        {displayValue}
      </div>
      <div className={styles.grid}>
        {buttons.map((button) => (
          <button
            key={button.value}
            onClick={() => {
              switch (button.value) {
                case '=':
                  calculateDisplay();
                  break;
                case 'clear':
                  clearDisplay();
                  break;
                case '%':
                  percentage();
                  break;
                case 'back':
                  backspace();
                  break;
                default:
                  appendDisplay(button.text);
              }
            }}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
    </div>
    
  );
}
