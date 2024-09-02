import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get_all_job, job_application } from '../../Service/api';
import JobCard from './jobCard';

export default function Current_Job(props) {
  const [currentJob, setCurrentJobs] = useState([]);
  const [view, setView] = useState(false);
  const [jobData, setJobData] = useState();
  const [fillForm, setFillForm] = useState(false);
  const [formData, setFormData] = useState({
    candidate_Skills: [''],
    candidate_Experience:0,
    candidate_description: '',
    candidate_salary:0

  });
  const navigate = useNavigate();

  const job_Opening = async () => {
    try {
      const data = await get_all_job();
      setCurrentJobs(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      props.showAlert(error?.response?.data?.message || "Internal server Issue", "danger");
    }
  };

  const jobView = (job) => {
    setView(true);
    setJobData(job);
    console.log(job);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setFillForm(false)
      const finalData = {
        title:jobData.title,
        candidate_Name:localStorage.getItem('name'),
        category:jobData.category,
        candidate:localStorage.getItem('user_id'),
        job:jobData._id,
        category:jobData.category,
        ...jobData,
        ...formData,
        candidate_Experience:formData.candidate_Experience

      };
      const data = await job_application(finalData);
      // console.log(finalData);
      setFormData({
        candidate_Skills: [''],
        candidate_Experience: '',
        candidate_description: ''
      });
      
      if (data) {
        props.showAlert("Applied Successfully", "success");
        setView(false);
      } else {
        props.showAlert("Application failed", "danger");
        setView(false);
      }
    } catch (error) {
      console.log(error);
      props.showAlert(error?.response?.data?.message || "Internal server Issue", "danger");
      setView(false);
    }
  };

  const job_apply = () => {
    setFillForm(true);
  };

  const removeSkill = (index) => {
    const newSkills = formData.candidate_Skills.filter((_, i) => i !== index);
    setFormData({ ...formData, candidate_Skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, candidate_Skills: [...formData.candidate_Skills, ''] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (index, value) => {
    const newSkills = [...formData.candidate_Skills];
    newSkills[index] = value;
    setFormData({ ...formData, candidate_Skills: newSkills });
  };

  useEffect(() => {
    job_Opening();
  }, []);

  return (
    <div className='container'>
      {!view && (
        <div className="row mx-auto">
          {currentJob.length !== 0 ? (
            currentJob.map((job) => (
              <div key={job._id} className="col-md-4 mb-4">
                <JobCard job={job} jobView={jobView} />
              </div>
            ))
          ) : (
            <h2>No Job found</h2>
          )}
        </div>
      )}

      {view && !fillForm && (
        <div className='container'>
          <div className="job-detail">
            <h3>Title: {jobData.title}</h3>
            <strong>Description: </strong>
            <p>{jobData.description}</p>
            <p><strong>Skills:</strong> {jobData.skills.join(', ')}</p>
            <p><strong>Experience:</strong> {jobData.experience} years</p>
            <p><strong>Salary:</strong> ₹{jobData.salary} per annum</p>
            <p><strong>Type:</strong> {jobData.type}</p>
            {jobData.customFields && Object.entries(jobData.customFields).map(([key, value]) => (
                        <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                            <span> <strong>{key} : </strong>{value}</span>
                            </li>
                    ))}
          </div>
          <button className="btn btn-primary" onClick={job_apply}>
            Apply
          </button>
          <button className="btn btn-primary mx-2" onClick={() => setView(false)}>
            Close
          </button>
        </div>
      )}

      {fillForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Skills:</label>
            {formData.candidate_Skills.map((skill, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={skill}
                  onChange={(e) => handleSkillsChange(index, e.target.value)}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeSkill(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addSkill}>
              Add Skill
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="candidate_Experience">Candidate Experience (comma separated)</label>
            <input
              type="number"
              className="form-control"
              id="candidate_Experience"
              name="candidate_Experience"
              value={formData.candidate_Experience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
  <label htmlFor="candidate_salary">Expected Salary</label>
  <input
    type="number"
    className="form-control"
    id="candidate_salary"
    name="candidate_salary"
    value={formData.candidate_salary}
    onChange={handleInputChange}
    required
  />
</div>
          <div className="form-group">
            <label htmlFor="candidate_description">Candidate Description</label>
            <textarea
              className="form-control"
              id="candidate_description"
              name="candidate_description"
              value={formData.candidate_description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}
