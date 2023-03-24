import React, { useState } from 'react';
import { S3 } from 'aws-sdk';


const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'ca-central-1',
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const params = {
      Bucket: 'maximum-storage',
      Key: selectedFile.name,
      Body: selectedFile,
    };

    try {
      await s3.upload(params).promise();
      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Failed to upload the file.');
    }
  };

  return (
    <div className="FileUpload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
