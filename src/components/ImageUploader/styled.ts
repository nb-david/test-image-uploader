import styled from "styled-components";

import { CoverProps } from "./types";
import imgUploadDefault from "../../assets/img/upload-account-cover.png";
import imgUploadDefaultHover from "../../assets/img/upload-account-cover-hover.png";

export const StyledComponent = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  font-variant: tabular-nums;
  background: ${(props) => props.theme.colors.bgPrimary};
`;

export const StyledIllustrate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  color: ${(props) => props.theme.colors.primary};

  & > div {
    margin-bottom: 9px;
  }

  & > span {
    font-size: 12px;
  }
`;

export const StyledCover = styled.div<CoverProps>`
  position: relative;
  display: block;
  cursor: pointer;
  width: 70px;
  height: 70px;
  background-size: cover;
  border-radius: 50%;
  text-size-adjust: 100%;
  background-image: url(${(props) => (props.image ? props.image : imgUploadDefault)});

  &:hover {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${imgUploadDefaultHover});
      background-size: cover;
      pointer-events: none;
    }
  }

  & .ant-upload {
    background-position: center center;
    background-size: cover;
    display: block !important;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    outline: none;
  }
`;

export const StyledUpload = styled.div`
  display: flex;

  & > .cropper {
    float: left;
    width: 100%;
  }

  & .preview {
    width: 150px;
    height: 150px;
    float: left;
    margin-left: 10px;

    &.circle {
      border-radius: 200px;
    }
  }
`;

export const StyledActions = styled.div`
  clear: both;
  position: relative;
  width: 440px;
  padding-bottom: 20px;
  background-color: #fff;
  z-index: 100;
`;
