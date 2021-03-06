import { Box, Card, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

import defaultProfile from '../../images/user.webp';
import { StudyMember } from '../../types';

type Props = { member: StudyMember | null };

export default function ALTA_StudyMemberCard({ member }: Props) {
  return (
    <>
      {member && (
        <Card variant="outlined" sx={[memberCardStyle, member.position === '' && { opacity: '.5' }]}>
          <Box sx={profileStyle}>
            <img src={member.profileImg ? member.profileImg : defaultProfile} alt="" />
          </Box>
          <Typography sx={nicknameStyle}>
            <span>{member.nickname}</span>
            {member.position === '그룹장' ? <StarIcon sx={LeaderIconStyle} /> : null}
          </Typography>
        </Card>
      )}
      {!member && (
        <Card variant="outlined" sx={[memberCardStyle, memberCardStyle_Empty]}>
          <DoNotDisturbAltIcon />
        </Card>
      )}
    </>
  );
}

const memberCardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px 5px',
  padding: '5px',
  backgroundColor: 'primary.main',
};

const memberCardStyle_Empty = {
  justifyContent: 'center',
  height: '40px',
  backgroundColor: 'lightgray',
  opacity: '.7',
  color: 'gray',
};

const profileStyle = {
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'width': '40px',
  'height': '40px',
  'borderRadius': '50px',
  'overflow': 'hidden',
  '> img': {
    width: '100%',
  },
};

const nicknameStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: '1 1 auto',
  marginLeft: '20px',
};

const LeaderIconStyle = { fontSize: 'medium', margin: '5px', color: 'secondary.main' };
