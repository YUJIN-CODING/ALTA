import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Divider, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { getRequest, deleteRequest } from '../../api/request';
import { CodeReviewStore } from '../../context/CodeReviewContext';
import { CodeProps } from '../../types/CodeBlockType';
import {
  generateCheck,
  generateError,
  generateTimer,
} from '../../modules/generateAlert';

import ALTA_CodeEditor from './ALTA_CodeEditor';
import ALTA_CodeBlock from '../common/ALTA_CodeBlock';
import ALTA_CodeTree from './ALTA_CodeTree';
import ALTA_CodeCommentList from './ALTA_CodeCommentList';

export default function ALTA_CodeContents({ studyId, codeId }: CodeProps) {
  const navigate = useNavigate();

  const { code, setCode } = useContext(CodeReviewStore);
  const [isCodeEdit, setIsCodeEdit] = useState(false);
  const [userName, setUserName] = useState<string>('');

  const getCode = async () => {
    try {
      const res = await getRequest(`/api/study/${studyId}/code/${codeId}`);
      // console.log(res);
      setCode(res);
    } catch (err: any) {
      if (err.response.status === 403) {
        navigate('/');
      }
    }
  };

  const handleDelete = async () => {
    generateTimer('잠시 기다려 주세요', `${code.fileName} 을 삭제중입니다`);
    try {
      const res = await deleteRequest(`/api/study/${studyId}/code/${codeId}`);
      generateCheck(
        '코드가 삭제되었습니다.',
        `${code.fileName} 이(가) 성공적으로 삭제되었습니다`,
        () => goToDetail(studyId),
      );
    } catch (err: any) {
      if (err.response.status === 403) {
        navigate('/');
      }
      console.log(err);
      generateError('코드 삭제에 실패하였습니다', ``);
    }
  };

  const goToDetail = (studyId: string | undefined) =>
    navigate('/study/detail', { state: { studyId } });

  // const goToresubmit = () => navigate('')

  useEffect(() => {
    getCode();
    const user = localStorage.getItem('UserData');
    if (user !== null) {
      setUserName(JSON.parse(user)['nickname']);
    }
  }, []);

  useEffect(() => {
    getCode();
  }, [isCodeEdit]);

  return (
    <Grid container sx={wrapper} spacing={8}>
      <Grid item sx={codeTree_wrapper} md={2}>
        <Box pt={4} pl={2}>
          <ALTA_CodeTree />
        </Box>
      </Grid>
      <Grid item md={10}>
        <Box pr={15}>
          <Grid container direction="column" rowGap={3}>
            <Grid item sx={codeBlock_wrapper}>
              {isCodeEdit ? (
                <ALTA_CodeEditor
                  code={code.code}
                  language={code.language}
                  file={code.fileName}
                  setIsCodeEdit={setIsCodeEdit}
                  studyId={studyId}
                  codeId={codeId}
                />
              ) : (
                <Grid container direction="column" spacing={5}>
                  <Grid item>
                    <Box pt={3} pb={3}>
                      <Box sx={titleStyle}>
                        <Button
                          startIcon={<ChevronLeftIcon />}
                          variant="contained"
                          sx={backBtn}
                          onClick={() => {
                            goToDetail(studyId);
                          }}
                        >
                          Back
                        </Button>
                        {code.writer === userName ? (
                          <Box>
                            <Button
                              sx={reupBtn}
                              variant="contained"
                              // onClick={goToresubmit}
                            >
                              재업로드
                            </Button>
                            <Button
                              variant="contained"
                              sx={editBtn}
                              onClick={() => {
                                setIsCodeEdit(true);
                              }}
                            >
                              수정
                            </Button>
                            <Button
                              sx={delBtn}
                              variant="contained"
                              onClick={handleDelete}
                            >
                              삭제
                            </Button>
                          </Box>
                        ) : null}
                      </Box>
                      <Typography sx={problemStyle}>2021.04.13 회문</Typography>
                      <Box sx={titleStyle}>
                        <Typography sx={codeTitleStyle}>
                          {code.fileName}
                        </Typography>
                        <Typography sx={codeWritterStyle} align="right">
                          작성자 : {code.writer}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider style={{ width: '100%' }} />
                  </Grid>
                  <Grid item id="code-block">
                    <ALTA_CodeBlock code={code.code} language={code.language} />
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item sx={codeComment_wrapper}>
              <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
              <ALTA_CodeCommentList codeId={codeId} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

const codeComment_wrapper = {
  padding: '10px',
};

const codeBlock_wrapper = {
  // maxWidth: '100vw',
};

const codeTree_wrapper = {
  display: { xs: 'none', md: 'block' },
};

const wrapper = {
  width: '100%',
};

const backBtn = {
  fontSize: '15px',
  marginBottom: '18px',
};

const editBtn = {
  fontSize: '15px',
  marginRight: ' 10px',
  backgroundColor: 'secondary.main',
  color: '#000000',
};

const delBtn = {
  fontSize: '15px',
  marginRight: ' 10px',
  backgroundColor: 'error.main',
  color: '#000000',
};

const reupBtn = {
  fontSize: '15px',
  marginRight: ' 10px',
};

const titleStyle = {
  minWidth: '480px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

const problemStyle = {
  fontSize: '20px',
};

const codeTitleStyle = {
  fontSize: '50px',
};

const codeWritterStyle = {
  fontSize: '20px',
  marginRight: '16px',
};
