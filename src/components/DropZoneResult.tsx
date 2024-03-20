import { useNavigate } from "react-router-dom";
import CopyButton from "./CopyButton";
import { Textarea } from "./Textarea";
import { Button } from "./ui/button";

const DropZoneResult = ({
  generatedPrompt,
  setIsPromptGenerated,
}: {
  generatedPrompt: string;
  setIsPromptGenerated: (prompt: boolean) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-700 sm:text-3xl">
          Here is the Prompt
        </h2>
        <div className="-mt-2">
          <CopyButton outputText={generatedPrompt} />
        </div>
      </div>

      <Textarea
        className="top-0 w-full sm:w-[800px] h-[500px] sm:h-80 placeholder:italic placeholder:text-slate-400"
        placeholder="Output will be displayed here :)"
        id="message"
        value={generatedPrompt}
        readOnly
      />

      <Button
        onClick={() => {
          setIsPromptGenerated(false);
          navigate("/dropzone");
        }}
        className="bg-[#760785da] px-8 w-fit text-md font-semibold"
      >
        Go Back
      </Button>
    </div>
  );
};

export default DropZoneResult;
