'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  styled, Typography, Box, List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "@mui/material";
import PageContainer from '@/app/(Layout)/components/container/PageContainer';
import CustomTextField from '@/app/(Layout)/components/forms/theme-elements/CustomTextField';
import { useRouter } from 'next/navigation';
import { getGeneratedImages } from "@/redux/slices/bot";
import { LoadingButton } from '@mui/lab';

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

const ButtonStyled = styled(LoadingButton)(({ theme }) => ({
  marginTop: "40px",
  marginBottom: "40px",
  padding: '13px 28px',
  fontSize: '18px',
  '& .MuiCircularProgress-root': {
    color: 'white',
  },
  [theme.breakpoints.down('md')]: {
  }
}));

const ListWrapperStyle = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#071932"
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  background: '#071932',
  '&:hover': {
    background: '#071932',
  },
  color: 'white',
  cursor: 'pointer',
  "& .MuiListItem-root": {
    padding: '0 !important'
  }
}));

const ListItemTextStyle = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontFamily: 'Inter',
    fontSize: '20px',
  }
}));

const ListItemIconStyle = styled(ListItemIcon)(({ theme }) => ({
  height: '30px!important',
}));


const words = ["BedWars Style",
  "BloxFruits Style",
  "Doors Style",
  "Brookhaven Style",
  "Adopt Me style",
  "Colorful",
  "Dark Themed",
  "Mr Beast style",
  "Shooting Game",
  "Role Play"]

// components
const Home = () => {
  const [checked, setChecked] = useState([0]);
  const [keyword, setKeyWord] = useState('');

  const dispatch = useDispatch();

  const { generatedImages, error, isLoading } = useSelector(
    (state: any) => state.bot
  );

  const router = useRouter();

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const onHandleMakeOne = async () => {
    let keywords = keyword;

    for (const index of checked) {
      keywords += " " + words[index];
    }

    if(keywords !== "") {
      try {
        dispatch(getGeneratedImages(keywords) as any);
      } catch (e) {
        console.log('e', e)
      }
    }
  }

  useEffect(() => {
    if (generatedImages.length > 0 && isLoading === false) {
      router.replace('/select');
    }
  }, [generatedImages, isLoading])

  return (
    <PageContainer title="Image Generator" description="Image Generator">
      <HeaderWrapper>
        <RowStyled>
          <TypographyStyled>
            Make your own Game Thumbnail
          </TypographyStyled>
        </RowStyled>
      </HeaderWrapper>
      <MainWrapper>
        <Box display="flex" gap="200px" alignItems="center">
          <ListWrapperStyle>
            <List>
              {words.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return (
                  <ListItemStyle
                    key={index}
                    role={undefined}
                    dense
                    onClick={handleToggle(index)}
                  >
                    <ListItemIconStyle>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIconStyle>
                    <ListItemTextStyle
                      id={labelId}
                      primary={`${value}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end">
                        {/* <CommentIcon /> */}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemStyle>
                );
              })}
            </List>
          </ListWrapperStyle>
          <TypographyStyled>OR</TypographyStyled>
          <Box style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TypographyStyled margin="3rem 0">Enter your own words here</TypographyStyled>
            <CustomTextField id="email" variant="outlined" multiline width="300px"
              rows={2} fullWidth value={keyword} onChange={(e: any) => {
                setKeyWord(e.target.value);
              }} />
          </Box>
        </Box>
        <ButtonStyled
          color="primary"
          loading={isLoading}
          variant="contained" onClick={onHandleMakeOne}>Make One</ButtonStyled>
      </MainWrapper>
    </PageContainer>
  )
}

export default Home;
