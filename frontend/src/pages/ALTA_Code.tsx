import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ALTA_CodeContents from '../components/code/ALTA_CodeContents';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Header from '../components/common/ALTA_Header';

import CodeReviewContext from '../context/CodeReviewContext';
import LoginTokenChecker from '../modules/LoginTokenChecker';

export default function ALTA_Code() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!LoginTokenChecker()) navigate('/');
  }, []);

  const { studyId, codeId } = useParams<{
    studyId: string | undefined;
    codeId: string | undefined;
  }>();
  const Header = () => <ALTA_Header />;
  const Contents = () => (
    <CodeReviewContext>
      <ALTA_CodeContents studyId={studyId} codeId={codeId} />
    </CodeReviewContext>
  );
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
