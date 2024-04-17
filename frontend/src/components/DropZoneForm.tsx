import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdvancedConfigForm from "./AdvancedConfigForm";

type AdvConfigType = {
  typeOfmodel: string;
  performanceMetric: string[];
  featureEngineeringTechniques: string[];
  isTargetClassImbalance: boolean;
};

const DropZoneForm = ({
  setGeneratedPrompt,
  setIsPromptGenerated,
}: {
  setGeneratedPrompt: (prompt: string) => void;
  setIsPromptGenerated: (prompt: boolean) => void;
}) => {
  const { toast } = useToast();
  const auth = getAuth();
  const user = auth.currentUser;

  const domainName = useRef(null);

  const [modelType, setModelType] = useState("Classification");
  const [isMissingValue, setIsMissingValue] = useState(false);
  const [isGPU, setIsGPU] = useState(false);
  const [picture, setPicture] = useState<File>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [advConfig, setAdvConfig] = useState<AdvConfigType>({
    typeOfmodel: "",
    performanceMetric: [],
    featureEngineeringTechniques: [],
    isTargetClassImbalance: false,
  });
  const MAX_FILE_SIZE = 700 * 1024;

  const showMaxSizeLimitExceeded = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! File size limit exceeded.",
      description: "File size exceeds 5MB. Please choose a smaller file.",
    });
  };

  const onAddingImg = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      if (selectedFile.size > MAX_FILE_SIZE) {
        showMaxSizeLimitExceeded();
        setPicture(undefined);
        return;
      }

      setPicture(selectedFile);
      console.log(picture);
    }
  };

  const showUserNotLoggedInError = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Please login to continue.",
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (
      (domainName.current
        ? (domainName.current as HTMLInputElement).value
        : "") == "" ||
      modelType == "Not Selected" ||
      picture == undefined
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill all the fields.",
      });
      return;
    }

    formData.append(
      "domainName",
      domainName.current ? (domainName.current as HTMLInputElement).value : ""
    );
    formData.append("modelType", modelType);
    formData.append("isMissingValue", String(isMissingValue));
    formData.append("isGPU", String(isGPU));
    formData.append("typeOfmodel", advConfig.typeOfmodel);
    formData.append("performanceMetric", advConfig.performanceMetric.join(","));
    formData.append(
      "featureEngineeringTechniques",
      advConfig.featureEngineeringTechniques.join(",")
    );
    formData.append(
      "isTargetClassImbalance",
      String(advConfig.isTargetClassImbalance)
    );

    if (picture) {
      formData.append("picture", picture);
    }
    if (user) {
      try {
        setIsProcessing(true);
        const response = await axios.post(
           "http://127.0.0.1:5000/generateprompt",
          //"https://r1shabhai4all.pythonanywhere.com/generateprompt",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsProcessing(false);
        console.log(response.data);
        setGeneratedPrompt(response.data.message);
        setIsPromptGenerated(true);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("User not logged in");
      showUserNotLoggedInError();
    }
  };

  return (
    <>
      <div className="w-full sm:w-[40%] h-64 sm:h-auto gap-4 rounded-md border-2 border-dashed border-gray-200 flex flex-col justify-center items-center bg-slate-50 px-12">
        <Input
          id="name"
          className="col-span-3"
          type="file"
          accept=".csv,image/*"
          onChange={onAddingImg}
        />
        <Label htmlFor="name" className="text-lg text-center text-gray-400">
          Upload CSV or Image of the dataset
        </Label>
      </div>

      <div className="w-full sm:w-1/2">
        <h1 className="sm:text-4xl text-3xl text-[#770785] font-heading font-bold">
          Meta Data
        </h1>

        <div className="flex flex-col w-full gap-4 mt-8">
          <div className="w-full">
            <Label htmlFor="name">Domain Name</Label>
            <Input
              ref={domainName}
              id="name"
              placeholder="artificial intelligence"
            />
          </div>

          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center justify-center gap-2">
              <Label className="text-nowrap" htmlFor="framework">
                Type of model
              </Label>
              <Select
                onValueChange={(value) => setModelType(value)}
                defaultValue={"Classification"}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Classification">Classification</SelectItem>
                  <SelectItem value="Clustering">Clustering</SelectItem>
                  <SelectItem value="Regression">Regression</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-10 mb-4 -mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox onClick={() => setIsMissingValue((prev) => !prev)} />
                <Label htmlFor="terms">Missing Values</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox onClick={() => setIsGPU((prev) => !prev)} />
                <Label htmlFor="terms">GPU</Label>
              </div>
            </div>
          </div>

          <AdvancedConfigForm
            advConfig={advConfig}
            setAdvConfig={setAdvConfig}
          />

          <Button
            onClick={() => handleSubmit()}
            className="bg-[#770785]/90 hover:bg-[#770785]"
          >
            {isProcessing ? "Processing..." : "Submit"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DropZoneForm;
