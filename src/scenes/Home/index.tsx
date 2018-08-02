import * as React from 'react';
import styled from 'styled-components';

import { Head } from 'ui/utils';

import { Portrait, Content, Confetti } from './ui';

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(90deg, #b5b5b5, #787878);
`;

const ContentHolder = styled.div`
  flex-grow: 1;
  align-self: center;
`;

interface Props {}

export default class HomeScene extends React.Component<Props> {
  render() {
    return (
      <Holder>
        <Head />
        <Confetti />
        <ContentHolder>
          <Content />
        </ContentHolder>
        <Portrait />
      </Holder>
    );
  }
}
