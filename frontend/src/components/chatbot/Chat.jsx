import { DeepChat } from "deep-chat-react";
import { Button } from "@material-tailwind/react";

export default function Chat({ patients, user, setUpdateCount }) {
  const handleClick = async (text) => {
    console.log(text);
    document
      .getElementById("text-input")
      .classList.remove("text-input-placeholder");
    document.getElementById("text-input").textContent = text;
    console.log(document.getElementById("text-input"));
  };

  return (
    <>
      <DeepChat
        introMessage={{
          html: "<p>Talk with me to get more information about the dataset.</p><br> <p>E.g. What features are included in the data?</p> <p> Can you evaluate the model?</p> <p> Can you calculate the feature importances?</p>",
        }}
        request={{ url: "http://localhost:8000/chat" }}
        requestInterceptor={(details) => {
          details.body.messages.push({ user: user.id });
          console.log(details);
          return details;
        }}
        style={{ borderRadius: "10px", width: "900px", height: "600px" }}
        textInput={{
          placeholder: { text: "Ask me anything!" },
        }}
        responseInterceptor={(response) => {
          console.log("respone", response);
          return response;
        }}
      />
    </>
  );
}
