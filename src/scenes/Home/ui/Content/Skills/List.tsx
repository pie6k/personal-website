import * as React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

const Holder = styled.div``;

const SkillsScroller = styled.div`
  display: flex;
  transform: translate3d(0, 0, 0);
`;

const SkillHolder = styled.div`
  font-weight: bold;
  /* background: #fff;
  color: #000; */
  /* padding: 10px 10px; */
  white-space: nowrap;
  border-radius: 5px;
  margin-right: 20px;
`;

interface Props {
  skills: string[];
  browsingProgress: number;
}

export class SkillsList extends React.Component<Props> {
  private holderRef: HTMLDivElement;
  private scrollWidth: number;

  componentDidMount() {
    const { holderRef } = this;
    this.scrollWidth = holderRef.scrollWidth;
  }

  getScrollerOffset() {
    const { holderRef } = this;
    if (!holderRef) {
      return 0;
    }
    const { browsingProgress } = this.props;
    const width = holderRef.clientWidth;
    const scrollWidth = this.scrollWidth;

    const scrollablePart = scrollWidth - width;
    const position = -scrollablePart * browsingProgress;
    return position;
  }

  render() {
    const { skills } = this.props;
    return (
      <Holder
        innerRef={holder => {
          this.holderRef = holder;
        }}
      >
        <Motion
          defaultStyle={{ scrollOffset: 0 }}
          style={{ scrollOffset: spring(this.getScrollerOffset()) }}
        >
          {interpolatingStyle => {
            return (
              <SkillsScroller
                style={{
                  transform: `translate3d(${
                    interpolatingStyle.scrollOffset
                  }px, 0, 0)`,
                }}
              >
                {skills.map(skill => {
                  return <SkillHolder key={skill}>{skill}</SkillHolder>;
                })}
              </SkillsScroller>
            );
          }}
        </Motion>
      </Holder>
    );
  }
}
