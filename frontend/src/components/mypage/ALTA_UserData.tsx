import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styled from '@emotion/styled';
import _ from 'lodash';

import defaultProfile from '../../images/user.webp';
import { mainColor } from '../../modules/colorChart';
import { UserDataStore } from '../../context/UserDataContext';
import { generateError } from '../../modules/generateAlert';

import ALTA_ToggleBtn from './ALTA_ToggleBtn';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_UserDataEdit from './ALTA_UserDataEdit';
import ALTA_UserDataDisplay from './ALTA_UserDataDisplay';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

type AlertStatus = {
  [index: string]: boolean;
  siteSolutionAlert: boolean;
  siteCommentAlert: boolean;
  mailSolutionAlert: boolean;
  mailScheduleAlert: boolean;
};

export default function ALTA_UserData() {
  const { userData, changeProfile, editAlertStatus } = useContext(UserDataStore);
  const navigate = useNavigate();

  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [alertFold, setAlertFold] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    siteSolutionAlert: userData.alertSetting.slice(0, 1) === '1' ? true : false,
    siteCommentAlert: userData.alertSetting.slice(1, 2) === '1' ? true : false,
    mailSolutionAlert: userData.alertSetting.slice(2, 3) === '1' ? true : false,
    mailScheduleAlert: userData.alertSetting.slice(3, 4) === '1' ? true : false,
  });

  const editAlertSetting = (key: string): void => {
    const tmp = { ...alertStatus };
    tmp[key] = !tmp[key];

    setAlertStatus(tmp);
  };

  const openEditPage = (): void => {
    setAlertFold(false);
    setIsEditPage(!isEditPage);
  };

  const changeProfileImage = async (files: FileList | null) => {
    const img = new FormData();

    if (files) {
      const type = files[0].type;
      const regx = /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i;

      if (!regx.test(type)) generateError('???????????? ????????? ??? ????????????', '');

      img.append('profileImage', files[0]);

      const changeApiStatue = await changeProfile(img);

      if (changeApiStatue.status === -1) navigate('/');
      else if (changeApiStatue.status === -2) generateError('???????????? ????????? ??? ????????????', changeApiStatue);
    }
  };

  const save = async () => {
    let result = '';
    for (const key in alertStatus) result += alertStatus[key] ? '1' : '0';

    if (result !== userData.alertSetting) {
      const saveStatus = editAlertStatus(result);

      if (saveStatus.status === -1) navigate('/');
      else if (saveStatus.status === -2) generateError('?????? ????????? ???????????? ???????????????', saveStatus.message);
    }
    setAlertFold(false);
  };

  return (
    <Box sx={wrapper}>
      <Input id="file" type="file" accept="image/*" onChange={(e) => changeProfileImage(e.target.files)} />
      <ALTA_ContentsTitle>??? ??????</ALTA_ContentsTitle>
      <Box sx={[userDataStyle, alertFold && unfold]}>
        {!isEditPage && (
          <ALTA_Tooltip title="??? ?????? ??????">
            <EditIcon sx={[editButtonStyle, inTop]} onClick={openEditPage} />
          </ALTA_Tooltip>
        )}
        <Box sx={userDataTopStyle}>
          <Box sx={profileImgStyle}>
            <img src={userData.profileUrl || defaultProfile} alt="????????? ?????????" />
          </Box>
          <ALTA_Tooltip title="????????? ?????? ??????">
            <PhotoButton>
              <Label htmlFor="file">
                <CameraAltIcon />
              </Label>
            </PhotoButton>
          </ALTA_Tooltip>
          <Box sx={profileDataStyle}>
            {isEditPage ? <ALTA_UserDataEdit setIsEditPage={setIsEditPage} /> : <ALTA_UserDataDisplay />}
          </Box>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={6} sx={itemStyle}>
              <Typography sx={itemTitleStyle}>?????? ??????</Typography>
              <ALTA_ToggleBtn
                targetStatus={alertStatus.siteSolutionAlert}
                setTarget={() => editAlertSetting('siteSolutionAlert')}
              >
                ??????
              </ALTA_ToggleBtn>
              <ALTA_ToggleBtn
                targetStatus={alertStatus.siteCommentAlert}
                setTarget={() => editAlertSetting('siteCommentAlert')}
              >
                ?????????
              </ALTA_ToggleBtn>
            </Grid>
            <Grid item xs={6} sx={itemStyle}>
              <Typography sx={itemTitleStyle}>????????? ??????</Typography>
              <ALTA_ToggleBtn
                targetStatus={alertStatus.mailSolutionAlert}
                setTarget={() => editAlertSetting('mailSolutionAlert')}
              >
                ?????????
              </ALTA_ToggleBtn>
              <ALTA_ToggleBtn
                targetStatus={alertStatus.mailScheduleAlert}
                setTarget={() => editAlertSetting('mailScheduleAlert')}
              >
                ??????
              </ALTA_ToggleBtn>
            </Grid>
          </Grid>
        </Box>
        {isEditPage ? (
          <></>
        ) : (
          <>
            {!alertFold && (
              <Button sx={[editButtonStyle, inBottom]} onClick={() => setAlertFold(!alertFold)}>
                ?????? ??????
              </Button>
            )}
            {alertFold && (
              <Button sx={[editButtonStyle, inBottom]} onClick={_.debounce(() => save(), 300)}>
                ?????? ??????
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

const wrapper = {
  position: 'absolute',
  minWidth: '100%',
  top: '20px',
  zIndex: 100,
};

const userDataStyle = {
  position: 'relative',
  height: '300px',
  marginBottom: '30px',
  padding: '40px 20px',
  borderRadius: '10px',
  transition: 'height .3s',
  backgroundColor: '#fff',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const userDataTopStyle = {
  display: 'flex',
  position: 'relative',
};

const unfold = {
  height: '580px',
};

const profileImgStyle = {
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'width': '200px',
  'height': '200px',
  'overflow': 'hidden',
  'borderRadius': '100px',
  '& > img': {
    width: '100%',
  },
};

const profileDataStyle = {
  flex: '1 1 auto',
  marginLeft: '50px',
};
const editButtonStyle = {
  position: 'absolute',
  cursor: 'pointer',
};

const inTop = {
  top: '10px',
  right: '10px',
};

const inBottom = {
  bottom: '10px',
  right: '10px',
};

const itemTitleStyle = {
  fontSize: '20px',
  marginBottom: '20px',
};

const itemStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
};

const PhotoButton = styled.button`
  all: unset;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  top: 150px;
  left: 5px;
  border-radius: 50px;
  cursor: pointer;
  background-color: ${mainColor};
  &:active {
    transform: scale(0.9);
  }
`;

const Input = styled.input`
  all: unset;
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
`;
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;
