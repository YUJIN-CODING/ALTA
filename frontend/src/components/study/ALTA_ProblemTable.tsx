import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { Member, Problem, Code } from '../../types/StudyType';
import { blackColor, subColor, wightColor } from '../../modules/colorChart';

import ALTA_AddBar from '../common/ALTA_AddBar';

type Props = {
  problems: Problem[];
  members: Member[];
  maxPeople: number;
};

type SellBtnProps = {
  path: string | null;
  problem: Problem;
  memberName: string;
};

export default function ALTA_ProblemTable({
  problems,
  members,
  maxPeople,
}: Props) {
  const navigate = useNavigate();

  const findCode = (nickname: string, codes: Code[]): string | null => {
    for (const code of codes) {
      if (code.nickname === nickname) return code.path;
    }
    return null;
  };

  function Front() {
    return <AddCircleIcon sx={{ color: blackColor, opacity: '0.5' }} />;
  }

  function Back() {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 'inherit',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
          <Typography sx={{ marginRight: '10px' }}>문제 이름</Typography>
          <Input type="text" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
          <Typography sx={{ marginRight: '10px' }}>링크</Typography>
          <Input type="text" style={{ width: '350px' }} />
        </Box>
      </Box>
    );
  }

  function SellBtn({ path, problem, memberName }: SellBtnProps) {
    const submitCode = () => {
      const path = `${problem.name}/${memberName}`;
      const problemId = problem.id;
      navigate('/code-submit', { state: { problemId, path } });
    };
    return (
      <>
        {path ? (
          <Button>코드 보기</Button>
        ) : (
          <Button sx={omisstionBtnStyle} onClick={submitCode}>
            코드 제출
          </Button>
        )}
      </>
    );
  }

  return (
    <Box sx={tableStyle}>
      <Box>
        <Box>
          <Grid container sx={tableHeaderStyle}>
            <Grid item xs={5} sx={sellStyle}>
              <Typography>제목</Typography>
            </Grid>
            <Grid item xs={7} sx={sellStyle}>
              <Grid container>
                {members.map((member, i) => (
                  <Grid item key={i} xs={12 / maxPeople} sx={sellStyle}>
                    <Typography>
                      {member.nickname ? member.nickname : '-'}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        {problems.length > 0 ? (
          problems.map((problem) => (
            <Box key={problem.id}>
              <Box>
                <Grid container sx={tableBodyStyle}>
                  <Grid item xs={5} sx={sellStyle}>
                    <Typography>{problem.name}</Typography>
                  </Grid>
                  <Grid item xs={7} sx={sellStyle}>
                    <Grid container>
                      {members.map((member, i) => (
                        <Grid item key={i} xs={12 / maxPeople} sx={sellStyle}>
                          <Typography>
                            {member.nickname ? (
                              <SellBtn
                                path={findCode(member.nickname, problem.codes)}
                                problem={problem}
                                memberName={member.nickname}
                              />
                            ) : (
                              '-'
                            )}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Box>
      <ALTA_AddBar height="40px" front={<Front />} back={<Back />} />
    </Box>
  );
}
const tableStyle = {
  marginTop: '10px',
};

const tableHeaderStyle = {
  height: '40px',
  backgroundColor: subColor,
};

const tableBodyStyle = {
  'height': '40px',
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(224, 212, 194, 0.3)',
  },
};

const sellStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const omisstionBtnStyle = {
  color: 'error.main',
};

const Input = styled.input`
  all: unset;
  width: 200px;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid ${subColor};
  background-color: ${wightColor};
`;
