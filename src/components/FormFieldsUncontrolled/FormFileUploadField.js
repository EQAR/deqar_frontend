import React, {useState, useEffect} from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import {Label} from "reactstrap";

const FormFileUploadField = ({disabled, fileURL, fileName, fileSize, ...props}) => {
  registerPlugin(FilePondPluginFileValidateType);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (fileName) {
      setFiles([{
        options: {
          type: 'local',
          file: {
            name: fileName,
            size: fileSize,
            type: 'application/pdf'
          }
        }
      }])
    }
  }, []);

  const onUpdate = (fileItems) => {
    setFiles(fileItems)
  };

  if (disabled) {
    if (fileURL) {
      return(
        <React.Fragment>
          <Label for="file">File</Label>
          <div>
            <a href={fileURL} target={'new'}>Download file from DEQAR</a>
          </div>
        </React.Fragment>
      )
    }
  } else {
    return (
      <React.Fragment>
        <FilePond
          files={files}
          allowMultiple={false}
          acceptedFileTypes={['application/pdf']}
          onupdatefiles={onUpdate}
        />
      </React.Fragment>
    )
  }
};

export default FormFileUploadField
