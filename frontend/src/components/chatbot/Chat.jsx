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
      {/* <div className="flex flex-col pt-10 gap-x-10 gap-y-4"> */}
      {/*   <div className="flex flex-row gap-x-6 w-[900px]"> */}
      {/*     <Button */}
      {/*       variant="filled" */}
      {/*       size="lg" */}
      {/*       color="blue" */}
      {/*       fullWidth */}
      {/*       onClick={() => */}
      {/*         handleClick("What features are included in the data?") */}
      {/*       } */}
      {/*     > */}
      {/*       Ask: What features are included in the data? */}
      {/*     </Button> */}
      {/*     <Button */}
      {/*       variant="filled" */}
      {/*       size="lg" */}
      {/*       color="blue" */}
      {/*       fullWidth */}
      {/*       onClick={() => handleClick("Can you evaluate the model?")} */}
      {/*     > */}
      {/*       Ask: Can you evaluate the model? */}
      {/*     </Button> */}
      {/*     <Button */}
      {/*       variant="filled" */}
      {/*       size="lg" */}
      {/*       color="blue" */}
      {/*       fullWidth */}
      {/*       onClick={() => */}
      {/*         handleClick("Can you caculate the feature importances?") */}
      {/*       } */}
      {/*     > */}
      {/*       Ask: Can you calculate the feature importances? */}
      {/*     </Button> */}
      {/*   </div> */}
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
        textInput={{
          placeholder: { text: "Ask me anything!" },
        }}
        responseInterceptor={(response) => {
          console.log("respone", response);
          return response;
        }}
      />
      {/* </div> */}
    </>
  );
}
