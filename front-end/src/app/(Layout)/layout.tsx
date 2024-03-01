"use client";
import { styled, Box } from "@mui/material";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  padding: 0
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  padding: 0
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 127px)",
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: "calc(100vh - 115.38px)",
  }
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <BoxWrapper>{children}</BoxWrapper>
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
      </PageWrapper>
    </MainWrapper>
  );
}
