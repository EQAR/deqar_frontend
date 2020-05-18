import React, {useState, useEffect} from 'react';
import {Text} from "informed";
import {Label} from "reactstrap";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import style from './FormFileUploader.module.css';

const FormFileUploader = ({ api, state, disabled, label, nameField, sizeField, fileField='file', uploadField }) => {
  registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateType);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (state[nameField]) {
      setFiles([{
        options: {
          type: 'local',
          file: {
            name: state[nameField],
            size: state[sizeField],
            type: 'application/pdf'
          }
        }
      }])
    }
  }, [state]);

  const onRemoveFile = (error, file) => {
    setFiles([]);
    api.setValue(nameField, '');
    api.setValue(sizeField, '');
    api.setValue(uploadField, '');
  };

  const onAddFile = (error, file) => {
    if (file.origin !== 3) {
      setFiles([file]);
      api.setValue(nameField, file.filename);
      api.setValue(sizeField, file.fileSize);
      api.setValue(uploadField, file.getFileEncodeBase64String());
    }
  };

  if (disabled) {
    if (state[fileField]) {
      return(
        <React.Fragment>
          <Label>{label}</Label>
          <div className={style.Download}>
            <a href={state[fileField]} target={'new'}>Download file from DEQAR</a>
          </div>
        </React.Fragment>
      )
    } else {
      return('')
    }
  } else {
    return (
      <React.Fragment>
        {
          label && <Label>{label}</Label>
        }
        <Text field={nameField} hidden />
        <Text field={sizeField} hidden />
        <Text field={uploadField} hidden />
        <FilePond
          allowFileEncode={true}
          files={files}
          allowMultiple={false}
          acceptedFileTypes={['application/pdf']}
          onaddfile={onAddFile}
          onremovefile={onRemoveFile}
        />
      </React.Fragment>
    )
  }
};

export default FormFileUploader;
