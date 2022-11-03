import React from 'react';
import styled from '@emotion/styled';

interface Props {
  text: string;
  listLength: number;
}

const HeroText = ({ text, listLength }: Props) => {
  return <Text listLength={listLength}>{text}</Text>;
};

interface StyleProps {
  listLength: number;
}

const Text = styled.h1<StyleProps>`
  font-size: 80px;
  position: relative;
  :after {
    content: '${(props) => props.listLength}';
    font-size: 40px;
    position: absolute;
    top: 0;
  }
`;

export default HeroText;