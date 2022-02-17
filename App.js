import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import Nav from './container/Nav';

const App = () => {
  return (
    <RecoilRoot>
      <Nav />
    </RecoilRoot>
  );
};

export default App;
