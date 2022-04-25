import { Box } from '@mui/material';

export default function ALTA_StudyMembers({ children }) {
  return <Box sx={wrapper}>{children}</Box>;
}

const wrapper = {
  width: '80%',
  margin: '20px auto 0',
  padding: '10px',
  paddingBottom: '0.1px',
  boxSizing: 'border-box',
  backgroundColor: '#d9cab3',
};
