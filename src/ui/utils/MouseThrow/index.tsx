import * as React from 'react';
import { throttle } from 'lodash';
import styled from 'styled-components';

// import { MouseEvent } from 'react';
const Holder = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: stretch;
  justify-content: stretch;
`;

interface Position {
  x: number;
  y: number;
}

interface Speed {
  vx: number;
  vy: number;
}

interface MoveData extends Position {
  timeStamp: number;
}

export interface MouseThrowData extends Position, Speed {}

interface Props {
  onMouseThrow: (throwData: MouseThrowData) => void;
  children: React.ReactNode;
}

function trimEventsHistory(events: MoveData[], time = 100) {
  const lastEvent = events[events.length - 1];

  return events.filter(event => {
    return event.timeStamp > lastEvent.timeStamp - time;
  });
}

function getAvgSpeed(events: MoveData[]) {
  const [firstEvent] = events;
  const lastEvent = events[events.length - 1];

  return {
    vx: lastEvent.x - firstEvent.x,
    vy: lastEvent.y - firstEvent.y,
  };
}

export class MouseThrow extends React.Component<Props> {
  private moveHistory: MoveData[] = [];

  constructor(props: Props) {
    super(props);
    this.handleMouseMoveStop = throttle(this.handleMouseMoveStop, 66);
  }

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { timeStamp, nativeEvent: { offsetX, offsetY } } = event;
    this.moveHistory.push({ timeStamp, x: offsetX, y: offsetY });
    this.moveHistory = trimEventsHistory(this.moveHistory);
    this.handleMouseMoveStop();
  };

  handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const { timeStamp, nativeEvent: { touches } } = event;
    const { pageX, pageY } = touches.item(0);
    this.moveHistory.push({ timeStamp, x: pageX, y: pageY });
    this.moveHistory = trimEventsHistory(this.moveHistory);
    this.handleMouseMoveStop();
    // console.log(event);
  };

  clearMoveHistory = () => {
    this.moveHistory = [];
  };

  getLastMousePosition = () => {
    const { moveHistory } = this;
    const lastEvent = moveHistory[moveHistory.length - 1];
    return {
      x: lastEvent.x,
      y: lastEvent.y,
    };
  };

  handleMouseMoveStop = () => {
    const { onMouseThrow } = this.props;
    const speed = getAvgSpeed(this.moveHistory);
    const speedSume = Math.abs(speed.vx) + Math.abs(speed.vy);
    if (speedSume < 10) {
      return;
    }
    const position = this.getLastMousePosition();
    if (!onMouseThrow) {
      return;
    }
    onMouseThrow(Object.assign({}, speed, position));
  };

  render() {
    return (
      <Holder
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleTouchMove}
      >
        {this.props.children}
      </Holder>
    );
  }
}
