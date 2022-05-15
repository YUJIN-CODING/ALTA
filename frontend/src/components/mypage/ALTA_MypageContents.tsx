import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { generateError } from '../../modules/generateAlert';
import { UserDataStore } from '../../context/UserDataContext';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';
import ALTA_Loading from '../common/ALTA_Loading';

export default function ALTA_MypageContents() {
  const { userData, getUserData } = useContext(UserDataStore);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const Userstatus = await getUserData();

      if (Userstatus.status === -1) navigate('/');
      else if (Userstatus.status === -2)
        generateError('유저 정보를 불러올 수 없습니다', '', () =>
          navigate('/'),
        );
      else setLoading(false);
    })();
  }, []);
  return (
    <>
      {loading && <ALTA_Loading />}
      <Box sx={{ position: 'relative' }}>
        {!loading && <ALTA_UserData />}
        {!loading && <ALTA_StudyList studyList={userData.studyList} />}
      </Box>
    </>
  );
}
