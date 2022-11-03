/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useS3Upload } from 'next-s3-upload';
import styled from '@emotion/styled';
import { useImageUrl } from 'src/hooks/useCreatArticle';

const ImageUpload = () => {
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const { imgUrl, setUrl } = useImageUrl();

  const handleFileChange = async (file: File) => {
    const { url } = await uploadToS3(file);
    setUrl(url);
  };
  return (
    <div>
      <FileInput data-testid="fileinput" onChange={handleFileChange} />
      {imgUrl ? (
        <Img
          src={imgUrl}
          alt="preview image"
          width="200"
          height="200"
          onClick={openFileDialog}
        />
      ) : (
        <UploadBox onClick={openFileDialog}>이미지 추가</UploadBox>
      )}
    </div>
  );
};

export default ImageUpload;

const UploadBox = styled.button`
  width: 350px;
  height: 220px;
  border: 1px solid #3c3e44;
  background-color: #292b2e;
  color: #494c56;
  cursor: pointer;
  margin-bottom: 40px;
  border-radius: 4px;
`;

const Img = styled.img`
  width: 350px;
  height: 220px;
  object-fit: cover;
  cursor: pointer;
`;
