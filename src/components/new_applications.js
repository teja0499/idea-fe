import React, { useState, useEffect } from 'react';
import { application_info, changeApplicationStatus, new_job_application } from '../Service/api';
import { useNavigate } from 'react-router-dom';

export default function New_Applications(props) {
  const [jobApplication, setJobApplication] = useState([]);
  const [application, setApplication] = useState(null);
  const [view, setView] = useState(false);
  const [user, setUser] = useState();
  const [job, setJob] = useState();
  const [reason, setReason] = useState("");
  const [rejectReason, setRejectReason] = useState(false);
  const navigate = useNavigate();

  const fetchJobApplications = async () => {
    try {
      const jobApplications = await new_job_application();
      setJobApplication(jobApplications);
    } catch (error) {
      console.error(error);
      props.showAlert("Internal server issue", "danger");
    }
  };

  const viewApplication = async (data) => {
    try {
      setApplication(data);
      setView(true);
      const response = await application_info(data.candidate, data.job);
      setUser(response.user);
      setJob(response.job);
    } catch (error) {
      console.error(error);
      props.showAlert("Failed to fetch application details", "danger");
    }
  };

  const changeStatus = async (status) => {
    try {
      if (status === 'reject' && reason.trim().length === 0) {
        props.showAlert("Please provide a reason for rejection", "danger");
        return;
      }
      
      const data = await changeApplicationStatus(status, application._id, reason,application.candidate,application.title);
      if (data) {
        props.showAlert(`Application ${status}ed successfully`, "success");
        setReason("");
        fetchJobApplications();
        setView(false);
      }
    } catch (error) {
      console.error(error);
      props.showAlert("Internal server error", "danger");
    }
  };

  const handleReject = () => {
    setRejectReason(true);
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  return (
    <div className="container">
      {!view && jobApplication.length !== 0 && (
        <div className="row">
          {jobApplication.map((jobApp) => (
            <div key={jobApp._id} className="col-md-4 mb-4">
              <Card
                showAlert={props.showAlert}
                changeStatus={changeStatus}
                jobApplication={jobApp}
                viewApplication={viewApplication}
              />
            </div>
          ))}
        </div>
      )}
      {!view && jobApplication.length === 0 && <h3 className='text-center'>No new applications</h3>}

      {view && !rejectReason && (
        <div className="container">
          <div className="job-detail">
            <h3>Title: {application?.title || "NA"}</h3>
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
                  <td>{job?.title ?? 'NA'}</td>
                  <td>{application?.candidate_Name ?? 'NA'}</td>
                </tr>
                <tr>
                  <td><strong>Description</strong></td>
                  <td>{job?.description ?? 'NA'}</td>
                  <td>{application?.candidate_description ?? 'NA'}</td>
                </tr>
                <tr>
                  <td><strong>Skills</strong></td>
                  <td>{job?.skills?.join(', ') ?? 'NA'}</td>
                  <td>{application?.candidate_Skills?.join(', ') ?? 'NA'}</td>
                </tr>
                <tr>
                  <td><strong>Experience</strong></td>
                  <td>{job?.experience ?? 'NA'} years</td>
                  <td>{application?.candidate_Experience ?? '0'} years</td>
                </tr>
                <tr>
                  <td><strong>Salary</strong></td>
                  <td>₹{job?.salary ?? 'NA'} per annum</td>
                  <td>₹{application?.candidate_salary ?? 'NA'}</td>
                </tr>

                <tr>
                  <td><strong>Salary</strong></td>
                  <td>₹{job?.salary ?? 'NA'} per annum</td>
                  <td>₹{application?.candidate_salary ?? 'NA'}</td>
                </tr>
                <tr>
                  <td><strong>Type</strong></td>
                  <td>{job?.type ?? 'NA'}</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>-</td>
                  <td>{application?.status ?? 'NA'}</td>
                </tr>
                {application?.status === 'reject' && (
                  <tr>
                    <td><strong>Reason</strong></td>
                    <td>-</td>
                    <td>{application?.reason ?? 'NA'}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="btn btn-success" onClick={() => changeStatus('select')}>
              Approve
            </button>
            <button className="btn btn-danger mx-4" onClick={handleReject}>
              Reject
            </button>
            <button className="btn btn-primary mx-4" onClick={() => navigate("/admin/update-user-application", { state: { application } })}>
              Edit
            </button>
            <button className="btn btn-secondary" onClick={() => setView(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {view && rejectReason && (
        <div>
          <textarea
            required
            className="form-control"
            id="reasonTextarea"
            rows="10"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder='Write your reason here'
          ></textarea>
          <button className="btn btn-success my-2" onClick={() => changeStatus('reject')}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

const Card = (props) => {
  const { jobApplication, viewApplication } = props;
  const { candidate_Name, status, AtsScore, title } = jobApplication;

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{title || "NA"}</h5>
          <h6 className="card-title">{candidate_Name ?? "NA"}</h6>
          <p><strong>Status: </strong>{status}</p>
          <p><strong>AtsScore: </strong>{AtsScore ?? "00"}</p>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-success col-md-8 my-2"
            onClick={() => viewApplication(jobApplication)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};
