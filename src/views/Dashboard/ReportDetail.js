import React, {Component} from 'react';
import style from './ReportDetail.module.css';

class ReportDetail extends Component {
  flagRender = (flag) => {
    let className = '';
    switch(flag) {
      case 'none':
        className = 'badge badge-success';
        break;
      case 'low level':
        className = 'badge badge-warning';
        break;
      case 'high level':
        className = 'badge badge-danger';
        break;
      default:
        return null;
    }
    return(<span className={className}>{flag}</span>);
  };

  getProgrammes = (originalData) => {
    return originalData.programmes.length > 0 ?
      <React.Fragment>
        <dt className={'col-sm-2'}>Programmes</dt>
        <dd className={'col-sm-10'}>{originalData.programmes.join('; ')}</dd>
      </React.Fragment> : ''
  };

  getFiles = (originalData) => {
    return(
      <React.Fragment>
        {
          originalData.report_files.map((file, idx) =>
            <div key={idx}><a href={file.file}>{file.file_display_name ? file.file_display_name : `Report #${idx+1}`}</a></div>
          )
        }
      </React.Fragment>
    )
  };

  getFlagDescriptions = (originalData) => {
    const flagLog = originalData.flag_log.split('; ');
    if(originalData.flag_log) {
      return(
        <React.Fragment>
          <dt className={'col-sm-2'}>Flag Description</dt>
          <dd className={'col-sm-10'}>
            {
              flagLog.map((log, idx) => {
                return(<div key={idx}>{log}</div>)
              })
            }
          </dd>
        </React.Fragment>
      )
    }
  };

  render() {
    const {row} = this.props.row;
    return(
      <dl className={style.ReportDetailList + ' row'}>
        <dt className={'col-sm-2'}>Report ID</dt>
        <dd className={'col-sm-10'}>{row.id}</dd>
        <dt className={'col-sm-2'}>Agency</dt>
        <dd className={'col-sm-10'}>{row._original.agency}</dd>
        <dt className={'col-sm-2'}>Report Name</dt>
        <dd className={'col-sm-10'}>{row.name}</dd>
        <dt className={'col-sm-2'}>Institutions</dt>
        <dd className={'col-sm-10'}>{row.institutions.join('; ')}</dd>
        {this.getProgrammes(row._original)}
        <dt className={'col-sm-2'}>Files</dt>
        <dd className={'col-sm-10'}>{this.getFiles(row._original)}</dd>
        <dt className={'col-sm-2'}>Flag</dt>
        <dd className={'col-sm-10'}>{this.flagRender(row.flag)}</dd>
        {this.getFlagDescriptions(row._original)}
      </dl>
    )
  }
}

export default ReportDetail;