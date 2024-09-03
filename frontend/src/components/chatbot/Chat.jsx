import { DeepChat } from "deep-chat-react";

export default function Chat({ patients, user, setUpdateCount }) {
  return (
    <>
      <DeepChat
        introMessage={{
          html: "<p>Talk with me to get more information about the dataset.</p><br> <p>E.g. What features are included in the data?</p> <p> Can you evaluate the model?</p> <p> Can you calculate the feature importances?</p>",
        }}
        request={{
          url: "https://fairml-481932072131.europe-west1.run.app/chat",
        }}
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
