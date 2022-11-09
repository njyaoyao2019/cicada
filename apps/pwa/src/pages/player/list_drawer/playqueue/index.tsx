import { memo, useContext } from 'react';

import Context from '../../context';
import Empty from './empty';
import Playqueue from './playqueue';

function Wrapper() {
  const { playqueue, currentPlayqueuePosition } = useContext(Context);
  return playqueue.length ? (
    <Playqueue
      playqueue={playqueue}
      currentPlayqueuePosition={currentPlayqueuePosition}
    />
  ) : (
    <Empty />
  );
}

export default memo(Wrapper);
