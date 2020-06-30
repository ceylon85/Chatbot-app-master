import React from "react";
import Axios from "axios";

function Chatbot2() {

  const textQuery = async (text) => {

    //1. 내가 보낸 메세지를 관리(입력한 것을 채팅창에 보여주기 위해)
    let conversation = {
        who: 'user', 
        content: {
            text: {
                text: text
            }
        }
    }
    const textQueryVariables = {
        text
    }
    //2. 챗봇이 보낸 메세지를 처리
    try{
        //textQuery Ro ute에 request를 보낸다.
       const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables )
       const content = response.data.fulfillmentMessages[0]
       conversation = {
           who: 'bot',
           content: content
       }
    } catch(error){
        conversation = {
            who: 'bot',
            content: {
                text: {
                    text: "에러가 발생했으니, 문제를 확인해주세요"
                }
            }
        }
    }
}

  const KeyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("먼저 무언가을 입력하고 엔터를 누르세요!");
      }
      //무언가를 입력했다면 그 값과 함께 textQuery Route에 request를 보낸다.
      e.target.value = "";
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}></div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={KeyPressHandler}
        type="text"
      />
    </div>
  );
}

export default Chatbot2;
