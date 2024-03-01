"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} style={{
        background: '#071932'
      }}>
        <ThemeProvider theme={baselightTheme}>
          <ReduxProvider store={store}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
