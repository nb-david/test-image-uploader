import React, { Fragment, useState, useRef, useEffect } from "react";
import Cropper from "cropperjs";

import { default as Upload, RcFile } from "antd/lib/upload";

import { StyledCover, StyledIllustrate, StyledComponent } from "./styled";
import { ImageUploaderProps, ImgPreview, CanvasOpt } from "./types";
import Button from '../Button';
import Theme, { ThemeProps } from "../../themes";

import "cropperjs/dist/cropper.min.css";

const defaultProps = {
  type: "circle",
  themeName: "default"
}

const ImageUploader = ({
  className,
  type,
  image,
  onUpload,
  outputWidth,
  outputHeight,
  themeName,
}: ImageUploaderProps & ThemeProps) => {
  const [croppedView, setCroppedView] = useState("");
  const [imgPreview, setImgPreview] = useState<Partial<ImgPreview>>({});
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

  return (
    <Theme themeName={themeName}>
      <StyledComponent>
        <StyledCover image={image}>
          <Upload
            className={className}
            showUploadList={false}
            customRequest={handlePreview}
            beforeUpload={handleFileSize}
          />
          {imgPreview.src && (
            <div className="img-uploader">
              {/* @ts-ignore */}
              <div
                className="img-uploader-container"
                style={{ width: imgWidth, height: imgHeight }}
              >
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
        </StyledCover>
        <StyledIllustrate>
          <div>Tap to add an image</div>
          <span>Picture size should not exceed 5M</span>
        </StyledIllustrate>
      </StyledComponent>
    </Theme>
  );
};

ImageUploader.defaultProps = defaultProps;

export default ImageUploader;
