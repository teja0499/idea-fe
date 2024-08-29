import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { update_user_application } from '../Service/api';

export default function Edit_User_Application(props) {
  const [formData, setFormData] = useState({
    candidate_Skills: [],
    candidate_salary: 0,
    candidate_Experience: 0,
    candidate_description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const { application } = location.state || {}; 
  const navigate = useNavigate();

  useEffect(() => {
    if (application) {
      setFormData({
        candidate_Skills: application.candidate_Skills || [],
        candidate_salary: application.candidate_salary || 0,
        candidate_Experience: application.candidate_Experience || 0,
        candidate_description: application.candidate_description || ''
      });
      setLoading(false);
    } else {
      setError('No application data available');
      setLoading(false);
    }
  }, [application]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (index, value) => {
    const newSkills = [...formData.candidate_Skills];
    newSkills[index] = value;
    setFormData({ ...formData, candidate_Skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, candidate_Skills: [...formData.candidate_Skills, ''] });
  };

  const removeSkill = (index) => {
    const newSkills = formData.candidate_Skills.filter((_, i) => i !== index);
    setFormData({ ...formData, candidate_Skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update_user_application(application._id,formData);
      setFormData({
        candidate_Skills: [],
        candidate_salary: 0,
        candidate_Experience: 0,
        candidate_description: ''
      })
      props.showAlert('Application updated successfully', 'success');
    } catch (error) {
      props.showAlert('Error updating application', 'danger');
    }
    navigate(-1)
  };

  if (loading) return <div className='container'>Loading...</div>;
  if (error) return <div className='container'>{error}</div>;

  return (
    <div className="container">
      <h2>Edit Application</h2>
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
          <label htmlFor="candidate_salary">Candidate Salary</label>
          <input
            type="number"
            className="form-control"
            id="candidate_salary"
            name="candidate_salary"
            value={formData.candidate_salary}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="candidate_Experience">Candidate Experience (in years)</label>
          <input
            type="number"
            className="form-control"
            id="candidate_Experience"
            name="candidate_Experience"
            value={formData.candidate_Experience}
            onChange={handleInputChange}
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
          Update Application
        </button>
      </form>
    </div>
  );
}
