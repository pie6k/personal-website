import * as React from 'react';
import styled, { css } from 'styled-components';

const Holder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  font-family: 'Playfair Display', serif;
  padding: 100px;
`;
const TitleHolder = styled.div`
  font-size: 40pt;
  text-align: center;
  line-height: 1.5;
  font-family: 'Slabo 27px', serif;
  font-family: 'Playfair Display', serif;
`;

const SkillsHolder = styled.div`
  max-width: 400px;
  overflow: hidden;
`;

interface Props {
  prop?: string;
}

export class Content extends React.Component<Props> {
  render() {
    const { prop } = this.props;
    return (
      <Holder>
        <TitleHolder>Adam Pietrasiak</TitleHolder>
        <SkillsHolder>
          {/* <Skills
            browsingProgress={1}
            skills={[
              'React',
              'React Native',
              'Typescript',
              'Redux',
              'Mobix',
              'Interaction Design',
            ]}
          /> */}
        </SkillsHolder>
      </Holder>
    );
  }
}
