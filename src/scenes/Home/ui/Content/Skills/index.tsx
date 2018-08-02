import * as React from 'react';
import styled from 'styled-components';
import { clamp } from 'lodash';

import { SkillsList } from './List';

const SkillsHolder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 0.33s all;
  transform: translate3d(0, 20px, 0);
  will-change: transform;
`;

const Holder = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  min-width: 220px;
  height: 2em;
  border-radius: 12px;
  transition: 0.33s all;
  &:hover {
  }
`;

const ContentHolderInner = styled.div`
  position: relative;
  align-self: stretch;
`;

interface Props {
  skills: string[];
}

export interface TeamMemberCardData extends Props {}

interface State {
  skillsBrowsingProgress: number;
}

export class Skills extends React.Component<Props, State> {
  state: State = {
    skillsBrowsingProgress: 0,
  };
  handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.pageX - rect.left; //x position within the element
    const offsetMargin = 40;
    const progressX =
      (offsetX - offsetMargin) / (rect.width - offsetMargin * 2);

    this.setState({
      skillsBrowsingProgress: clamp(progressX, 0, 1),
    });
  };

  render() {
    const { skills } = this.props;
    const { skillsBrowsingProgress } = this.state;
    return (
      <Holder onMouseMove={this.handleMouseMove}>
        <ContentHolderInner>
          {skills &&
            skills.length > 0 && (
              <SkillsHolder>
                <SkillsList
                  browsingProgress={skillsBrowsingProgress}
                  skills={skills}
                />
              </SkillsHolder>
            )}
        </ContentHolderInner>
      </Holder>
    );
  }
}
