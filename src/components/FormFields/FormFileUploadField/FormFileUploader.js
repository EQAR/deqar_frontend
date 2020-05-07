import React, {useState, useEffect} from 'react';
import {Text} from "informed";
import {Label} from "reactstrap";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import style from './FormFileUploader.module.css';

const FormFileUploader = ({ api, state, disabled }) => {
  registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateType);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (state.filename) {
      setFiles([{
        options: {
          type: 'local',
          file: {
            name: state.filename,
            size: state.filesize,
            type: 'application/pdf'
          }
        }
      }])
    }
  }, [state]);

  const onRemoveFile = (error, file) => {
    setFiles([]);
    api.setValue('filename', '');
    api.setValue('filesize', '');
    api.setValue('fileupload', '');
  };

  const onAddFile = (error, file) => {
    if (file.origin !== 3) {
      setFiles([file]);
      api.setValue('filename', file.filename);
      api.setValue('filesize', file.fileSize);
      api.setValue('fileupload', file.getFileEncodeBase64String());
    }
  };

  if (disabled) {
    if (state.file) {
      return(
        <React.Fragment>
          <Label for="file">File</Label>
          <div className={style.Download}>
            <a href={state.file} target={'new'}>Download file from DEQAR</a>
          </div>
        </React.Fragment>
      )
    } else {
      return('')
    }
  } else {
    return (
      <React.Fragment>
        <Text field={'filename'} hidden />
        <Text field={'filesize'} hidden />
        <Text field={'fileupload'} hidden />
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
