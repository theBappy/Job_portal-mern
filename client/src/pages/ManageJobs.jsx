import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManageJobs = () => {
  const navigate = useNavigate()  
  const [jobs, setJobs] = useState([])

  const {backendUrl , companyToken} = useContext(AppContext)

// function to fetch company job application data
const fetchCompanyJobs = async() => {
    try{
        const { data } = await axios.get(backendUrl + '/api/company/list-jobs', {
            headers: {
                token: companyToken
            }
        })
        if(data.success){
            setJobs(data.jobsData.reverse())
            console.log(data.jobsData)

        }else{
            toast.error(data.message)
        }
    }catch(error){
        toast.error(error.message)
    }
}

// function to change job visibility
const changeJobVisibility = async (id) => {
    try{
        const { data } = await axios.post(backendUrl + '/api/company/change-visibility', {id}, {headers: {token : companyToken}})
        if(data.success){
            toast.success(data.message)
            fetchCompanyJobs()
        }else{
            toast.error(data.message)
        }
    }catch(error){
        toast.error(error.message)
    }
}


useEffect(()=>{
    if(companyToken){
        fetchCompanyJobs()
    }
},[companyToken])



  return (
    <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
                <thead className="py-2 px-4 border-b text-left border-gray-200">
                    <tr className="">
                        <th className="py-2 px-4 border-b text-left border-gray-200 max-sm:hidden">#</th>
                        <th className="py-2 px-4 border-b text-left border-gray-200">Job Title</th>
                        <th className="py-2 px-4 border-b text-left border-gray-200 max-sm:hidden">Date</th>
                        <th className="py-2 px-4 border-b text-left border-gray-200 max-sm:hidden">Location</th>
                        <th className="py-2 px-4 border-b text-left border-gray-200">Applicants</th>
                        <th className="py-2 px-4 border-b text-left border-gray-200">Visible</th>
                    </tr>
                </thead>
                <tbody className="">
                    {jobs.map((job, index)=>(
                        <tr key={index} className='text-gray-700'>
                            <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{index+1}</td>
                            <td className='py-2 px-4 border-b border-gray-200'>{job.title}</td>
                            <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                            <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{job.location}</td>
                            <td className='py-2 px-4 border-b border-gray-200 text-center'>{job.applicants}</td>
                            <td className='py-2 px-4 border-b border-gray-200'>
                                <input onChange={()=>changeJobVisibility(job._id)} type="checkbox" className="scale-125 ml-4" checked={job.visible} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-4 flex justify-end">
            <button onClick={()=>navigate('/dashboard/add-job')} className="bg-black text-white py-2 px-4 rounded">Add New Job</button>
        </div>
    </div>
  )
}

export default ManageJobs