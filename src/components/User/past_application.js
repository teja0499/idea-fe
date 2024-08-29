import React, { useEffect, useState } from 'react';
import { findJobById, user_job_applications } from '../../Service/api';

export default function Past_Application(props) {
  const [applicationData, setApplicationData] = useState([]);
  const [view, setView] = useState(false);
  const [jobDetaile, setJobDetaile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status,setStatus]=useState('')
  const [reason,setReason]=useState('')

  const past_Application_Data = async () => {
    setLoading(true);
    try {
      const data = await user_job_applications();
      setApplicationData(data ?? []);
    } catch (error) {
      props.showAlert(error.response?.data?.message || "Internal server issue", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    past_Application_Data();
  }, []);

  const viewApplication = async (item) => {
    setView(true);
    try {
      setStatus(item.status)
      setReason(item.reason)
      const data = await findJobById(item.job);
      setJobDetaile(data);
    } catch (error) {
      console.log(error);
      props.showAlert(error.response?.data?.message || "Internal server issue", "danger");
      setView(false)
    }
  };

  return (
    <div className='container'>
      {!view && (
        <div style={{ width: '80%' }} className="container d-flex justify-content-center">
          {loading ? (
            <div>Loading...</div>
          ) : applicationData.length !== 0 ? (
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr style={{ backgroundColor: '#f8f8f8' }}>
                  <th className='col-1'>ID</th>
                  <th className='col-2'>Title</th>
                  <th className='col-3'>Status</th>
                  <th className={`col-1`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicationData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title || ""}</td>
                    <td>{item.status}</td>
                    <td>
                      <button type="button" className={`btn btn-primary col-9`} onClick={() => viewApplication(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2><p>No job application found</p></h2>
          )}
        </div>
      )}

      {view && jobDetaile && (
        <div className='container'>
          <div className="job-detail">
            <h3>Title: {jobDetaile.title ?? "NA"}</h3>
            <p><strong>Description:</strong> {jobDetaile.description ?? "NA"}</p>
            <p><strong>Skills:</strong> {jobDetaile.skills?.join(', ') ?? "NA"}</p>
            <p><strong>Experience:</strong> {jobDetaile.experience ?? "NA"} years</p>
            <p><strong>Salary:</strong> ₹{jobDetaile.salary ?? "NA"} per annum</p>
            <p><strong>Type:</strong> {jobDetaile.type ?? "NA"}</p>
            <p><strong>Status:</strong> {status ?? "NA"}</p>
            {status==='reject' &&  <p><strong>Reason:</strong> {reason ?? "NA"}</p>}
          </div>

          <button className="btn btn-primary mx-2" onClick={() => setView(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
