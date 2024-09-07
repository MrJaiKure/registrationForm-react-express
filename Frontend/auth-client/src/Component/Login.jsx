import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate=useNavigate();


  
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setUserData({
        username: data.username,
        profileImage: `http://localhost:5000/${data.profileImage}`,
      });
      // navigate("/profile");
    } else {
      setMessage(data.message);
    }
  };


  return (
    <div>
      <h1 className="flex justify-center text-2xl font-bold">Login Here</h1>   
      
     <div className="justify-center  flex">
      <form className="flex rounded-lg h-92 gap-3 flex-col bg-black p-3 w-1/2" onSubmit={handleSubmit}>
      <p>{message}</p>
      <label>Enter your email here</label>

        <input
          type="email"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-zinc-600 rounded-lg p-2"
        />
          <label>Enter your password here</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-600 rounded-lg p-2"
        />
        <div  className="flex justify-between mt-3">
        <button className="bg-blue-700 p-1 rounded-md" type="submit">Login</button>
        <button className="bg-gray-700 p-1 rounded-md" ><Link to="/signup" > Signup</Link></button>
        </div>
      </form>
      </div>
    

<div className=" flex justify-center">
  
       {userData && (
         <div className=" flex  flex-col gap-2 justify-center">
          <div className="mt-3">
          <h3 >Welcome, {userData.username}</h3>
          {console.log(userData)}
           <img src={userData.profileImage} alt="Profile" width="100" />
           </div>
           <button className="bg-red-600 rounded-md p-1" onClick={handleLogout}>Logout</button>
         </div> 
       )}
       </div>
    </div>
  );
};

export default Login;