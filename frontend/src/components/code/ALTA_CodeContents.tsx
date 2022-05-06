import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Divider, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { getRequest } from '../../api/request';
import { CodeReviewStore } from '../../context/CodeReviewContext';
import { CodeProps } from '../../types/CodeBlockType';

import ALTA_CodeEditor from './ALTA_CodeEditor';
import ALTA_CodeBlock from '../common/ALTA_CodeBlock';
import ALTA_CodeTree from './ALTA_CodeTree';
import ALTA_CodeCommentList from './ALTA_CodeCommentList';

export default function ALTA_CodeContents({ studyId, codeId }: CodeProps) {
  const navigate = useNavigate();

  const { code, setCode } = useContext(CodeReviewStore);
  const [isCodeEdit, setIsCodeEdit] = useState(false);

  const getCode = async () => {
    const res = await getRequest(`/api/study/${studyId}/code/${codeId}`);
    // console.log(res);
    setCode(res);
  };

  const goToDetail = () => navigate('/study/detail', { state: { studyId } });

  useEffect(() => {
    getCode();
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
                  file={code.file_name}
                  setIsCodeEdit={setIsCodeEdit}
                />
              ) : (
                <Grid container direction="column" spacing={5}>
                  <Grid item>
                    <Box pt={3} pb={3}>
                      <Button
                        startIcon={<ChevronLeftIcon />}
                        variant="contained"
                        sx={backBtn}
                        onClick={goToDetail}
                      >
                        Back
                      </Button>
                      <Box sx={titleStyle}>
                        <Typography sx={problemStyle}>
                          2021.04.13 회문
                        </Typography>
                        <Box>
                          <Button>재업로드</Button>
                          <Button
                            onClick={() => {
                              setIsCodeEdit(true);
                            }}
                          >
                            수정
                          </Button>
                          <Button>삭제</Button>
                        </Box>
                      </Box>
                      <Box sx={titleStyle}>
                        <Typography sx={codeTitleStyle}>
                          {code.file_name}
                        </Typography>
                        <Typography sx={codeWritterStyle} align="right">
                          작성자 : user
                        </Typography>
                      </Box>
                    </Box>
                    <Divider style={{ width: '100%' }} />
                  </Grid>
                  <Grid item>
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
  // width: '100%',
};

const codeTree_wrapper = {
  display: { xs: 'none', md: 'block' },
};

const wrapper = {};

const backBtn = {
  fontSize: '15px',
  marginBottom: '18px',
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
