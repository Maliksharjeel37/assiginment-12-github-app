"use client"
import { useState } from "react";
export default function Home() {
  const[userName,setuserName]=useState(null);
  const[followers,setfollowers]=useState([]);
  const [data,setdata]=useState();
  const onchange=(e)=>{
    setuserName(e.target.value)
  }
  const onclick= async()=>{
    setfollowers([])
    let response= await fetch(`https:api.github.com/users/${userName}`)
    
    response= await response.json();
    setdata(response)
    // console.log(response)
  }
  const getfollwer= async()=>{
    let response= await fetch(data.followers_url)
    response = await response.json()
    console.log("response", response);
    setfollowers(response)
  }
  return (
    <div className=" text-center">
        <h1 className=" mx-5 my-5 text-5xl font-bold"> "GITHUB-APP"</h1>
      <label htmlFor="username" className=" text-3xl font-bold  mt-4 ">Enter username:</label>
      <input className=" border-4 border-black mx-2 shadow-lg shadow-black hover:bg-slate-100 text-black " type="text" onChange={onchange} id="userName"placeholder="Enter username"/>
      <button className=" border-2 shadow-blue-600 shadow-lg border-blue-700 rounded-3xl bg-blue-600 mx-5 my-5 w-28 h-11 text-white hover:bg-white  hover:text-black" onClick={onclick}>search</button>
      {data && <>
        <h1 className=" text-6xl font-bold mt-5 ">Github user</h1>
                    <img className=" rounded-full mx-20" src={data.avatar_url} width={100} alt="" />
                    <span className=" text-lg font-bold">Bio: {data.bio} - {data.followers}</span>
                    <span className=" text-lg font-bold">Name: {data.name} </span>
                    <button className=" border-2 shadow-blue-600 shadow-lg border-blue-700 rounded-3xl bg-blue-600 mx-5 my-5 w-28 h-11 text-white hover:bg-white  hover:text-black" onClick={getfollwer} >getfollwers</button>
                   
      </>}
        {followers.length >= 1 &&

            <table>
                <tr >
                    <th>id</th>
                    <th>avator</th>
                    <th>name</th>
                    <th>type</th>
                    
                   
                </tr>
                {followers.map((element) => {
                    return (
                        <tr>
                            <td>{element.id}</td>
                            <td > <img className=" rounded-full" src={element.avatar_url} width={50} alt="" /></td>
                            <td >{element.login}</td>
                            <td>{element.type}</td>
                        
                            
                        </tr>
                    )
                })}

            </table>
}
    </div>
  );
}
