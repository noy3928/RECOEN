import React, { useRef } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Button from 'src/components/ui/Button/Button';
import { theme } from 'src/style/theme';
import User from '../../../public/user.png';

interface Props {
  profileImg: string;
  commentLength: number;
}

const CommentForm = ({ profileImg, commentLength }: Props) => {
  const formRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = () => {
    if (formRef.current != null) console.log(formRef.current.value);
  };

  return (
    <Container>
      <Wrapper>
        <CommentText>댓글({commentLength})</CommentText>
        <Button label="작성하기" primary onClick={onSubmit} />
      </Wrapper>
      <Wrapper>
        <ImageWrapper>
          <Image
            src={User}
            alt="Profile Image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </ImageWrapper>
        <Form placeholder="댓글을 입력하세요." ref={formRef} />
      </Wrapper>
    </Container>
  );
};

export default CommentForm;

const Container = styled.form`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid ${theme.color.gray400};
  padding-top: 20px;
  margin-bottom: 50px;
`;

const CommentText = styled.div`
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 40px;
`;

const Form = styled.textarea`
  flex-grow: 1;
  height: 80px;
  border: 1px solid ${theme.color.gray400};
  border-radius: 8px;
  background: transparent;
  padding: 10px 10px;
  outline: none;
  resize: none;
  color: #bababa;
  transition: 0.2s ease-in-out;
  ::placeholder {
    color: #bababa;
  }
  :focus {
    border: 1px solid #3941ff;
  }
`;
