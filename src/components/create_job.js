import React, { useState, useEffect } from 'react';
import { add_Category, create_job, deleteCategory, get_All_Category } from '../Service/api';
import { ReactComponent as DeleteIcon } from '../images/DeleteIcon.svg';

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

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "add-new") {
            setIsAddingCategory(true);
            setFormData({
                ...formData,
                category: "",
            });
        } else {
            setIsAddingCategory(false);
            setFormData({
                ...formData,
                category: selectedValue,
            });
        }
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
        setFormData({
            ...formData,
            category: e.target.value,
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

    const addCategory = async (e) => {
        e.preventDefault();
        try {
            const data = await add_Category(newCategory);
            setIsAddingCategory(false);
            setFormData({
                ...formData,
                category: "",
            });
            get_Category();
            setNewCategory("");
        } catch (error) {
            console.log(error);
            props.showAlert(error?.response?.data?.message || "Internal server issue", "danger");
        }
    };

    const get_Category = async () => {
        try {
            const data = await get_All_Category();
            console.log(data);
            
            setCategories(data);
        } catch (error) {
            props.showAlert("Internal server issue", "danger");
        }
    };

    const delete_Category=async(e)=>{
        e.preventDefault();
        try {
            console.log(formData.category);
            let id;
            for(let i=0;i<categories.length;i++)
            {
                if(formData.category===categories[i].category)
                {
                   id=categories[i]._id;
                   break;
                }
            }
            console.log(id);
            
            const data=await deleteCategory(id)
            get_Category();
            setNewCategory("");
            setFormData({
                ...formData,
                category:"",
            });
            
        } catch (error) {
            console.log(error);
            props.showAlert("Internal server issue","danger")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const data = await create_job(formData);
            if (!data) {
                props.showAlert("Job creation failed", "danger");
            } else {
                setFormData({
                    category: '',
                    type: '',
                    title: '',
                    description: '',
                    skills: [''],
                    experience: '',
                    salary: ''
                });
                props.showAlert("Job successfully created", "success");
            }
        } catch (error) {
            props.showAlert(error?.response?.data?.message, "danger");
        }
    };

    useEffect(() => {
        console.log("Hi");
        
        get_Category();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Category:</label>
                    {!isAddingCategory ? (
                       <div>
                         <select
                            name="category"
                            className="form-control"
                            value={formData.category}
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category.category}>
                                    {category.category}
                                  
                                </option>
                            ))}
                            <option value="add-new">Add New Category</option>
                        </select>
                       {formData.category.length!==0 && <button className="btn btn-danger mt-2 mx-2" onClick={delete_Category} >
                                Delete Category
                            </button>}
                       </div>
                    ) : (
                        <div>
                            <input
                                type="text"
                                name="newCategory"
                                className="form-control"
                                placeholder="Enter new category"
                                value={newCategory}
                                onChange={handleNewCategoryChange}
                            />
                            <button className="btn btn-primary mt-2" onClick={addCategory}>
                                Add
                            </button>
                            <button className="btn btn-danger mt-2 mx-2" onClick={()=>{ setIsAddingCategory(false)}}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Type:</label>
                    <select
                        name="type"
                        className="form-control"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a Type</option>
                        <option value="Full time">Full-Time</option>
                        <option value="Part time">Part-Time</option>
                        <option value="Intern">Intern</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
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

                <div className="col-md-6 mb-3">
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
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
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

                <div className="col-md-6 mb-3">
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
            </div>

            <div className="row">
                <div className="col-md-12 mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}
