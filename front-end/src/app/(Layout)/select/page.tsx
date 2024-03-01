'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  styled, Typography, Box, Button
} from "@mui/material";
import PageContainer from '@/app/(Layout)/components/container/PageContainer';
import { setSelectedImage, setReset } from "@/redux/slices/bot";
import { useRouter } from 'next/navigation';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
  }
}));

const RowStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '9px',
  [theme.breakpoints.down('md')]: {
    gap: '5px',
  }
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: 'white',
  fontFamily: 'Inter',
  [theme.breakpoints.down('md')]: {
  }
}));

const MainWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '60px',
  marginTop: '60px',
  [theme.breakpoints.down('md')]: {
    gap: '40px',
  }
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: "40px",
  padding: '13px 28px',
  fontSize: '18px',
  [theme.breakpoints.down('md')]: {
  }
}));

const AIImageStyled = styled('img')(({ theme }) => ({
  width: '25%',
  height: 'auto',
  cursor: 'pointer',
  border: '10px solid transparent',
  borderRadius: '5px',
  "&:hover": {
    border: '10px solid #45ff89',
  },
  [theme.breakpoints.down('md')]: {
  }
}));

// components
const Home = () => {
  const dispatch = useDispatch();
  const [selectedImageObj, setSelectedImageObj] = useState<any>(null);

  const { generatedImages, selectedImage } = useSelector(
    (state: any) => state.bot
  );

  const router = useRouter();

  const onHandleChange = (image: any) => {
    setSelectedImageObj(image);
  }

  const onSelected = () => {
    if (selectedImageObj !== null) {
      dispatch(setSelectedImage(selectedImageObj) as any);
    }
  }

  const onRegenerated = () => {
    dispatch(setReset() as any);
    router.replace('/create');
  }

  useEffect(() => {
    if (selectedImage !== null) {
      router.replace('/result');
    }
  }, [selectedImage])

  useEffect(() => {
    if(generatedImages === null || generatedImages?.length === 0) {
      router.replace('/');
    }
  }, [generatedImages])

  return (
    <PageContainer title="Image Generator" description="Image Generator">
      <HeaderWrapper>
        <RowStyled>
          <TypographyStyled>
            Select your game thumbnail
          </TypographyStyled>
        </RowStyled>
      </HeaderWrapper>
      <MainWrapper>
        <Box display="flex" gap="40px" alignItems="center" justifyContent="center">
          {
            generatedImages.map((image: any, index: number) => {
              return <AIImageStyled key={index} src={`${process.env.NEXT_PUBLIC_API_URL}/${image.url}`} onClick={() => onHandleChange(image)} style={{
                border: (selectedImageObj !== null && image.id === selectedImageObj?.id) ? '10px solid #45ff89' : '10px solid transparent',
              }} alt="AI Generated Image" loading="lazy" />;
            })
          }
        </Box>
        <Box display="flex" justifyContent="center" gap="100px" marginBottom="40px">
          <ButtonStyled
            color="primary"
            variant="contained" onClick={onRegenerated}>Try Again</ButtonStyled>
          <ButtonStyled
            color="primary"
            variant="contained" onClick={onSelected}>Select This One</ButtonStyled>
        </Box>
      </MainWrapper>
    </PageContainer>
  )
}

export default Home;
