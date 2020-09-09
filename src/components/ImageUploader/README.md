| Attribute    | Type               | Description                                  |
| ------------ | ------------------ | -------------------------------------------- |
| className    | string             | classname to attach to main parent component |
| image        | url                | old image. Defaults to upload image if empty |
| onUpload     | `(blob) => {}`     |                                              |
| outputHeight | number             | Height of cropped image                      |
| outputWidth  | number             | Width of cropped image                       |
| previewType  | `circle`, `square` | `circle`                                     |
| themeName    | `default`, `dark`  | Base theme for component                     |
| sizeLimit    | number             | file size limit in bytes. Default: 5000000   |
