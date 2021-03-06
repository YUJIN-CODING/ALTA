import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  Button,
  Typography,
} from '@mui/material';
import _ from 'lodash';

import { languages } from '../../modules/languageSources';
import { OrganizeStudyRequset } from '../../types';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { organizeStudyApi } from '../../api/apis';
import { generateCheck, generateError, generateTimer } from '../../modules/generateAlert';

import ALTA_InputItem from '../common/ALTA_InputItem';

export default function ALTA_ToOrganizeContents() {
  const navigate = useNavigate();

  const [sumitBtn, setSumitBtn] = useState<boolean>(false);
  const [focusedItem, setFocusedItem] = useState<string>('스터디 이름');
  const [requestData, setReqeustData] = useState<OrganizeStudyRequset>({
    introduction: '',
    isPublic: 'true',
    language: languages[0],
    maxPeople: '2',
    name: '',
    repositoryName: '',
  });

  const changeFocus = (label: string): void => setFocusedItem(label);

  const handleRequestData = (eventValue: string, key: string): void => {
    const newData: OrganizeStudyRequset = { ...requestData };
    newData[key] = String(eventValue);

    if (!Object.values(newData).includes('') && checkEmpty() && checkRepoName()) setSumitBtn(true);
    else setSumitBtn(false);

    setReqeustData(newData);
  };

  const handleStudyName = (value: string): void => {
    if (value.length > 10) return;

    handleRequestData(value, 'name');
  };

  const handleMaxPeople = (value: number) => {
    if (value > 6) handleRequestData('6', 'maxPeople');
    else if (value < 2) handleRequestData('2', 'maxPeople');
    else handleRequestData(`${value}`, 'maxPeople');
  };

  const handleStudyIntro = (value: string): void => {
    if (value.length > 80) return;

    handleRequestData(value, 'introduction');
  };

  const checkEmpty = (): boolean => {
    for (const key in requestData) if (requestData[key] === '') return false;

    return true;
  };

  const checkRepoName = (): boolean => {
    const regx = new RegExp(/[ㄱ-힣]|\s/g);
    if (regx.test(requestData.repositoryName)) return false;

    return true;
  };

  const organize = async (): Promise<void> => {
    if (!(await checkLogin())) navigate('/');

    generateTimer('잠시 기다려 주세요', `Github에 ${requestData.name} 레포지토리를 생성 중입니다`);

    try {
      await organizeStudyApi(requestData);
      generateCheck(
        '스터디가 생성되었습니다',
        `${requestData.repositoryName} 레포지토리가 Github에 생성되었습니다`,
        () => navigate('/mypage'),
      );
    } catch (err: any) {
      generateError('스터디를 생성할 수 없습니다', err.response.data.message);
    }
  };

  const cancel = (): void => navigate('/mypage');

  return (
    <Box sx={wrapperStyle}>
      <h1>스터디 생성</h1>
      <Box sx={organizationCardStyle}>
        <h2>스터디 이름 입력란</h2>
        <ALTA_InputItem label="스터디 이름" focused={focusedItem === '스터디 이름'} focusHandler={changeFocus}>
          <TextField
            id="스터디 이름"
            autoFocus
            variant="standard"
            value={requestData.name}
            onChange={(e) => handleStudyName(e.target.value)}
            placeholder="스터디 이름을 정해주세요 (최대 10자)"
            sx={{ width: '100%' }}
            inputProps={{ style: { fontSize: 18, padding: '0 0 3px' } }}
          />
          <Typography sx={guideStyle} className={requestData.name && `checked`}>
            <span>{!requestData.name && '스터디 이름을 채워주세요'}</span>
            <span>{requestData.name && `"${requestData.name}" 가 스터디 이름으로 등록됩니다.`}</span>
          </Typography>
        </ALTA_InputItem>
        <h2>풀이 언어 선택란</h2>
        <ALTA_InputItem label="풀이 언어" focused={focusedItem === '풀이 언어'} focusHandler={changeFocus}>
          <Select
            variant="standard"
            value={requestData.language}
            onChange={(e) => handleRequestData(e.target.value, 'language')}
          >
            {languages.map(
              (lan: string): JSX.Element => (
                <MenuItem key={lan} value={lan}>
                  {lan}
                </MenuItem>
              ),
            )}
          </Select>
        </ALTA_InputItem>
        <h2>참여 인원 수 입력란</h2>
        <ALTA_InputItem label="인원 수" focused={focusedItem === '인원 수'} focusHandler={changeFocus}>
          <TextField
            id="인원 수"
            type="number"
            variant="standard"
            value={requestData.maxPeople}
            onChange={(e) => handleMaxPeople(Number(e.target.value))}
          />
        </ALTA_InputItem>
        <h2>스터디 이름 선택란</h2>
        <ALTA_InputItem label="공개 여부" focused={focusedItem === '공개 여부'} focusHandler={changeFocus}>
          <RadioGroup row value={requestData.isPublic} onChange={(e) => handleRequestData(e.target.value, 'isPublic')}>
            <FormControlLabel value="true" control={<Radio id="공개 여부" />} label="공개" />
            <FormControlLabel value="false" control={<Radio id="공개 여부" />} label="비공개" />
          </RadioGroup>
        </ALTA_InputItem>
        <h2>레포지토리 이름 입력란</h2>
        <ALTA_InputItem label="Repo 이름" focused={focusedItem === 'Repo 이름'} focusHandler={changeFocus}>
          <TextField
            id="Repo 이름"
            variant="standard"
            placeholder="레포지토리 이름을 적어주세요"
            value={requestData.repositoryName}
            onChange={(e) => handleRequestData(e.target.value, 'repositoryName')}
            sx={{ width: '100%' }}
            inputProps={{ style: { fontSize: 18, padding: '0 0 3px' } }}
          />
          <Typography sx={guideStyle} className={`${requestData.repositoryName && checkRepoName() && 'checked'}`}>
            <span>{!requestData.repositoryName && '레포지토리 이름을 채워주세요'}</span>
            <span>{!checkRepoName() && '레포지토리는 한글과 공백을 포함할 수 없습니다'}</span>
            <span>{requestData.repositoryName && checkRepoName() && '레포지토리 이름으로 사용 가능합니다'}</span>
          </Typography>
        </ALTA_InputItem>
        <h2>스터디 소개 입력란</h2>
        <ALTA_InputItem label="스터디 소개" focused={focusedItem === '스터디 소개'} focusHandler={changeFocus}>
          <StyledTextArea
            id="스터디 소개"
            rows={4}
            placeholder="소개글을 써주세요. (최대 100자)"
            value={requestData.introduction}
            onChange={(e) => handleStudyIntro(e.target.value)}
          />
          <Typography sx={guideStyle} className={requestData.introduction && `checked`}>
            <span>{!requestData.introduction && '스터디 이름을 채워주세요'}</span>
            <span>{requestData.introduction && '스터디 소개가 등록되었습니다'}</span>
          </Typography>
        </ALTA_InputItem>
        <Box sx={btnGroupStyle}>
          <Button variant="contained" sx={btnStyle} disabled={!sumitBtn} onClick={_.debounce(organize, 300)}>
            {sumitBtn ? (
              <>
                <span>생</span>
                <span>성</span>
              </>
            ) : (
              <span>모든 항목을 채워주세요</span>
            )}
          </Button>
          <Button variant="contained" color="error" sx={btnStyle} onClick={cancel}>
            <span>취</span>
            <span>소</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const wrapperStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: ' center',
  alignItems: 'center',
};

const organizationCardStyle = {
  width: '100%',
  backgroundColor: '#fff',
  padding: '50px',
  borderRadius: '5px',
};
const btnGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '30px',
};
const btnStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '49%',
  height: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#F6F6F6',
};
const guideStyle = {
  'width': '100%',
  'color': 'error.main',
  'fontSize': '14px',
  'textAlign': 'right',
  'transition': 'color .3s',
  '&.checked': {
    color: 'primary.main',
  },
};

const StyledTextArea = styled.textarea`
  all: unset;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  box-sizing: border-box;
  background-color: #d9cab3;
  border-radius: 5px;
`;
