import React from 'react'
import { Link } from 'react-router-dom'

export default function JobCard(props) {
    const job =props.job
  return (
    <div className='container'>
        <div className="card" style={{ width: "18rem" }}>
    <div className="card-body">
    <h5 className="card-title">{job.title}</h5>
    <p>{job.type}</p>
    <p className="card-text">
      {job.descripation}
    </p>
    <p className='my-0'><strong>Skills</strong> : { job.skills.join(', ')}</p>
   
    <button className="btn btn-primary" onClick={()=>{props.jobView(job)}}>
     View
    </button>
  </div>
</div>

    </div>
  )
}
