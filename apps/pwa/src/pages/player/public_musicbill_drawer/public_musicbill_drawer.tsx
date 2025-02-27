import Drawer from '@/components/drawer';
import { CSSProperties, UIEventHandler, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { flexCenter } from '@/style/flexbox';
import ErrorCard from '@/components/error_card';
import Spinner from '@/components/spinner';
import absoluteFullSize from '@/style/absolute_full_size';
import { EventType } from '../eventemitter';
import useDynamicZIndex from '../use_dynamic_z_index';
import useData from './use_data';
import { MINI_INFO_HEIGHT, Musicbill as MusicbillType } from './constants';
import Info from './info';
import MiniInfo from './mini_info';
import MusicList from './music_list';
import Toolbar from './toolbar';

const bodyProps: { style: CSSProperties } = {
  style: {
    width: 'min(85%, 400px)',
  },
};
const Container = styled(animated.div)`
  ${absoluteFullSize}
`;
const StatusContainer = styled(Container)`
  ${flexCenter}
`;
const Style = styled.div`
  ${absoluteFullSize}

  >.scrollable {
    ${absoluteFullSize}

    padding-bottom: env(safe-area-inset-bottom, 0);

    overflow: auto;

    > .tab-content {
      position: relative;
    }
  }
`;

function Musicbill({
  musicbill,
  collected,
}: {
  musicbill: MusicbillType;
  collected: boolean;
}) {
  const [miniInfoVisible, setMiniInfoVisible] = useState(false);
  const onScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const { clientWidth, scrollTop } = e.target as HTMLDivElement;
    return setMiniInfoVisible(scrollTop >= clientWidth - MINI_INFO_HEIGHT);
  };

  return (
    <Style>
      <div className="scrollable" onScroll={onScroll}>
        <Info musicbill={musicbill} />
        <Toolbar musicbill={musicbill} collected={collected} />
        <MusicList musicList={musicbill.musicList} />
      </div>
      {miniInfoVisible ? <MiniInfo musicbill={musicbill} /> : null}
    </Style>
  );
}

function Wrapper({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const zIndex = useDynamicZIndex(EventType.OPEN_PUBLIC_MUSICBILL_DRAWER);
  const { data, reload, collected } = useData(id);

  const transitions = useTransition(data, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <Drawer
      open={open}
      onClose={onClose}
      maskProps={{
        style: { zIndex },
      }}
      bodyProps={bodyProps}
    >
      {transitions((style, d) => {
        const { error, loading, musicbill } = d;
        if (error) {
          return (
            <StatusContainer style={style}>
              <ErrorCard errorMessage={error.message} retry={reload} />
            </StatusContainer>
          );
        }
        if (loading) {
          return (
            <StatusContainer style={style}>
              <Spinner />
            </StatusContainer>
          );
        }
        return (
          <Container style={style}>
            <Musicbill musicbill={musicbill!} collected={collected} />
          </Container>
        );
      })}
    </Drawer>
  );
}

export default Wrapper;
