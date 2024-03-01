import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Alert
} from "@mui/material";
import Link from "next/link";

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CustomTextField from "@/app/(Layout)/components/forms/theme-elements/CustomTextField";
import { login } from "@/redux/slices/authJwt";

import { LoadingButton } from '@mui/lab';

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const history = useRouter();

  const { isAuthenticated, error } = useSelector(
    (state: any) => state.authJwt
  );

  const showAlert = (msg : string) => {
    setMsg(msg);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 10000);
  };

  const onHandleLogin = () => {
    setIsSubmitting(true)
    dispatch(login({ email, password }) as any);
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error.message?.length > 0) {
      // Handle the error, e.g., display an error message
      setIsSubmitting(false)
      showAlert(error.message);
    }
  }, [error]);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField variant="outlined" fullWidth value={email} onChange={(e: any) => {
            setEmail(e.target.value);
          }} />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField type="password" variant="outlined" fullWidth value={password} onChange={(e: any) => {
            setPassword(e.target.value);
          }} />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <LoadingButton
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={onHandleLogin}
          loading={isSubmitting}
        >
          Sign In
        </LoadingButton>
      </Box>
      {subtitle}

      {alert && (
        <Alert
          severity="error"
          onClose={() => {
            setAlert(false);
          }}
          style={{
            position: "absolute",
            top: "30px",
            right: "30px",
            zIndex: 9999,
          }}
        >
          {msg}
        </Alert>
      )}
    </>
  )
};

export default AuthLogin;
