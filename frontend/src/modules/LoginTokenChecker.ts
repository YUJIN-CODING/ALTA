import { refreshToken } from '../api/request';

// 1 : 로그인 확인
// 0 : 토큰 만료
// -1 : 토큰 없음 -> 로그인 필요
export function loginTokenChecker(): number {
  const localJwtToken: string | null = localStorage.getItem('jwt');

  if (!localJwtToken) return -1;

  const payload: string = localJwtToken.split('.')[1];
  const expireTime: number = JSON.parse(window.atob(payload)).exp;
  const now: number = Math.floor(new Date().getTime() / 1000);

  if (now > expireTime) return 0;

  return 1;
}

type CheckLoginType = {
  status: boolean;
  message: string;
};

export async function checkLogin(): Promise<CheckLoginType> {
  const loginStatus: number = loginTokenChecker();

  if (loginStatus === -1) return { status: false, message: 'JWT002' };
  else if (loginStatus === 0) {
    try {
      const response = await refreshToken();

      localStorage.setItem('jwt', response.jwtAt);
      return { status: true, message: '인증되었습니다' };
    } catch (err: any) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('refresh');
      localStorage.removeItem('userData');

      return { status: false, message: err.code };
    }
  }

  return { status: true, message: '인증되었습니다' };
}
