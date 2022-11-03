import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { theme } from 'src/style';

import Menus from '../Menus/Menus';
import WritePageMenus from '../WritePageMenus/WritePageMenus';

const NavBar = () => {
  const router = useRouter();

  const resolvePosition = () => {
    const pathname = router.pathname;
    if (pathname == '/article/[id]') return 'position: absolute';
    if (pathname == '/write') return 'position: relative';
    return 'position:fixed';
  };

  const resolveBackground = () => {
    const pathname = router.pathname;
    if (pathname == '/article/[id]')
      return `background: ${theme.color.bluredBlack};`;
    return null;
  };

  return (
    <FixedContainer
      data-testid="fixedContainer"
      position={resolvePosition()}
      background={resolveBackground()}
    >
      <Container>
        <Link href="/">
          <Title>recoen.</Title>
        </Link>
        {router.pathname == '/write' ? <WritePageMenus /> : <Menus />}
      </Container>
    </FixedContainer>
  );
};

export default NavBar;

interface StyleProps {
  position: string;
  background: string | null;
}

const FixedContainer = styled.div<StyleProps>`
  ${({ position }) => position};
  ${({ background }) => background};
  width: 100%;
  z-index: 99;
  border-bottom: 1px solid rgba(74, 76, 85, 0.3);
`;

const Container = styled.header`
  width: 1200px;
  height: 70px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
`;