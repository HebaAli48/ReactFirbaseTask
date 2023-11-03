import * as yup from "yup";

const FileUploadSchema = yup.object().shape({
  attachment: yup
    .mixed()
    .test("fileSize", "File Size is too large", (value) => {
      if (value && value?.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 1048576) {
            return false;
          }
        }
      }
      return true;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].type.startsWith("image/")) {
            return false;
          }
        }
      }
      return true;
    }),
});

export default FileUploadSchema;
