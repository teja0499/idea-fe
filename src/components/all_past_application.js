import React, { useState, useEffect } from 'react';
import { findJobById, get_all_job_application } from '../Service/api';

export default function All_Past_Application(props) {
  const [applicationsData, setApplicationsData] = useState([]);
  const [view, setView] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [reason, setReason] = useState('');

  const get_All_Application = async () => {
    setLoading(true);
    try {
      const data = await get_all_job_application();
      setApplicationsData(data);
    } catch (error) {
      props.showAlert('Internal server error', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const viewApplication = async (item) => {
    setView(true);
    setLoading(true);
    try {
      const data = await findJobById(item.job);
      setJobDetails(data);
      setApplicationDetails(item);
      setStatus(item.status);
      setReason(item.reason);
    } catch (error) {
      console.log(error);
      props.showAlert(error.response?.data?.message || 'Internal server issue', 'danger');
      setView(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_All_Application();
  }, []);

  return (
    <div className='container'>
      {loading && <div>Loading...</div>}

      {!view && !loading && applicationsData.length!==0&& (
        <div>
          <table className='table table-bordered'>
            <thead className='thead-dark text-center'>
              <tr style={{ backgroundColor:'' }}>
                <th className='col-1'>ID</th>
                <th className='col-1'>Title</th>
                <th className='col-2'>Skills</th>
                <th className='col-1'>ATS Score</th>
                <th className='col-1'>Status</th>
                <th className='col-1'>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicationsData.map((item, index) => (
                <tr key={item._id} className='text-center'>
                  <td>{index + 1}</td>
                  <td>{item.title || ''}</td>
                  <td>{item.candidate_Skills?.join(', ') || ''}</td>
                  <td >{item.AtsScore || ''}</td>
                  <td className={`${item.status==='reject'?'bg-danger':'bg-success'}`}>{item.status}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-primary col-9'
                      onClick={() => viewApplication(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view && !loading  && applicationsData.length!==0 && (
        <div className='container'>
          <table className='table table-bordered'>
            <thead className='thead-dark'>
              <tr>
                <th className='col-4'>Property</th>
                <th className='col-4'>Job Requirements</th>
                <th className='col-4'>Candidate Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Title / Name</strong></td>
                <td>{jobDetails?.title ?? 'NA'}</td>
                <td>{applicationDetails?.candidate_Name ?? 'NA'}</td>
              </tr>
              <tr>
                <td><strong>Description</strong></td>
                <td>{jobDetails?.description ?? 'NA'}</td>
                <td>{applicationDetails?.candidate_description ?? 'NA'}</td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Skills</strong></td>
                <td>{jobDetails?.skills?.join(', ') ?? 'NA'}</td>
                <td>{applicationDetails?.candidate_Skills?.join(', ') ?? 'NA'}</td>
              </tr>
              <tr>
                <td><strong>Experience</strong></td>
                <td>{jobDetails?.experience ?? 'NA'} years</td>
                <td>{applicationDetails?.candidate_Experiance ?? '0'} years</td>
              </tr>
              <tr>
                <td><strong>Salary</strong></td>
                <td>₹{jobDetails?.salary ?? 'NA'} per annum</td>
                <td>₹{applicationDetails?.candidate_salary ?? 'NA'}</td>
              </tr>
              <tr>
                <td><strong>Type</strong></td>
                <td>{jobDetails?.type ?? 'NA'}</td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>-</td>
                <td>{status ?? 'NA'}</td>
              </tr>
              {status === 'reject' && (
                <tr>
                  <td><strong>Reason</strong></td>
                  <td>-</td>
                  <td>{reason ?? 'NA'}</td>
                </tr>
              )}
            </tbody>
          </table>

          <button className='btn btn-primary mx-2' onClick={() => setView(false)}>
            Close
          </button>
        </div>
      )}
      {applicationsData.length === 0&& <div className='text-center'> No application</div>} 
    </div>
  );
}
