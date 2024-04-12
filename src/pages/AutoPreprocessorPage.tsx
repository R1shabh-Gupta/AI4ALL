import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const AutoPreprocessorPage = () => {
  const [CSVFile, setCSVFile] = useState<File>();
  const { toast } = useToast();
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const showMaxSizeLimitExceeded = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! File size limit exceeded.",
      description: "File size exceeds 5MB. Please choose a smaller file.",
    });
  };

  const onAddingCSVFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      if (selectedFile.size > MAX_FILE_SIZE) {
        showMaxSizeLimitExceeded();
        return;
      }

      setCSVFile(selectedFile);
      console.log(CSVFile);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-6 overflow-hidden bg-gray-50 sm:py-20">
      <img
        src="/assets/images/beams.jpg"
        className="absolute -translate-x-1/2 -translate-y-1/2 -z-10 top-1/2 left-1/2 max-w-none"
        width="1308"
      />

      <div className="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="z-40 w-[92%] sm:w-2/3 h-full p-12 mx-auto shadow-[0px_0px_50px_40px_#ecfdf5] bg-gray-100 border border-gray-200 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex flex-col justify-evenly gap-8">
        <div className="flex flex-col items-center justify-center w-full h-64 gap-4 border-2 border-gray-200 border-dashed rounded-md sm:py-24 sm:h-auto bg-slate-50">
          <Input
            id="name"
            className="sm:w-[30%] w-3/4 col-span-3"
            type="file"
            accept=".csv"
            onChange={onAddingCSVFile}
          />
          <Label htmlFor="name" className="text-lg text-center text-gray-400">
            Upload CSV dataset for preprocessing
          </Label>
        </div>

        <Button className="bg-green-950 hover:bg-green-900">
          Download Preprocessed Dataset
        </Button>
      </div>
    </div>
  );
};

export default AutoPreprocessorPage;
