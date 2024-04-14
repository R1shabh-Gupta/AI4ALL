import CopyButton from "./CopyButton";
import Loader from "./Loader";
import { Textarea } from "./Textarea";
import { Label } from "./ui/label";

type OutputTextareaProps = {
  outputText: string;
  isLoading: boolean;
  setOutputText: (text: string) => void;
  title: string;
};

const OutputTextarea = ({
  outputText,
  isLoading,
  setOutputText,
  title,
}: OutputTextareaProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <Label htmlFor="message" className="text-lg">
          {title}
        </Label>
        <CopyButton outputText={outputText} />
      </div>
      <div className="relative">
        {isLoading && <Loader />}
        <Textarea
          className="top-0 h-80 placeholder:italic placeholder:text-slate-400"
          placeholder="Output will be displayed here :)"
          id="message"
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OutputTextarea;
