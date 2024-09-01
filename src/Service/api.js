import axios from 'axios';







export const Adminlogin= async (email, password) => {
    console.log(email, password);
    
    const response = await axios.post('http://localhost:5000/admin/login',{email, password}, {
        headers: {
            'Content-Type': 'application/json',
            // "username":username,
            // "password":password
        },
    });
    console.log(response.data);

    return response.data;
};

export const user_Ragister = async (body) => {
  
    console.log(body);
    
     const response = await axios.post('http://localhost:5000/user/register', body, {
         headers: {
             'Content-Type': 'application/json',
         },
     });
     return response.data;

};

export const user_Login= async (email, password) => {
    console.log("user login",email, password);
    
    const response = await axios.post('http://localhost:5000/user/login',{email, password}, {
        headers: {
            'Content-Type': 'application/json',
            // "username":username,
            // "password":password
        },
    });
    console.log(response.data);

    return response.data;
};

export const create_job=async(data)=>{
    console.log(data);
    const response=await axios.post('http://localhost:5000/admin/create_job',data)
    console.log(response.data);
    return response.data
}

export const get_all_job=async()=>{
    console.log("all jobs");
    const response=await axios.get('http://localhost:5000/get_Job')
    console.log(response.data);
    return response.data
}

export const job_application=async(job)=>{
    console.log(job);
    
    // const body={
    //     title:job.title,
    //     candidate_Name:localStorage.getItem('name'),
    //     category:job.category,
    //     candidate:localStorage.getItem('user_id'),
    //     // ...job
    //     job:job._id,
    // }
    // console.log(body);
    
    const response=await axios.post('http://localhost:5000/job-application',job)
    console.log(response.data);
    return response.data
}

export const user_job_applications=async()=>{
    const id=localStorage.getItem('user_id')
    console.log(id);
    
    const response=await axios.post(`http://localhost:5000/user/job-applications/${id}`)
    console.log(response.data);
    return response.data
}

export const findJobById=async(id)=>{
    console.log(id);
    
    const response=await axios.post(`http://localhost:5000/user/job/${id}`)
    console.log(response.data);
    return response.data
}

export const new_job_application=async()=>{
    console.log("all jobs");
    const response=await axios.get('http://localhost:5000/admin/new_job_application')
    console.log(response.data);
    return response.data
}

export const application_info=async(uid,jid)=>{
    
    console.log(uid,jid);
    const body={ uid,jid}
    console.log(body);
    
    const response=await axios.post('http://localhost:5000/admin/get-application-info',body)
    console.log(response.data);
    return response.data
}

export const changeApplicationStatus=async(status,id,reason,candidate,jobTitle)=>{
    // const adminmail=localStorage.getItem()
    const adminName=localStorage.getItem('name')
    const admin_mail=localStorage.getItem('email')
    const body={ status,id,reason,candidate,jobTitle,adminName,admin_mail}
    console.log(body);
    const response=await axios.post('http://localhost:5000/admin/upateStatus',body)
    console.log(response.data);
    return response.data
}

export const get_all_job_application=async()=>{
    console.log("all application");
    const response=await axios.get('http://localhost:5000/admin/get_all_application')
    console.log(response.data);
    return response.data
}

    export const update_user_application =async(id,body)=>{
    console.log("update application",id,body);
    const response=await axios.put(`http://localhost:5000/admin/update-user-application/${id}`,body)
    console.log(response.data);
    return response.data
}

export const get_All_Category=async()=>{
    const response=await axios.get('http://localhost:5000/admin/get_Job_Categorie')
    return response.data; 
}

export const deleteCategory=async(id)=>{
    const response=await axios.delete(`http://localhost:5000/admin/delete_Categorie/${id}`)
    console.log(response.data);
    
}

export const add_Category=async(category)=>{
    
    const response=await axios.post('http://localhost:5000/admin/add_category',{category})
    return response.data;
}

