"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
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
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Box sx={{
          minHeight: "calc(100vh - 170.38px)",
        }}>{children}</Box>
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
      </PageWrapper>
    </MainWrapper>
  );
}
