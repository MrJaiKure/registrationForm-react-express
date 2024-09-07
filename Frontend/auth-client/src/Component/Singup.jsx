import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Signup successful");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <h2 className="flex justify-center text-2xl font-bold">Register Here</h2>
      <div className="justify-center  flex">
      <form className="flex rounded-lg h-92 gap-3 flex-col bg-black p-3 w-1/2" onSubmit={handleSubmit}>
      <Link className="text-blue-600 " to="/"> Home</Link>
      <p className="text-white ">{message}</p>
        <label> Enter your email here</label>
        <input
          type="email"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-zinc-600 rounded-lg p-2"
        />
        <label> Enter your Password here</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           className="bg-zinc-600 rounded-lg p-2"
        />
        <label>Enter you profile pic</label>
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <div className="flex justify-between mt-3">
        <button className="bg-blue-700 p-1 rounded-md" type="submit">Signup</button>
        <button  className="bg-zinc-700 p-1 rounded-md" ><Link to="/login" > Login</Link></button></div>

      </form>
      </div>
     
    </div>
  );
};

export default Signup;