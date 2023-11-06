import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../fireBase/FireBaseConfigs";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NoImageFounded from "../assets/images/no-document-or-data-found-ui-illustration-design-free-vector.jpg";
import FileUploadSchema from "../models/FileUploadSchema";
import Button from "../ui/Button";
const FileUpload = () => {
  // State variables to manage image uploads, URLs, and loading status
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Flag to track whether images are loaded

  // Reference to the Firebase storage location where images are stored
  const imagesListRef = ref(storage, "images/");

  // Form validation setup using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(FileUploadSchema),
  });

  // Function to handle image upload
  const onSubmitHandler = () => {
    try {
      if (imageUpload == null) return; // Ensure an image is selected
      const UserID = localStorage.getItem("UserID"); // Retrieve the user's token from local storage

      const imageRef = ref(
        storage,
        `images/${UserID}/${imageUpload.name + v4()}`
      );

      // Initiate the image upload task
      const uploadTask = uploadBytes(imageRef, imageUpload);
      toast.success("Image Upload Started");

      // Listen for upload success
      uploadTask
        .then((snapshot) => {
          toast.success("Image Uploaded Successfully");

          // Retrieve the download URL of the uploaded image
          getDownloadURL(snapshot.ref).then((url) => {
            // Update the list of image URLs
            setImageUrls((prev) => [...prev, url]);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading image. Please try again.");
        });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };

  // Fetch image URLs from Firebase Storage and update state
  useEffect(() => {
    if (!isLoaded) {
      const UserID = localStorage.getItem("UserID"); // Retrieve the user's ID from local storage

      if (UserID) {
        const userImagesListRef = ref(storage, `images/${UserID}`);

        listAll(userImagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              // Update the list of image URLs
              setImageUrls((prev) => [...prev, url]);
            });
          });
          setIsLoaded(true); // Set the flag to true after loading images
        });
      }
    }
  }, [isLoaded, imageUrls]);

  return (
    <div className="flex flex-col  py-10">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col sm:flex-row justify-start sm:justify-center sm:items-center gap-5 sm:gap-10"
      >
        <div className="flex flex-col gap-1 items-start">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="attachment"
          >
            Upload your image
          </label>
          <input
            id="attachment"
            {...register("attachment", { required: true })}
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            placeholder="SVG, PNG, JPG or GIF (MAX: 1MB)"
            className="block w-full sm:w-[50vw] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
          />
          <p
            className="mt-1 ps-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PNG, JPG or JPEG (MAX: 1MB).
          </p>
        </div>
        <Button className="" type="submit">
          {" "}
          Upload Image
        </Button>
      </form>
      <p className="text-red-500 mx-auto">{errors.attachment?.message}</p>
      <p className="text-red-500 mx-auto">{errors.error?.message}</p>

      <div>
        {!isLoaded && <div>loading...</div>}

        {imageUrls.length > 0 && isLoaded ? (
          <div className="mt-10  ">
            {imageUrls.map((url, index) => {
              return (
                <img
                  key={url}
                  src={url}
                  alt={`Image${index}`}
                  className="mx-auto w-[60vw] mb-5"
                />
              );
            })}
          </div>
        ) : (
          <img src={NoImageFounded} alt="No images found" className="mx-auto" />
        )}
      </div>
    </div>
  );
};

export default FileUpload;
