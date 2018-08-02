import * as React from 'react';
import styled from 'styled-components';

import portraitUrl from './assets/portrait.png';

const Holder = styled.div`
  height: 66vh;
  max-width: 80vw;
  width: 700px;
  background-position: bottom center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${portraitUrl});
  image-rendering: -webkit-optimize-contrast;
  position: relative;
  z-index: 100;
  pointer-events: none;
`;

interface Props {}

export function Portrait({  }: Props) {
  return <Holder />;
}
