import * as React from 'react';
import { sample, times, random, throttle } from 'lodash';
import { Engine, Render, World, Bodies, Body } from 'matter-js';
import styled from 'styled-components';

import { MouseThrow, MouseThrowData } from 'ui/utils/MouseThrow';

const Holder = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  flex-grow: 1;
  align-self: stretch;
`;
const ShadowCaster = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

function getWindowDimensions() {
  return {
    width: window.screen.availWidth,
    height: window.screen.availHeight,
  };
}

function getRandomAngularSpeed() {
  return random(-0.15, 0.15, true);
}

function createMatter(element: HTMLDivElement) {
  const { width } = getWindowDimensions();
  const engine = Engine.create({
    timing: { timeScale: 0.5, timestamp: 0 },
    // world: { gravity: { y: -1, x: 0, scale: 1 }, bounds:  },
  });

  engine.world.gravity.y = -0.3;

  const renderer = Render.create({
    element,
    engine,
    options: {
      width: element.clientWidth,
      height: element.clientHeight,
      // showAngleIndicator: false,
      wireframes: false,
    },
  });
  renderer.options.wireframeBackground = 'transparent';
  renderer.options.background = 'transparent';
  return { engine, renderer };
}

interface Props {
  sprites: Body[];
  randomSpriteGetter: (x: number, y: number) => Body;
  initialThrows?: number;
}

export class Thrower extends React.Component<Props> {
  private holderReference: HTMLDivElement;
  private engine: Engine;
  private renderer: Render;

  constructor(props: any) {
    super(props);
    this.handleThrow = throttle(this.handleThrow, 40, { leading: true });
  }

  private getRandomSprite = () => {
    const { sprites } = this.props;
    return sample(sprites);
  };

  componentDidMount() {
    const { engine, renderer } = createMatter(this.holderReference);
    this.engine = engine;
    this.renderer = renderer;
    Engine.run(engine);
    Render.run(renderer);

    this.throwInitial();
  }

  throwInitial() {
    const { initialThrows } = this.props;
    if (!initialThrows) {
      return;
    }
    times(initialThrows, i => {
      setTimeout(this.createRandomThrow, i * 2);
    });
  }

  createRandomThrow = () => {
    const { holderReference } = this;
    const throwData: MouseThrowData = {
      x: holderReference.clientWidth / 2,
      y: holderReference.clientHeight / 2,
      vx: random(-50, 50),
      vy: random(-50, 50),
    };
    this.handleThrow(throwData);
  };

  attachHolderRef = (elem: HTMLDivElement) => {
    this.holderReference = elem;
  };

  slowDown = () => {
    this.engine.timing.timeScale = 0.05;
  };

  speedUp = () => {
    this.engine.timing.timeScale = 0.33;
  };

  handleThrow = (data: MouseThrowData) => {
    const { randomSpriteGetter } = this.props;
    const sprite = randomSpriteGetter(data.x, data.y);
    // const sprite = this.getRandomSprite();
    // const sprite = Bodies.rectangle(data.x, data.y, 50, 20, {
    //   render: {
    //     sprite: {
    //       // texture,
    //       xScale: 0.2,
    //       yScale: 0.2,
    //     },
    //   },
    // });

    Body.setVelocity(sprite, { x: data.vx / 5, y: data.vy / 5 });
    // Body.setAngularVelocity(sprite, getRandomAngularSpeed());
    World.add(this.engine.world, [sprite]);
    setTimeout(() => {
      World.remove(this.engine.world, sprite);
    }, 10 * 1000);
  };

  render() {
    return (
      <MouseThrow onMouseThrow={this.handleThrow}>
        <Holder
          onMouseDown={this.slowDown}
          onMouseUp={this.speedUp}
          innerRef={this.attachHolderRef}
        />
        <ShadowCaster />
      </MouseThrow>
    );
  }
}
