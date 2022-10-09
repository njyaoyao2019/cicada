import { PLAYER_PATH, ROOT_PATH } from '@/constants/route';
import {
  MdLooks,
  MdOutlineSettings,
  MdOutlineMusicVideo,
} from 'react-icons/md';
import MenuItem from './menu_item';

function Menu() {
  return (
    <div>
      <MenuItem
        to={`${ROOT_PATH.PLAYER}${PLAYER_PATH.HOME}`}
        label="发现"
        icon={<MdLooks />}
      />
      <MenuItem
        to={`${ROOT_PATH.PLAYER}${PLAYER_PATH.MY_MUSIC}`}
        label="我的音乐"
        icon={<MdOutlineMusicVideo />}
      />
      <MenuItem
        to={`${ROOT_PATH.PLAYER}${PLAYER_PATH.SETTING}`}
        label="设置"
        icon={<MdOutlineSettings />}
      />
    </div>
  );
}

export default Menu;
