import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Select } from "./ui/select";

interface AdvConfigType {
  typeOfmodel: string;
  performanceMetric: string[];
  featureEngineeringTechniques: string[];
  isTargetClassImbalance: boolean;
}

const AdvancedConfigForm = ({
  advConfig,
  setAdvConfig,
}: {
  advConfig: AdvConfigType;
  setAdvConfig: (config: AdvConfigType) => void;
}) => {
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
            Optimize models, handle imbalances, and address unique data needs
            for better performance.
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
                <SelectItem value="DecisionTrees">Decision Trees</SelectItem>
                <SelectItem value="RandomForest">Random Forest</SelectItem>
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
                  checked={advConfig.performanceMetric.includes("Accuracy")}
                />
                <Label htmlFor="terms">Accuracy</Label>
              </div>

              <div className="flex items-center space-x-1">
                <Checkbox
                  onClick={() =>
                    handlePerformanceMetricClick({ option: "Precision" })
                  }
                  checked={advConfig.performanceMetric.includes("Precision")}
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
                  checked={advConfig.performanceMetric.includes("F1-score")}
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
                  Feature Selection (SelectKBest, Recursive Feature Elimination)
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
                setAdvConfig({
                  ...advConfig,
                  isTargetClassImbalance: !advConfig.isTargetClassImbalance,
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
  );
};

export default AdvancedConfigForm;
