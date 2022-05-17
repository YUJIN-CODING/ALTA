import { useEffect } from 'react';
import MemberContext from '../context/MemberContext';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_MemberContents from '../components/member/ALTA_MemberContents';

export default function ALTA_Member() {
  const Header = () => <ALTA_Header></ALTA_Header>;
  const Contents = () => (
    <MemberContext>
      <ALTA_Inner>
        <ALTA_MemberContents />
      </ALTA_Inner>
    </MemberContext>
  );

  useEffect(() => {
    document.title = 'ALTA | 멤버 관리';
  }, []);

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
