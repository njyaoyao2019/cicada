import { useLocation } from 'react-router-dom';
import { PLAYER_PATH, ROOT_PATH } from '@/constants/route';

export default () => {
  const { pathname } = useLocation();

  let title = '知了';
  switch (pathname) {
    case ROOT_PATH.PLAYER:
    case ROOT_PATH.PLAYER + PLAYER_PATH.EXPLORATION: {
      title = '发现';
      break;
    }
    case ROOT_PATH.PLAYER + PLAYER_PATH.SEARCH: {
      title = '搜索';
      break;
    }
    case ROOT_PATH.PLAYER + PLAYER_PATH.MY_MUSIC: {
      title = '我的音乐';
      break;
    }
    case ROOT_PATH.PLAYER + PLAYER_PATH.USER_MANAGE: {
      title = '用户管理';
      break;
    }
    case ROOT_PATH.PLAYER + PLAYER_PATH.SETTING: {
      title = '设置';
      break;
    }
    case ROOT_PATH.PLAYER + PLAYER_PATH.SHARED_MUSICBILL_INVITATION: {
      title = '共享乐单邀请';
      break;
    }
    case ROOT_PATH.PLAYER + PLAYER_PATH.PUBLIC_MUSICBILL_COLLECTION: {
      title = '收藏的公开乐单';
      break;
    }
  }

  return title;
};
