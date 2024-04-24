import { DeepChat } from "deep-chat-react";

export default function Chat({ patients, user }) {
  return (
    <>
      <DeepChat
        introMessage={{
          text: "Talk with me to get more information about the dataset. E.g. What features are included in the data? Can you evaluate the model? Can you calculate the feature importances?",
        }}
        request={{ url: "http://localhost:8000/chat" }}
        requestInterceptor={(details) => {
          details.body.messages.push({ user: user.id });
          console.log(details);
          return details;
        }}
        style={{ borderRadius: "10px", width: "900px", height: "600px" }}
        textInput={{ placeholder: { text: "Ask me anything!" } }}
        responseInterceptor={(response) => {
          console.log("respone", response);
          return response;
        }}
      />
    </>
  );
}
