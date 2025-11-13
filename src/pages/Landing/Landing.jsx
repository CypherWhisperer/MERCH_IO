import styles from './Landing.module.scss'

// COMPONENTS
import { Footer, LandingNav } from "../../components/components"

export default function Landing() {
  return (
    <article className={styles.landing_container}>
      <LandingNav />
      <div className={styles.page_content}>
        <h1 className="text-red-700">Landing Page</h1>
        <Footer />
      </div>
    </article>
  )
}
