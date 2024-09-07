import React from 'react'


const Profile = () => {
  // const navigate=useNavigate();
  // const handleLogout=()=>{
  //   localStorage.removeItem("token");
  //   // setUserData(null);
  //   navigate("/login");
  // };

  return (
    <div>

      <h1>this is user profile page</h1>

      <h2>welcome</h2>
        {/* <h1>this is profile profileImage</h1>
         {userData && (
        <div>
          <h3>Welcome, {userData.username}</h3>
          <img src={userData.profileImage} alt="Profile" width="100" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )} */}
       {/* <button onClick={handleLogout}>Logout</button> */}
      
    </div>
  )
}

export default Profile
