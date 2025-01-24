// import '/styles/globals.css'
// // In your component or _app.js
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
import "/styles/globals.css"; // Global CSS
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import Head from "next/head";
import { ToastContainer } from "react-toastify"; // Import Toastify container
import { ResumeProvider } from "../components/context/ResumeContext";
import { CoverLetterProvider } from "../components/context/CoverLetterContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.chtlConfig = { chatbotId: "1256619196" };
            `,
          }}
        />
        <script
          async
          data-id="1256619196"
          id="chatling-embed-script"
          type="text/javascript"
          src="https://chatling.ai/js/embed.js"
        ></script>
      </Head>
      {/* Render your component */}
      <ResumeProvider>
        <CoverLetterProvider>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
        </CoverLetterProvider>
      </ResumeProvider>
    </>
  );
}
