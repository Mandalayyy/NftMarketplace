"use client";
import React, { useState, useRef } from "react";
import { StrapiImage } from "./StrapiImage";



function generateDataUrl(file, callback ) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function ImagePreview({ dataUrl }) {
  return (
    <StrapiImage
      src={dataUrl}
      alt="preview"
      height={200}
      width={200}
      className="rounded-lg w-full object-cover"
    />
  );
}

function ImageCard({
  dataUrl,
  fileInput,
}) {
  const imagePreview = dataUrl ? <ImagePreview dataUrl={dataUrl} /> : <p>No image selected</p>;

  return (
    <div className="w-full relative">
      <div className=" flex items-center space-x-4 rounded-md border p-4 h-auto">
        {imagePreview}
      </div>
      <button
        onClick={() => fileInput.current?.click()}
        className="w-full absolute inset-0"
        type="button"
      ></button>
    </div>
  );
}

export default function ImagePicker({
  id,
  name,
  label,
  defaultValue,
}) {
  const fileInput = useRef(null);
  const [dataUrl, setDataUrl] = useState(defaultValue ?? null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) generateDataUrl(file, setDataUrl);
  };

  return (
    <React.Fragment>
      <div className="hidden">
        <label htmlFor={name}>{label}</label>
        <input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          ref={fileInput}
          accept="image/*"
        />
      </div>
      <ImageCard dataUrl={dataUrl ?? ""} fileInput={fileInput} />
    </React.Fragment>
  );
}