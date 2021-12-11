import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Head } from "../components/Head";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
