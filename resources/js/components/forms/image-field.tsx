import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ErrorLine from "./error-line";
import { Button } from "../ui/button";

export default function ImageField({ error }: { error: string | null}){

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return(
    <div className="grid gap-3">
      <Label htmlFor="image">Image</Label>
      <Input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        id="image"
        name="image"
        className='hidden'
      />
      {error && <ErrorLine field={error} />}

      <Button
        variant={"secondary"}
        onClick={() => fileInputRef.current?.click()}
      >
        Select image
      </Button>

      {preview && file && (
        <div className="space-y-2">
          <img
            src={preview}
            alt="Preview"
            className="max-w-40 rounded border"
          />
          <div className="text-sm text-gray-600">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
          <Button
            type="button"
            onClick={clearImage}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
          >
            Eliminar
          </Button>
        </div>
      )}
    </div>
  )
}