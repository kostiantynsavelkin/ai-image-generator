import React, { useState, useEffect } from "react";
import { Box, Typography, Alert } from '@mui/material';
import Link from 'next/link';

import CustomTextField from '@/app/(Layout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { register } from "@/redux/slices/authJwt";
import { LoadingButton } from '@mui/lab';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickName, setNickName] = useState('');

    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const history = useRouter();

    const { user, error, isAuthenticated } = useSelector(
        (state: any) => state.authJwt
    );

    const onHandleRegister = () => {
        setIsSubmitting(true)
        dispatch(register({ email, password, nickName }) as any);
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

    const showAlert = (msg : string) => {
        setMsg(msg);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 10000);
      };    

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={nickName} onChange={(e: any) => {
                        setNickName(e.target.value);
                    }} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e: any) => {
                        setEmail(e.target.value);
                    }} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth value={password} onChange={(e: any) => {
                        setPassword(e.target.value);
                    }} />
                </Stack>
                <LoadingButton color="primary" variant="contained" size="large" fullWidth onClick={onHandleRegister} loading={isSubmitting}>
                    Sign Up
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

export default AuthRegister;
