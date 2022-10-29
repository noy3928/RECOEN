import React, { useState } from 'react';
import { createArticle } from 'src/apis';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { openCreateModalStates } from 'src/recoil/permit';
import { useRouter } from 'next/router';

import Modal from '../Modal/Modal';
import ImageUpload from 'src/components/ImageUpload/ImageUpload';
import Button from 'src/components/ui/Button/Button';
import DescInput from 'src/components/Inputs/DescInput/DescInput';
import TagInput from 'src/components/Inputs/TagInput/TagInput';

const CreateArticleModal = () => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [description, setDescription] = useState<string>('');
  const setClose = useSetRecoilState(openCreateModalStates);
  const router = useRouter();

  const handleModalClose = () => {
    setClose(false);
  };

  const checkValidation = () => {
    if (!imgUrl) return false;
    if (description == '') return false;
    return true;
  };

  const handleOnClickSave = async () => {
    if (!checkValidation()) return;
    const res = await createArticle({
      imgUrl,
      description,
    });
    if (res.status == 200) router.push('/article');
  };

  return (
    <Modal handleOpenModal={handleModalClose}>
      <>
        <Wrapper data-testid="createArticleModal">
          <H2>글 설정</H2>
          <ButtonWrapper>
            <Button label="취소" onClick={handleModalClose} />
            <Button label="저장" primary onClick={handleOnClickSave} />
          </ButtonWrapper>
        </Wrapper>
        <Guide>대표이미지</Guide>
        <ImageUpload setImgUrl={setImgUrl} />
        <Guide>태그(최대 3개)</Guide>
        <TagInput />
        <Guide>설명글</Guide>
        <DescInput onChange={setDescription} />
      </>
    </Modal>
  );
};

export default CreateArticleModal;

const Guide = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #9499a1;
  text-align: left;
  width: 350px;
`;

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 24px 42px;
  border-bottom: 1px solid #494c56;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const H2 = styled.h2`
  color: #e3e3e3;
  margin: 0px;
  font-weight: 400;
`;
