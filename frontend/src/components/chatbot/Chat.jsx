import { DeepChat } from "deep-chat-react";

export default function Chat(patients, user) {
  const initialMessages = [
    { role: "user", text: "Hey, how are you today?" },
    { role: "ai", text: "I am doing very well!" },
  ];

  return (
    <>
      <DeepChat
        introMessage={{
          text: "Talk with me to get more information about the dataset. E.g. what is the average age of the patients.",
        }}
        request={{ url: "http://localhost:8000/chat" }}
        style={{ borderRadius: "10px", width: "900px", height: "600px" }}
        textInput={{ placeholder: { text: "Welcome to the demo!" } }}
        responseInterceptor={(response) => {
          console.log("respone", response);
          return response;
        }}
      />
    </>
  );
}
