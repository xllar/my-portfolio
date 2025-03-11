'use client'

import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

export default function Main() {
  // Using useState for a simple dark/light mode toggle
  const [darkMode, setDarkMode] = useState(false)
  
  // Project data
  const myProjects = [
    {
      title: 'Spreadsheet',
      description: 'A collaborative spreadsheet application with real-time updates.',
      link: 'https://spreadsheet-mocha-five.vercel.app',
    },
    {
      title: 'Blog',
      description: 'A blog website where users can register, get newsletters, comment, post, etc.',
      link: 'https://nexuseditorial.vercel.app/',
    },
    {
      title: 'Calculator',
      description: 'A functional calculator built to perform basic arithmetic operations.',
      link: '/calculator',
    },
    {
      title: 'To-Do List',
      description: 'A simple to-do list app to manage your tasks efficiently.',
      link: '/Todo-List',
    },
    {
      title: 'Weather UI',
      description: 'A modern weather UI that displays current weather conditions and forecasts.',
      link: './weatherUI',
    },
    {
      title: 'Registration Page',
      description: 'A registration page utilizing Formik and Yup.',
      link: '/registration',
    },
    {
      title: 'Button Click',
      description: 'A simple app where you click a button, and it tells you which button you clicked.',
      link: '/Button',
    },
];

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Head>
        <title>Victors Portfolio</title>
        <meta name="description" content="My coding portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header>
          <h1 className="main-title">My Projects Portfolio</h1>
          <p className="sub-title">By Victor Ifeanyi Ngr</p>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="theme-button"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        <div className="intro-text">
          Welcome to my portfolio! Here are some projects that I have built using Next.js, SCSS, 
          TypeScript, JavaScript, MongoDB, and Sanity CMS.
        </div>

        <div className="projects-grid">
          {myProjects.map((project, index) => (
            <Link href={project.link} key={index}>
              <div className="project-card">
                <div className="project-info">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
                <div className="view-project">
                  <span>View Project</span>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer>
          <p>© 2024 Victor Ifeanyi Ngr. All rights reserved.</p>
        </footer>
      </div>

      <style jsx>{`
        /* Simple CSS that a beginner might write */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .light-mode {
          background-color: #f0f0f0;
          color: #333;
        }
        
        .dark-mode {
          background-color: #222;
          color: #fff;
        }
        
        header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          border-bottom: 2px solid #ccc;
        }
        
        .main-title {
          font-size: 36px;
          margin-bottom: 10px;
        }
        
        .sub-title {
          font-size: 18px;
          color: #666;
        }
        
        .dark-mode .sub-title {
          color: #aaa;
        }
        
        .theme-button {
          background-color: #6200ea;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }
        
        .theme-button:hover {
          background-color: #7c4dff;
        }
        
        .intro-text {
          text-align: center;
          margin-bottom: 40px;
          font-size: 18px;
          line-height: 1.5;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .project-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        
        .dark-mode .project-card {
          border-color: #444;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .dark-mode .project-card:hover {
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }
        
        .project-info {
          padding: 20px;
        }
        
        .project-info h2 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #6200ea;
        }
        
        .dark-mode .project-info h2 {
          color: #bb86fc;
        }
        
        .project-info p {
          color: #666;
          margin-bottom: 0;
        }
        
        .dark-mode .project-info p {
          color: #bbb;
        }
        
        .view-project {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: #f5f5f5;
          border-top: 1px solid #ddd;
        }
        
        .dark-mode .view-project {
          background-color: #333;
          border-top-color: #444;
        }
        
        .view-project span {
          font-weight: bold;
          color: #6200ea;
        }
        
        .dark-mode .view-project span {
          color: #bb86fc;
        }
        
        footer {
          margin-top: 50px;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #ddd;
        }
        
        .dark-mode footer {
          border-top-color: #444;
        }
        
        /* Simple media query for responsiveness */
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .main-title {
            font-size: 28px;
          }
          
          .intro-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  )
}
