import * as yup from "yup";

// Define a Yup schema for file upload validation
const FileUploadSchema = yup.object().shape({
  attachment: yup
    .mixed()
    .test("fileSize", "File Size is too large", (value) => {
      if (value && value?.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 1048576) {
            return false; // Return false if any file size is too large
          }
        }
      }
      return true; // Return true if all file sizes are within the limit
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].type.startsWith("image/")) {
            return false; // Return false if any file has an unsupported format
          }
        }
      }
      return true; // Return true if all files have supported image formats
    }),
});

export default FileUploadSchema;
