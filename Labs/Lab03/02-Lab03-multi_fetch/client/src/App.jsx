import React, { useState } from "react";
import "./app.css";

function App() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fetchedSingleFiles, setFetchedSingleFiles] = useState(null);
  const [fetchedFiles, setFetchedFiles] = useState(null);

  // Handle file input for single upload
  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  // Handle file input for multiple uploads
  const handleMultipleFilesChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  // Upload a single file to the server
  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);

    try {
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading single file:", error);
    }
  };

  // Upload multiple files to the server
  const uploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }

    try {
      const response = await fetch("http://localhost:8000/save/multiple", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading multiple files:", error);
    }
  };

  // Fetch a random single file from the server
  const fetchSingleFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/single");
      const blob = await response.blob();
      console.log(blob)
      const url = URL.createObjectURL(blob);
      setFetchedSingleFiles(url);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const data = await response.json();

      const fileData = data.files.map((file) => {
        const base64URL = `data:application/octet-stream;base64,${file.data}`;
        return {
          filename: file.filename,
          url: base64URL,
        };
      });
      setFetchedFiles(fileData);
    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  };

  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      const data = await response.json();

      const imageUrl = await fetch(data.message);
      console.log(imageUrl);

      setDogImageUrl(data.message); // Update state with the image URL

      // fetch dog image URL
      const response2 = await fetch(data.message)
      const dogImagefile = await response2.blob();

      try {
        fetch("http://localhost:8000/save/single") {
          // do the form data stuff
          // save dogImagefile into form data
          //send data
        }
      }


    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  //  Cannot work on this yet, not until we learn static files and allowing file access
  // const fetchMultipleFiles = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/fetch/multiple");
  //     const data = await response.json();

  //     const fileUrls = await Promise.all(
  //       data.files.map(async (file) => {
  //         const fileResponse = await fetch(file);
  //         const blob = await fileResponse.blob();
  //         return URL.createObjectURL(blob);
  //       })
  //     );
  //     console.log(fileUrls)
  //     setFetchedFiles(fileUrls);
  //   } catch (error) {
  //     console.error("Error fetching single file:", error);
  //   }
  // };

  return (
    <div className="container">
      <div style={{ padding: "20px" }}>
        <h1>File Upload and Fetch App</h1>

        {/* Section for uploading single file */}
        <div className="file-upload-container">
          <h2>Upload Single File</h2>
          <input type="file" onChange={handleSingleFileChange} />
          <button onClick={uploadSingleFile}>Upload Single File</button>
        </div>

        {/* Section for uploading multiple files */}
        <div className="file-upload-container">
          <h2>Upload Multiple Files</h2>
          <input type="file" multiple onChange={handleMultipleFilesChange} />
          <button onClick={uploadMultipleFiles}>Upload Multiple Files</button>
        </div>

        {/* Section for fetching and displaying a single file */}
        <div>
          <h2>Fetch Single File</h2>
          <br></br>
          <div className="fetch-container">
            <button onClick={fetchSingleFile}>Fetch Single File</button>
            {fetchedSingleFiles && (
              <div>
                <h3>Single File</h3>
                <img src={fetchedSingleFiles} alt="Fetched Single" />
              </div>
            )}
          </div>
        </div>

        {/* Section for fetching and displaying multiple files */}
        <div>
          <h2>Fetch Multiple Files</h2>
          <div className="fetch-container">
            <button onClick={fetchMultipleFiles}>Fetch Multiple File</button>
            {fetchedFiles && (
              <div className="fetch-multiple-files">
                <h3>Multiple Files</h3>
                {fetchedFiles.map((file, index) => (
                  <div key={index}>
                    <p>{file.filename}</p>
                    <img src={file.url} alt={file.filename} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={fetchRandomDogImage}>Fetch Dog File</button>
      </div>
    </div>
  );
}

export default App;


// https://api/openai/{harman}/{password}/hu82gd7gjdhsgi7d2g