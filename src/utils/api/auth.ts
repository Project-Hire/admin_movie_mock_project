import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

export const AUTH_TOKEN = '@token_admin_movie_mock_project';
export const USER_INFO = '@admin_movie_mock_project_info';

export const isLogin = () => {
  return (
    !!localStorage.getItem(USER_INFO) && !!localStorage.getItem(AUTH_TOKEN)
  );
};
