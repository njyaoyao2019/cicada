import { CSSVariable } from '@/global_style';
import styled from 'styled-components';
import getResizedImage from '@/server/asset/get_resized_image';
import { Music } from '../constants';
import MusicInfo from '../components/music_info';

const Style = styled.div`
  margin: 10px 0;

  background-color: ${CSSVariable.BACKGROUND_COLOR_LEVEL_ONE};

  > .label {
    margin: 0 20px;
    padding: 20px 0 10px 0;

    font-size: 12px;
    color: ${CSSVariable.TEXT_COLOR_SECONDARY};
  }
`;

function SubMusicList({
  musicList,
  label,
}: {
  musicList: Omit<Music, 'asset' | 'type' | 'aliases'>[];
  label: string;
}) {
  return (
    <Style>
      <div className="label">{label}</div>
      <div>
        {musicList.map((music) => (
          <MusicInfo
            key={music.id}
            className="item"
            musicId={music.id}
            musicName={music.name}
            musicCover={getResizedImage({ url: music.cover, size: 80 })}
            singers={music.singers}
          />
        ))}
      </div>
    </Style>
  );
}

export default SubMusicList;
