import { sample, times, random } from 'lodash';
import * as React from 'react';
import { Bodies, Body } from 'matter-js';
import { Thrower } from 'ui/utils';

function getRandomAngularSpeed() {
  return random(-0.4, 0.4, true);
}

const colors = [
  '#282A36',
  '#fd73b5',
  '#feb96c',
  '#8BE9FD',
  '#D7E0F6',
  '#A781F2',
  '#2A66DD',
  '#5ED46F',
];

function createCodePieceBody(x: number, y: number) {
  const randomColor = sample(colors);
  const sprite = Bodies.rectangle(x, y, random(10, 80), 2, {
    chamfer: { radius: 2 },

    angle: random(-0.05, 0.05),
    render: {
      fillStyle: randomColor,
      // sprite: {
      //   texture,
      //   xScale: 0.2,
      //   yScale: 0.2,
      // },
    },
  });
  return sprite;
}

export function Confetti() {
  return <Thrower randomSpriteGetter={createCodePieceBody} sprites={[]} />;
}
