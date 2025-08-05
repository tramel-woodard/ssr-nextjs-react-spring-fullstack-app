/* import "@/styles/globals.css"; */
import { ThemeProvider } from "@mui/material/styles";
import theme from '../styles/theme';
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline /> {/* for global reset styles */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
