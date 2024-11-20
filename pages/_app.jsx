// import '/styles/globals.css'
// // In your component or _app.js
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
import '/styles/globals.css'; // Global CSS
import 'slick-carousel/slick/slick.css'; // Slick carousel styles
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles

import { ToastContainer } from 'react-toastify'; // Import Toastify container

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Render your component */}
      <Component {...pageProps} />

      {/* Include the Toastify container */}
      <ToastContainer 
        position="top-right" // Toast position
        autoClose={5000} // Auto close in 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Keep new toast on top
        closeOnClick // Close on click
        rtl={false} // Support for RTL
        pauseOnFocusLoss // Pause toast on window focus loss
        draggable // Enable dragging of toasts
        pauseOnHover // Pause toast on hover
        theme="light" // Use light or dark theme
      />
    </>
  );
}
