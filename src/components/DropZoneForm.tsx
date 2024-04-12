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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Or using type alias
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

  const onAddingImg = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      setPicture(files[0]);
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
          // "http://127.0.0.1:5000/generateprompt",
          "https://r1shabhai4all.pythonanywhere.com/generateprompt",
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

  const handlePerformanceMetricClick = ({ option }: { option: string }) => {
    const isSelected = advConfig.performanceMetric.includes(option);

    setAdvConfig({
      ...advConfig,
      performanceMetric: isSelected
        ? advConfig.performanceMetric.filter((val) => val !== option)
        : [...advConfig.performanceMetric, option],
    });
    console.log(advConfig.performanceMetric);
  };

  const handleFeatureEngineeringTechniquesClick = ({
    option,
  }: {
    option: string;
  }) => {
    const isSelected = advConfig.featureEngineeringTechniques.includes(option);

    setAdvConfig({
      ...advConfig,
      featureEngineeringTechniques: isSelected
        ? advConfig.featureEngineeringTechniques.filter((val) => val !== option)
        : [...advConfig.featureEngineeringTechniques, option],
    });
    console.log(advConfig.featureEngineeringTechniques);
  };

  return (
    <>
      <div className="w-full sm:w-[40%] h-64 sm:h-auto gap-4 rounded-md border-2 border-dashed border-gray-200 flex flex-col justify-center items-center bg-slate-50 px-12">
        <Input
          id="name"
          className="col-span-3"
          type="file"
          accept="image/*"
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

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="font-normal text-gray-600 hover:bg-[#85269109] text-md"
              >
                Advanced Configuration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] px-8 p-12">
              <DialogHeader>
                <DialogTitle>Advanced Configuration</DialogTitle>
                <DialogDescription>
                  Optimize models, handle imbalances, and address unique data
                  needs for better performance.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-8 mt-4">
                {/* Type of model */}
                <div className="flex items-center justify-center gap-4">
                  <Label className="font-semibold text-md text-nowrap">
                    Type of model
                  </Label>
                  <Select
                    onValueChange={(value: string) => {
                      setAdvConfig({ ...advConfig, typeOfmodel: value });
                    }}
                    defaultValue={advConfig.typeOfmodel}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="LinearRegression">
                        Linear Regression
                      </SelectItem>
                      <SelectItem value="LogisticRegression">
                        Logistic Regression
                      </SelectItem>
                      <SelectItem value="DecisionTrees">
                        Decision Trees
                      </SelectItem>
                      <SelectItem value="RandomForest">
                        Random Forest
                      </SelectItem>
                      <SelectItem value="SupportVectorMachines">
                        Support Vector Machines
                      </SelectItem>
                      <SelectItem value="GradientBoosting">
                        Gradient Boosting
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Performance Metric */}
                <div className="flex flex-col justify-center gap-3">
                  <Label
                    className="font-semibold text-md text-nowrap"
                    htmlFor="framework"
                  >
                    Performance Metric
                  </Label>

                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handlePerformanceMetricClick({ option: "Accuracy" })
                        }
                        checked={advConfig.performanceMetric.includes(
                          "Accuracy"
                        )}
                      />
                      <Label htmlFor="terms">Accuracy</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handlePerformanceMetricClick({ option: "Precision" })
                        }
                        checked={advConfig.performanceMetric.includes(
                          "Precision"
                        )}
                      />
                      <Label htmlFor="terms">Precision</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handlePerformanceMetricClick({ option: "Recall" })
                        }
                        checked={advConfig.performanceMetric.includes("Recall")}
                      />
                      <Label htmlFor="terms">Recall</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handlePerformanceMetricClick({ option: "F1-score" })
                        }
                        checked={advConfig.performanceMetric.includes(
                          "F1-score"
                        )}
                      />
                      <Label htmlFor="terms">F1-score</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handlePerformanceMetricClick({
                            option: "Mean Squared Error",
                          })
                        }
                        checked={advConfig.performanceMetric.includes(
                          "Mean Squared Error"
                        )}
                      />
                      <Label htmlFor="terms">Mean Squared Error</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handlePerformanceMetricClick({
                            option: "Root Mean Squared Error",
                          })
                        }
                        checked={advConfig.performanceMetric.includes(
                          "Root Mean Squared Error"
                        )}
                      />
                      <Label htmlFor="terms">Root Mean Squared Error</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handlePerformanceMetricClick({
                            option: "Mean Absolute Error",
                          })
                        }
                        checked={advConfig.performanceMetric.includes(
                          "Mean Absolute Error"
                        )}
                      />
                      <Label htmlFor="terms">Mean Absolute Error</Label>
                    </div>
                  </div>
                </div>

                {/* Feature Engineering Techniques */}
                <div className="flex flex-col justify-center gap-3">
                  <Label
                    className="font-semibold text-md text-nowrap"
                    htmlFor="framework"
                  >
                    Feature Engineering Techniques
                  </Label>

                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handleFeatureEngineeringTechniquesClick({
                            option: "One Hot Encoding",
                          })
                        }
                        checked={advConfig.featureEngineeringTechniques.includes(
                          "One Hot Encoding"
                        )}
                      />
                      <Label htmlFor="terms">One-Hot Encoding</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handleFeatureEngineeringTechniquesClick({
                            option: "Feature Scaling",
                          })
                        }
                        checked={advConfig.featureEngineeringTechniques.includes(
                          "Feature Scaling"
                        )}
                      />
                      <Label htmlFor="terms">Feature Scaling</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handleFeatureEngineeringTechniquesClick({
                            option: "Dimensionality Reduction",
                          })
                        }
                        checked={advConfig.featureEngineeringTechniques.includes(
                          "Dimensionality Reduction"
                        )}
                      />
                      <Label htmlFor="terms">
                        Dimensionality Reduction (PCA, t-SNE)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handleFeatureEngineeringTechniquesClick({
                            option: "Feature Selection",
                          })
                        }
                        checked={advConfig.featureEngineeringTechniques.includes(
                          "Feature Selection"
                        )}
                      />
                      <Label htmlFor="terms">
                        Feature Selection (SelectKBest, Recursive Feature
                        Elimination)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handleFeatureEngineeringTechniquesClick({
                            option: "Handling Missing Values",
                          })
                        }
                        checked={advConfig.featureEngineeringTechniques.includes(
                          "Handling Missing Values"
                        )}
                      />
                      <Label htmlFor="terms">Handling Missing Values</Label>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Checkbox
                        onClick={() =>
                          handleFeatureEngineeringTechniquesClick({
                            option: "Handling Outliers",
                          })
                        }
                        checked={advConfig.featureEngineeringTechniques.includes(
                          "Handling Outliers"
                        )}
                      />
                      <Label htmlFor="terms">Handling Outliers</Label>
                    </div>
                  </div>
                </div>

                {/* Imbalance in Target Classes */}
                <div className="flex items-center gap-3">
                  <Label
                    className="font-semibold text-md text-nowrap"
                    htmlFor="framework"
                  >
                    Is there imbalance in target classes?
                  </Label>
                  <Checkbox
                    onClick={() => {
                      setAdvConfig((prev) => {
                        return {
                          ...prev,
                          isTargetClassImbalance: !prev.isTargetClassImbalance,
                        };
                      });
                    }}
                    checked={advConfig.isTargetClassImbalance}
                  />
                </div>
              </div>
              <DialogFooter>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={() => {
                      const event = new KeyboardEvent("keydown", {
                        key: "Escape",
                      });
                      document.dispatchEvent(event);
                    }}
                    className="bg-[#000]/90 hover:bg-[#000000e6] px-10 text-md"
                  >
                    Save
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
