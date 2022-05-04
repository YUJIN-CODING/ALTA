import { Grid } from '@mui/material';

import StudyDetailContext from '../context/StudyDetailContext';
import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_StudyDetailContents from '../components/study/ALTA_StudyDetailContents';
import ALTA_StudySideContents from '../components/study/ALTA_StudySideContents';
import ALTA_StudyMembers from '../components/study/ALTA_StudyMembers';
import ALTA_StudyBoard from '../components/study/ALTA_StudyBoard';
import { useLocation } from 'react-router-dom';

export default function ALTA_StudyDetail() {
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

//template에 prop로 넘겨줄 컴포넌트
function Header() {
  return <ALTA_Header />;
}

function Contents() {
  //useLocation type 오류로 인한 임시 방편
  const studyId = JSON.parse(JSON.stringify(useLocation().state)).studyId;
  return (
    <StudyDetailContext>
      <Grid
        sx={{ height: '100%', padding: '20px 0' }}
        container
        justifyContent="center"
      >
        <Grid item xl={3} lg={6}>
          <ALTA_StudySideContents>
            <ALTA_StudyMembers studyId={studyId} />
          </ALTA_StudySideContents>
        </Grid>
        <Grid item xl={6}>
          <ALTA_Inner>
            <ALTA_StudyDetailContents studyId={studyId} />
          </ALTA_Inner>
        </Grid>
        <Grid item xl={3} lg={6}>
          <ALTA_StudySideContents>
            <ALTA_StudyBoard />
          </ALTA_StudySideContents>
        </Grid>
      </Grid>
    </StudyDetailContext>
  );
}
