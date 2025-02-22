import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import db from '../firebase/firebase'
import { toast } from 'react-toastify'

const Update = () => {

const[data,setData]=useState({
  username:"",
  age:"",
  email:"",
  subject:""
})
 
const navigate=useNavigate()


// ! useLocation Hook - it will help to get the data from the path 

const {state}=useLocation()



useEffect(()=>{
setData({...data,...state})
},[])

const updateUser=async()=>{
    try {
        await setDoc(doc(db,"users",state.id),data)
        toast.success("Document update successfully!",{position:"top-right"})
        console.log("Document update successfully!")
        setData({
            username:"",
            age:"",
            email:"",
            subject:""
        })
        navigate("/")
    } catch (error) {
        toast.error("Error updating document",{position:"top-right"})
        console.log("Error updating document",error)
    }
}

//! form handling

const {username,age,email,subject}=data
const handleForm=(e)=>{
  e.preventDefault()
updateUser()
}
const handleChange=(e)=>{
const {name,value}=e.target
setData({...data,[name]:value})
}


  return (
    <div>
      <form onSubmit={handleForm}>
<input type="text" placeholder='enter username' name='username' value={username} onChange={handleChange}/> <br />
<input type="number" placeholder='enter age' name='age' value={age} onChange={handleChange}/> <br />
<input type="email" placeholder='enter email' name='email' value={email} onChange={handleChange}/> <br />
<input type="text" placeholder='enter subject' name='subject' value={subject} onChange={handleChange}/> <br />
<button>Submit</button>
</form>
    </div>
  )
}

export default Update
