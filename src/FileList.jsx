import React, { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';
// import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'ca-central-1',
  });

  const fetchFiles = async () => {
    // ... (unchanged)
  };

  const handleFileClick = async (fileKey) => {
    const params = {
      Bucket: 'maximum-storage',
      Key: fileKey,
      Expires: 60 * 5, // 5 minutes
    };

    try {
      const url = await s3.getSignedUrlPromise('getObject', params);
      setSelectedFileUrl(url);
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      alert('Failed to generate pre-signed URL.');
    }
  };

  const closeModal = () => {
    setSelectedFileUrl(null);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="FileList">
      <h2>Files in the Bucket</h2>
      <ul>
        {files.map((file) => (
          <li key={file.Key} onClick={() => handleFileClick(file.Key)}>
           name {file.Key}
          </li>
        ))}
      </ul>
      {selectedFileUrl && (
        <div className="modal" onClick={closeModal}>
          <iframe className="file-preview" src={selectedFileUrl} title="File preview" />
        </div>
      )}
    </div>
  );
};

export default FileList;
