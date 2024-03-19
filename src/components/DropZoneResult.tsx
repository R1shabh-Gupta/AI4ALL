import { useNavigate } from "react-router-dom";
import CopyButton from "./CopyButton";
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
        <h2 className="text-3xl font-bold text-gray-700">Here is the Prompt</h2>
        <div className="-mt-2">
          <CopyButton outputText={generatedPrompt} />
        </div>
      </div>
      <p className="text-gray-600">{generatedPrompt}</p>
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
