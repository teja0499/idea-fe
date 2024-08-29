import React,{useState} from 'react'
import { create_job } from '../Service/api';

export default function Create_Job(props) {
    const [formData, setFormData] = useState({
        category: '',
        type: '',
        title: '',
        description: '',
        skills: [''],
        experience: '',
        salary: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSkillsChange = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        setFormData({
            ...formData,
            skills: newSkills
        });
    };

    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, '']
        });
    };

    const removeSkill = (index) => {
        const newSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            skills: newSkills
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const data=await create_job(formData)
            if (!data) {
                props.showAlert("Job creation failed","success")
            }
            else
            {
                setFormData({
                    category: '',
                    type: '',
                    title: '',
                    description: '',
                    skills: [''],
                    experience: '',
                    salary: ''
                })
                props.showAlert("Job successfully created","success")
            }
        } catch (error) {
            props.showAlert(error?.response?.data?.message, "danger");  
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
                <label className="form-label">Category:</label>
                <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Type:</label>
                <input
                    type="text"
                    name="type"
                    className="form-control"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Title:</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Skills:</label>
                {formData.skills.map((skill, index) => (
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
            <div className="mb-3">
                <label className="form-label">Experience (Years):</label>
                <input
                    type="number"
                    name="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Salary:</label>
                <input
                    type="number"
                    name="salary"
                    className="form-control"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}
