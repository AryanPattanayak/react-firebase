import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from "./firebase/firebase"
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
const App = () => {

  const [users,setUsers]=useState([])
const[data,setData]=useState({
  username:"",
  age:"",
  email:"",
  subject:""
})
  //! to get the data from firebase
  const getData=async()=>{
    try {
      const querySnapshot= await getDocs(collection(db,"users"))
    const user=querySnapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
    setUsers(user)
    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{
getData()
},[])

//! to set the data to firebase
const addUser=async()=>{
  try {
    const docRef=await addDoc(collection(db,"users"),data)
    toast.success("Document written with ID",{position:"top-center"})
console.log("Document written with ID", docRef.id)
  } catch (error) {
    toast.error("Unable to create document",{position:"top-center"})
    console.log("Unable to create document",error)
  }
}

//! form handling

const {username,age,email,subject}=data
const handleForm=(e)=>{
  e.preventDefault()
addUser()
getData()
setData({
username:"",
age:"",
  email:"",
  subject:""
})
}
const handleChange=(e)=>{
const {name,value}=e.target
setData({...data,[name]:value})
}


// ! delete user

const deleteUser=async(userId)=>{
  try {
    await deleteDoc(doc(db,"users",userId));
    toast.success("Document successfully deleted!",{position:"top-right"})
    getData()
    console.log("Document successfully deleted!")
  } catch (error) {
    toast.error("Error deleting document",{position:"top-right"})
    console.log("Error deleting document",error)
  }
}

  return (
    <div>
      <h1>FIREBASE</h1>

<form onSubmit={handleForm}>
<input type="text" placeholder='enter username' name='username' value={username} onChange={handleChange}/> <br />
<input type="number" placeholder='enter age' name='age' value={age} onChange={handleChange}/> <br />
<input type="email" placeholder='enter email' name='email' value={email} onChange={handleChange}/> <br />
<input type="text" placeholder='enter subject' name='subject' value={subject} onChange={handleChange}/> <br />
<button>Submit</button>
</form>

<hr />


      {
users.length===0?<h1>Loading.....</h1>:users.map((user)=>{
  return(
    <div key={user.id}  style={{width:"300px",height:"300px",border:"2px solid black", display:"flex",flexDirection:"column", alignItems:"center",gap:"2px"}}>
    <h1 >{user.username}</h1>
    <p>{user.age}</p>
    <p>{user.email}</p>
    <p>{user.subject}</p>
    <button><Link to="/update" state={user}>Update</Link></button> //! state is a key in link to carry data when the url is triggered
    <button onClick={()=>deleteUser(user.id)}>Delete</button>
    </div>

  )
})
      }
      <ToastContainer/>
    </div>
  )
}

export default App
