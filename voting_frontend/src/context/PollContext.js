import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";

const PollContext = createContext();

export default PollContext;

export const PollProvider = ({children}) => {
  let { accessToken, refreshToken, user } = useContext(AuthContext);

  let [polls, setPolls] = useState([]);

  let getPolls = async () => {
    let response = await fetch("http://localhost:8000/polls/getpolls", {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    });
    let data = await response.json();
    if(response.status === 200){
      setPolls(data);
    }
    else{
      alert(data.detail)
    }
  };

  let createPoll = async (e) => {
    let response = await fetch('http://localhost:8000/polls/createpoll/', {
      method:'POST',
      headers:{
        'Authorization': "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body:{
        'question' : e.target.question.value,
        
      }
    })
  }

  let contextData = {
    polls:polls,
    getPolls:getPolls,
    createPoll:createPoll
  }

  return (
    <PollContext.Provider value={contextData}>{children}</PollContext.Provider>
  )
};
