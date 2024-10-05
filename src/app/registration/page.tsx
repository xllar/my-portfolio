'use client';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BiShow, BiHide } from 'react-icons/bi';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Formik() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useFormik({
    initialValues: {
      fullname: '',
      othername: '',
      email: '',
      password: '',
      conf_password: '',
    },
    validationSchema: yup.object({
      fullname: yup.string()
        .required('Full name is required')
        .min(5, 'Minimum of 5 characters')
        .max(30, 'Maximum of 30 characters')
        .matches(/^[aA-zZ ]+$/, 'Only letters are allowed.'),
      othername: yup.string().optional(),
      email: yup.string()
        .required('Email is required')
        .email('Enter a valid email'),
      password: yup.string()
        .required('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 
          'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, and one digit.'),
      conf_password: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={form.handleSubmit}>
        <h2 className={styles.title}>Create Account</h2>
        
        <div className={styles.form__input}>
          <label htmlFor='fullname' className={styles.label}>Full Name:</label>
          <div className={styles.inputContainer}>
            <FaUser className={styles.icon} />
            <input
              id='fullname'
              type='text'
              placeholder='Enter your full name'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.fullname}
              className={styles.input}
            />
          </div>
          {form.errors.fullname && form.touched.fullname && (
            <span className={styles.error}>{form.errors.fullname}</span>
          )}
        </div>
        
        <div className={styles.form__input}>
          <label htmlFor='othername' className={styles.label}>Other Name:</label>
          <div className={styles.inputContainer}>
            <FaUser className={styles.icon} />
            <input
              id='othername'
              type='text'
              placeholder='Other name... optional'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.othername}
              className={styles.input}
            />
          </div>
        </div>
        
        <div className={styles.form__input}>
          <label htmlFor='email' className={styles.label}>Email:</label>
          <div className={styles.inputContainer}>
            <FaEnvelope className={styles.icon} />
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
              className={styles.input}
            />
          </div>
          {form.errors.email && form.touched.email && (
            <span className={styles.error}>{form.errors.email}</span>
          )}
        </div>
        
        <div className={styles.form__input}>
          <label htmlFor='password' className={styles.label}>Password:</label>
          <div className={styles.inputContainer}>
            <FaLock className={styles.icon} />
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.password}
              className={styles.input}
            />
            <span className={styles.togglePassword} onClick={toggleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {form.errors.password && form.touched.password && (
            <span className={styles.error}>{form.errors.password}</span>
          )}
        </div>
        
        <div className={styles.form__input}>
          <label htmlFor='conf_password' className={styles.label}>Confirm Password:</label>
          <div className={styles.inputContainer}>
            <FaLock className={styles.icon} />
            <input
              id='conf_password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm your password'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.conf_password}
              className={styles.input}
            />
            <span className={styles.togglePassword} onClick={toggleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {form.errors.conf_password && form.touched.conf_password && (
            <span className={styles.error}>{form.errors.conf_password}</span>
          )}
        </div>
        
        <button type='submit' className={styles.button}>Submit</button>
      </form>
    </div>
  );
}
