import React, { Fragment, useState, useRef, useEffect } from "react";
import Cropper from "cropperjs";
import { Button } from "antd";
import { default as Upload, RcFile } from "antd/lib/upload";
import styled from "styled-components";

import imgUploadDefault from "../../assets/img/upload-account-cover.png";
import imgUploadDefaultHover from "../../assets/img/upload-account-cover-hover.png";

import "cropperjs/dist/cropper.min.css";
import "./ImageUploader.css";

interface ImgPreview {
  width: number;
  height: number;
  src: string | ArrayBuffer | null;
}

interface ImageEl {
  current: any;
}

interface ImageUploaderProps {
  className: string;
  type: string;
  onUpload: any;
  outputWidth: number;
  outputHeight: number;
  image: string;
}

interface CanvasOpt {
  width: number;
  height: number;
}

const Component = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  font-variant: tabular-nums;
`;

const Illustrate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  color: #656565;

  & > div {
    margin-bottom: 9px;
  }

  & > span {
    font-size: 12px;
  }
`;

interface CoverProps {
  image?: string;
}

const Cover = styled.div<CoverProps>`
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

const ImageUploader = ({
  className = "",
  type = "",
  image,
  onUpload,
  outputWidth,
  outputHeight,
}: Partial<ImageUploaderProps>) => {
  const [croppedView, setCroppedView] = useState("");
  const [imgPreview, setImgPreview] = useState<Partial<ImgPreview>>({});
  //let cropper: Cropper | null = null;
  const cropper = useRef<any>(null);
  const imageEl = useRef<HTMLImageElement | HTMLCanvasElement>(null);

  useEffect(() => {
    if (!cropper.current && imgPreview.src) {
      //@ts-ignore
      cropper.current = new Cropper(imageEl.current, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
          //@ts-ignore
          const canvas = cropper.current.getCroppedCanvas();
          setCroppedView(canvas.toDataURL("image/png"));
        },
      });
    }
  });

  const handlePreview = (opts: { file: Blob }) => {
    const { file } = opts;

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // if the file is not an image, ignore
      if (!file.type.match("image.*")) {
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        //@ts-ignore
        const previewUrl = e.target.result;

        img.onload = () => {
          setImgPreview({ src: previewUrl, width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = (event, source, lineno, colno, error) => {
          console.log("image error", event, source, lineno, colno, error);
        };
        //@ts-ignore
        img.src = previewUrl;
      };

      reader.readAsDataURL(file);
    } else {
      alert("The File APIs are not fully supported in this browser.");
    }
  };

  const handleCancel = () => {
    //@ts-ignore
    window.URL.revokeObjectURL(imgPreview.src);
    //@ts-ignore

    cropper.current.destroy();

    cropper.current = null;
    setImgPreview({});
  };

  const handleUpload = () => {
    const canvasOpt: Partial<CanvasOpt> = {};
    if (outputWidth && outputHeight) {
      canvasOpt.width = outputWidth;
      canvasOpt.height = outputHeight;
    }

    //@ts-ignore
    cropper.current.getCroppedCanvas(canvasOpt).toBlob((blob) => {
      console.log(blob);
      onUpload(blob);
      handleCancel();
    });
  };

  const handleFileSize = (file: RcFile, fileList: RcFile[]) => {
    const SIZE_LIMIT = 5000000;
    if (file.size > SIZE_LIMIT) {
      console.log("file too big");
      return false;
    }
    return true;
  };

  let imgWidth, imgHeight;
  if (imgPreview && imgPreview.width && imgPreview.height) {
    imgWidth = Math.min(imgPreview.width, 440);
    imgHeight = (imgPreview.height / imgPreview.width) * imgWidth;
  }
  imgWidth = 440;
  imgHeight = 440;

  /* style={{
    backgroundImage: image
      ? `url(${image})`
      : `url(data:image/png;base64,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)`,
  }} */

  return (
    <Component>
      <Cover image={image}>
        <Upload
          className={className}
          showUploadList={false}
          customRequest={handlePreview}
          beforeUpload={handleFileSize}
        />
        {imgPreview.src && (
          <div className="img-uploader">
            {/* @ts-ignore */}
            <div className="img-uploader-container" style={{ width: imgWidth, height: imgHeight }}>
              {/* @ts-ignore */}
              <img ref={imageEl} src={imgPreview.src} alt="source" />
            </div>
            <img
              src={croppedView}
              className={"img-uploader-preview " + type}
              alt="cropped preview"
            />
          </div>
        )}
        {imgPreview.src && (
          <div className="actions-bar">
            <Button type="dashed" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="dashed" onClick={handleUpload}>
              OK
            </Button>
          </div>
        )}
      </Cover>
      <Illustrate>
        <div>Tap to add an image</div>
        <span>Picture size should not exceed 5M</span>
      </Illustrate>
    </Component>
  );
};

export default ImageUploader;