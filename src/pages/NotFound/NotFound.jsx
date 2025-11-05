import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className={styles.page_container}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p className={styles.text}>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/" className={styles.back_home}>
        Go back home
      </Link>
    </main>
  )
}
