type Alert = {
  id: number;
  contents: string;
  read: boolean;
};

export type Study = {
  id: number;
  name: string;
  introduction: string;
  language: string;
  maxPeople: number;
  joined: number;
};

export type UserData = {
  nickname: string;
  githubMail: string;
  email: string;
  alertSetting: string;
  introduction: string;
  time: string;
  languageList: string[] | null;
  profileUrl: string;
  studyList: Study[] | null;
};

export const defaultUserData = {
  nickname: '',
  githubMail: '',
  email: '',
  alertSetting: '',
  introduction: '',
  time: '',
  languageList: null,
  profileUrl: '',
  studyList: [],
};

export type AlertData = {
  alertId: number;
  senderNickName: string;
  type: string;
  content: string;
  time: Date;
  url: string;
  isChecked: boolean;
};

export const defaultAlertData = {
  alertId: 0,
  senderNickName: '',
  type: '',
  content: '',
  time: new Date(),
  url: '',
  isChecked: false,
};
