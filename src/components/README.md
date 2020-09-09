<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Button](#button)
- [Image Uploader](#image-uploader)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Button


<a name="buttonreadmemd"></a>

| Attribute | Type                                          | Description                                                         |
| --------- | --------------------------------------------- | ------------------------------------------------------------------- |
| onClick   | `() => void`                                  | Handler when button is clicked                                      |
| type      | `text, link ,ghost, default, primary, dashed` | Types are from [antd Button](https://ant.design/components/button/) |

# Image Uploader


<a name="imageuploaderreadmemd"></a>

| Attribute    | Type               | Description                                  |
| ------------ | ------------------ | -------------------------------------------- |
| className    | string             | classname to attach to main parent component |
| image        | url                | old image. Defaults to upload image if empty |
| onUpload     | `(blob) => {}`     |
| outputHeight | number             | Height of cropped image                      |
| outputWidth  | number             | Width of cropped image                       |
| previewType  | `circle`, `square` | `circle`                                     | type |
| themeName    | `default`, `dark`  | Base theme for component                     |


<a name="readmemd"></a>

