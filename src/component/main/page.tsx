/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import styles from './styles.module.scss';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Button Click',
      description: 'A simple app where you click a button, and it tells you which button you clicked.',
      link: '/Button',
    },
    {
      title: 'Calculator',
      description: 'A functional calculator built to perform basic arithmetic operations.',
      link: '/calculator',
    },
    {
      title: 'Registration Page',
      description: 'A registration page utilizing Formik and Yup.',
      link: '/registration',
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
      title: 'Blog',
      description: 'A blog website where users can register, get newsletters, comment, post, etc.',
      link: 'https://nexuseditorial.vercel.app/',
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>My Projects Portfolio</h1>
        <p className={styles.headerSubtitle}>By Victor Ifeanyi Ngr</p>
      </header>

      <p className={styles.intro}>
        Welcome to my portfolio! Here are some projects that I've built using Next.js, SCSS, TypeScript, JavaScript, MongoDB, and Sanity CMS.
      </p>

      <div className={styles.projectsList}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectItem}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <p className={styles.projectDescription}>{project.description}</p>
            <Link href={project.link} className={styles.projectLink}>
              View Project
            </Link>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>© 2024 Victor Ifeanyi Ngr. All rights reserved.</p>
      </footer>
    </div>
  );
}
