export interface CoverProps {
  image?: string;
}

export interface ImgPreview {
  width: number;
  height: number;
  src: string | ArrayBuffer | null | undefined;
}

export interface ImageUploaderProps {
  className?: string;
  previewType: "circle" | "square";
  onUpload: (blob: any) => void;
  outputWidth?: number;
  outputHeight?: number;
  image?: string;
  sizeLimit?: number;
}

export interface CanvasOpt {
  width: number;
  height: number;
}
