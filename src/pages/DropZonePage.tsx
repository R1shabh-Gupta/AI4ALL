import DropZoneForm from "@/components/DropZoneForm";
import DropZoneResult from "@/components/DropZoneResult";
import { useState } from "react";

const DropZonePage = () => {
  const [isPromptGenerated, setIsPromptGenerated] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  return (
    <div className="relative min-h-screen py-6 overflow-hidden bg-gray-50 sm:py-12">
      <img
        src="/assets/images/beams.jpg"
        className="absolute -translate-x-1/2 -translate-y-1/2 -z-10 top-1/2 left-1/2 max-w-none"
        width="1308"
      />

      <div className="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="z-40 w-[92%] sm:w-2/3 h-full p-12 mx-auto shadow-[0px_0px_50px_40px_#76078528] bg-gray-100 border border-gray-200 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex sm:flex-row flex-col justify-evenly gap-8">
        {!isPromptGenerated ? (
          <DropZoneForm
            setGeneratedPrompt={setGeneratedPrompt}
            setIsPromptGenerated={setIsPromptGenerated}
          />
        ) : (
          <DropZoneResult
            setIsPromptGenerated={setIsPromptGenerated}
            generatedPrompt={generatedPrompt}
          />
        )}
      </div>
    </div>
  );
};

export default DropZonePage;
