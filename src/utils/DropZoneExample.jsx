import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "../App.css"
import { Typography } from '@mui/material';
const DropzoneExample = ({ content, setlocationimage, title }) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            setError("Only JPEG, JPG, and PNG files are allowed.");
            return;
        }

        setError(null);
        setlocationimage(acceptedFiles);
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        );
    };

    const removeFile = (fileToRemove) => {
        setFiles(files.filter(file => file !== fileToRemove));
        setlocationimage(null)
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': []
        }
    });

    const filePreview = files.map((file) => (
        <div key={file.name} className='pointer'>
            <h4>{file.name}</h4>
            {file.type.startsWith('image/') ? (
                // {file.type.startsWith('pplication/pdf') ? (
                < div >
                    <img src={file.preview} alt={file.name} style={{ width: '10em', height: "10em" }} />
                    <button onClick={() => removeFile(file)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{file.name}</p>
                    <button onClick={() => removeFile(file)}>Cancel</button>
                </div>
            )}
        </div >
    ));

    return (
        <div>
            <Typography variant="subtitle1" sx={{ color: "blue" }} gutterBottom>
                {title}
            </Typography>
            <div {...getRootProps()} style={{ border: '2px dashed #aaa', padding: '0.3em', width: "100%", textAlign: "center" }} className='pointer'>
                <input {...getInputProps()} />
                {isDragActive ? <p>{content}</p> : <p>{content}</p>}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>{filePreview}</div>
        </div>
    );
};

export default DropzoneExample; 