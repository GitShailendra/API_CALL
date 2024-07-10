// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-loader-spinner'
import Error from './assets/error-page.webp'

// import UserCard from './UserCard';
import UserCard from './components/UserCard';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming the API returns an array of users and we're interested in the first one
        const response = await axios.get(
          "https://602e7c2c4410730017c50b9d.mockapi.io/users"
        );
        const users = response.data;
        if (users.length > 0) {
          setUsers(users);
          setLoading(false);
        }
      } catch (error) {
        console.log("Failed to fetch user data:", error.message);
        setError(true)
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
   if (loading) {
    return <div className='loader'>
      <ProgressBar
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
   }
   if(error){
    return <>
    <div  className='error-page'>
    <img  src={Error} alt='Error'/>
    
    </div>
    </>
   }
  return (
    <div className="App">
      <h2>User Cards</h2>
      
      
      <div className="content-container">
        <div className="user-cards-container">
          
         {users.map((item,idx)=>{
                 return     <UserCard key={item.idx} user={item} onClick={setSelectedUser} />

         })}
        </div>
        {selectedUser && (
          <div className="user-details">
            <h2>User Details</h2>
            <img src={selectedUser.avatar} alt={`${selectedUser.name}'s avatar`} />
            <h2>{selectedUser.profile.username}</h2>
            <p>firstName: {selectedUser.profile.firstName}</p>
            <p>lastName: {selectedUser.profile.lastName}</p>
            <p>jobTitle: {selectedUser.jobTitle}</p>
            <p>ID:{selectedUser.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

