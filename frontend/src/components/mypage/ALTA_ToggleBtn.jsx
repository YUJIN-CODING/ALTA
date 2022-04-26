import { Box, FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  'width': 42,
  'height': 26,
  'padding': 0,
  '& .MuiSwitch-switchBase': {
    'padding': 0,
    'margin': 2,
    'transitionDuration': '300ms',
    '&.Mui-checked': {
      'transform': 'translateX(16px)',
      'color': '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 300,
    }),
  },
}));

export default function ALTA_ToggleBtn({ children }) {
  return (
    <Box sx={toggleButtonStyle}>
      <Typography sx={toggleLabelStyle}>{children}</Typography>
      <FormControlLabel control={<IOSSwitch sx={switchStyle} />} />
    </Box>
  );
}

const switchStyle = {
  margin: '5px 0 0 10px',
};

const toggleButtonStyle = {
  display: 'flex',
  width: '50%',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const toggleLabelStyle = {
  display: 'inline',
  margin: '0 50px 0 20px',
};
