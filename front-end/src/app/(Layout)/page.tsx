'use client'
import { styled, Typography, Box, Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import PageContainer from '@/app/(Layout)/components/container/PageContainer';

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

const ThumbnailRowStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '100px',
  [theme.breakpoints.down('md')]: {
    gap: '60px',
  }
}));

const ThumbnailStyled = styled('img')(({ theme }) => ({
  width: '200px',
  height: 'auto',
  '&:hover': {
    border: '3px solid white'
  },
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    width: '100px',
  }
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: "40px",
  marginBottom: "40px",
  padding: '13px 28px',
  fontSize: '18px',
  [theme.breakpoints.down('md')]: {
  }
}));

// components
const Home = () => {
  const router = useRouter();

  return (
    <PageContainer title="Image Generator" description="Image Generator">
      <HeaderWrapper>
        <RowStyled>
          <TypographyStyled>
            Thumbnails are the images you first see of a game.
          </TypographyStyled>
          <TypographyStyled>
            Make your own!
          </TypographyStyled>
        </RowStyled>
      </HeaderWrapper>
      <MainWrapper>
        <ThumbnailRowStyle>
          <ThumbnailStyled src="/images/thumbnail-1.png" alt="Thumbnail" loading="lazy" />
          <ThumbnailStyled src="/images/thumbnail-2.png" alt="Thumbnail" loading="lazy" />
          <ThumbnailStyled src="/images/thumbnail-3.png" alt="Thumbnail" loading="lazy" />
        </ThumbnailRowStyle>
        <ThumbnailRowStyle>
          <ThumbnailStyled src="/images/thumbnail-4.png" alt="Thumbnail" loading="lazy" />
          <ThumbnailStyled src="/images/thumbnail-5.png" alt="Thumbnail" loading="lazy" />
        </ThumbnailRowStyle>
        <ButtonStyled
          color="primary"
          variant="contained" onClick={() => {
            router.replace('/create');
          }
          }>Make One</ButtonStyled>
      </MainWrapper>
    </PageContainer >
  )
}

export default Home;
