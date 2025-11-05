// import styles from './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes.jsx'

export default function App() {
  return (
    <>
      <main className={`app_container`} role="main">
        <Routes>
          {/* Mapping over the imported array of routes */}
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </>
  )
}
