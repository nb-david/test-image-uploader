export interface CoverProps {
  image?: string;
}

export interface ImgPreview {
  width: number;
  height: number;
  src: string | ArrayBuffer | null;
}

export interface ImageUploaderProps {
  className?: string;
  type: string;
  onUpload: (blob: any) => void;
  outputWidth?: number;
  outputHeight?: number;
  image?: string;
}

export interface CanvasOpt {
  width: number;
  height: number;
}
