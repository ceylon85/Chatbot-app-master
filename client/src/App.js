import React from "react";
import { Typography, Icon } from "antd";

import Chatbot2 from "./Chatbot/Chatbot2";
const { Title } = Typography;

function App() {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Title level={2}>
          CHAT BOT APP&nbsp;
          <Icon type="robot" />
        </Title>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chatbot2 />
      </div>
    </div>
  );
}

export default App;
