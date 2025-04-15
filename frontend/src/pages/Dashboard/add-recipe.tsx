import cogoToast from "cogo-toast";
import { DragEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, TextArea } from "../../components";
import { useRecipe } from "../../hooks";
import { validateImageType } from "../../utils";
import { ImageUploader } from "./common/image-uploader";

export const AddRecipe = () => {
  const navigate = useNavigate();
  const { loading, addRecipe } = useRecipe();
  const [state, setState] = useState({
    title: "",
    note: "",
    description: "",
    ingredients: "",
  });
  const [image, setImage] = useState<File | null>(null);

  // Handle image drop
  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    if (!validateImageType(imageFile)) {
      return cogoToast.error("File type is wrong" + imageFile.type);
    }
    setImage(imageFile);
  };

  const handleFile = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    const imageFile = event.currentTarget.files[0];
    if (!validateImageType(imageFile)) {
      return cogoToast.warn("File type is wrong" + imageFile.type);
    }
    setImage(imageFile);
  };

  // Handle form submission
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      return cogoToast.error("Please add an image");
    }
    if (!state?.title || !state?.description || !state?.ingredients) {
      return cogoToast.error("Please fill the missing field");
    }
    const payload = {
      image,
      ...state,
    };
    await addRecipe(payload);
    setState({ title: "", note: "", description: "", ingredients: "" });
    setImage(null);
    navigate("/dashboard/myrecipes");
  };

  const onChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="min-h-screen text-white flex flex-col justify-between px-4 py-2">
      <h2 className="font-extrabold text-xl mb-2 mt-0">Add a recipe</h2> {/* Removed margin-top */}
      
      <Form onSubmit={onSubmit} className="flex flex-col gap-2 md:flex-row md:gap-4 mt-0"> {/* Removed margin-top */}
        {/* Left column */}
        <div className="w-full flex flex-col gap-2"> {/* Reduced gap between inputs */}
          <Input
            disabled={loading}
            name="title"
            placeholder="Name of the recipe"
            type="text"
            handleChange={onChange}
            className="bg-zinc-900 py-2 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none"
          />

          <TextArea
            disabled={loading}
            name="ingredients"
            placeholder="Ingredients"
            onChange={onChange}
            rows={4}
            className="bg-zinc-900 py-2 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2 resize-y"
          />

          <TextArea
            disabled={loading}
            name="description"
            placeholder="Recipe description and how to make it"
            onChange={onChange}
            rows={6}
            className="bg-zinc-900 py-2 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2 resize-y"
          />
        </div>

        {/* Right column */}
        <div className="w-full flex flex-col gap-2"> {/* Reduced gap between image uploader and other fields */}
          <ImageUploader
            handleDragOver={handleOnDragOver}
            handleOnDrop={handleOnDrop}
            handleFile={handleFile}
            name={image?.name as string}
            className="bg-zinc-900 py-2 px-4 w-full hover:bg-zinc-800 cursor-pointer focus:outline-none"
          />
          <TextArea
            disabled={loading}
            name="note"
            placeholder="Notes"
            onChange={onChange}
            rows={4}
            className="bg-zinc-900 py-2 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2 resize-y"
          />
          <Button
            disabled={loading}
            title={loading ? "Publishing..." : "Publish Recipe"}
            className="bg-orange-500 text-white hover:bg-orange-600 py-2 px-6 w-full mt-2"
            type="submit"
          />
        </div>
      </Form>
    </div>
  );
};
