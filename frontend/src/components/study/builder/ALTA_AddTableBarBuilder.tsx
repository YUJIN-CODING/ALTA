import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { generateError, generateTimer } from '../../../modules/generateAlert';
import { blackColor } from '../../../modules/colorChart';
import { postRequest } from '../../../api/request';
import { AxiosError } from 'axios';

export const addTableBarFrontBuilder = () =>
  function ALTA_AddTableBarFront({ fliper }: { fliper: () => void }) {
    return (
      <PlainBtn onClick={fliper}>
        <Box
          sx={{
            display: 'flex',
            height: 80,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddIcon
            sx={{ color: blackColor, opacity: '0.5', fontSize: '40px' }}
          />
          <Typography
            sx={{ color: blackColor, opacity: '0.5', fontSize: '14px' }}
          >
            테이블 추가
          </Typography>
        </Box>
      </PlainBtn>
    );
  };

const PlainBtn = styled.button`
  all: unset;
  width: 100%;
  &:active {
    transform: scale(0.99);
  }
  background-color: lightgray;
  &:hover {
    background-color: gray;
  }
  transition: background-color 0.3s;
`;

export const addTableBarBackBuilder = (
  studyId: number,
  getReadmeContents: (studyId: number) => void,
) =>
  function Back({ fliper }: { fliper: () => void }) {
    console.log(studyId);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    //Date 인스턴스를 0000-00-00형태의 문자열로 변경
    const refineDate = (date: Date | null): string | null => {
      if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
      }

      return null;
    };

    const addProblemTable = async () => {
      //unix 시간을 비교하여 시작 > 마감의 경우 예외 처리
      if (startDate && endDate) {
        const unixStartTime = startDate.getTime();
        const unixEndTime = endDate.getTime();

        if (unixStartTime >= unixEndTime) {
          generateError('시작 날짜는 마감 날짜보다 빨리야 합니다', '');
          return;
        }
      }

      const requestData = {
        startDate: refineDate(startDate),
        endDate: refineDate(endDate),
      };

      console.log(requestData);
      try {
        await postRequest(`/api/study/${studyId}/schedule`, requestData);
      } catch (err: any) {
        if (err.response.data.code === 'S001')
          generateError('같은 날짜로 시작하는 회차가 존재합니다', '');
        else generateError('새로운 회차를 생성할 수 없습니다', '');
      }
      getReadmeContents(studyId);

      setStartDate(new Date());
      setEndDate(new Date());
    };

    return (
      <>
        {' '}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 'inherit',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ margin: '0 20px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['day']}
                  label="시작 날짜"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ margin: '0 20px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['day']}
                  label="마감 날짜"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addProblemTable();
              }}
            >
              추가
            </Button>
          </Box>
        </Box>
        <Button color="error" onClick={fliper}>
          취소
        </Button>
      </>
    );
  };
