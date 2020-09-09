import React, { useState, useRef, useEffect } from "react";
import Cropper from "cropperjs";
import { default as Upload, RcFile } from "antd/lib/upload";

import {
  StyledCover,
  StyledIllustrate,
  StyledComponent,
  StyledUpload,
  StyledActions,
} from "./styled";
import { ImageUploaderProps, ImgPreview, CanvasOpt } from "./types";
import Button from "../Button";
import Theme, { ThemeProps } from "../../themes";

import "cropperjs/dist/cropper.min.css";

const ImageUploader = ({
  className,
  previewType = "circle",
  image,
  onUpload,
  outputWidth,
  outputHeight,
  themeName = "default",
  sizeLimit = 5000000,
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
    if (file.size > sizeLimit) {
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
      <StyledComponent className={className}>
        <StyledCover image={image}>
          <Upload
            showUploadList={false}
            customRequest={handlePreview}
            beforeUpload={handleFileSize}
            openFileDialogOnClick={false}
          />
        </StyledCover>
        <StyledIllustrate>
          <div>Tap to add an image</div>
          <span>Picture size should not exceed 5M</span>
        </StyledIllustrate>
      </StyledComponent>
      {imgPreview.src && (
        <StyledUpload>
          <div className="cropper" style={{ width: imgWidth, height: imgHeight }}>
            {/* @ts-ignore */}
            <img ref={imageEl} src={imgPreview.src} alt="source" />
          </div>
          <img src={croppedView} className={`preview ${previewType}`} alt="cropped preview" />
        </StyledUpload>
      )}
      {imgPreview.src && (
        <StyledActions>
          <Button type="dashed" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="dashed" onClick={handleUpload}>
            OK
          </Button>
        </StyledActions>
      )}
    </Theme>
  );
};

export default ImageUploader;
