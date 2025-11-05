import styles from './Home.module.scss'

// COMPONENTS
import { Footer, MainNav } from "../../components/components"

export default function Home() {
  return (
    <article className={styles.home_container}>
      <MainNav />
      
      <div className={styles.page_content}>        
        <h1>Home Page</h1>
        <Footer />
      </div>
    </article>
  )
}
