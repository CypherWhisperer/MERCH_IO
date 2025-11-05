// This file is a single source of truth and management for the Project routes
// This makes it easier to manage and later add routes in the project 

// importing the Pages Components
import { Landing, SignUpIn, Home, Product, Cart, Cashout, ProductTrack, Admin, NotFound } from './pages/pages.js'

// Decalring and exporting the routes array
export const routes = [
  { path: '/', element: <Landing /> },
  { path: 'signUpIn', element: <SignUpIn /> },
  { path: 'home', element: <Home /> },
  { path: 'product', element: <Product /> },
  { path: 'cart', element: <Cart /> },
  { path: 'cashout', element: <Cashout /> },
  { path: 'productTrack', element: <ProductTrack /> },
  { path: 'admin', element: <Admin /> },
  { path: '*', element: <NotFound /> },
]

/* Dynamic Routing For Dynamic Products 
  <Route path="product/:productId" element={<Product props={props} />} />
*/
