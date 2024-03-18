import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropZonePage = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("Uploaded file:", file);
    }
  };

  return (
    <div className="relative min-h-screen py-6 overflow-hidden bg-gray-50 sm:py-12">
      <img
        src="/assets/images/beams.jpg"
        className="absolute -translate-x-1/2 -translate-y-1/2 -z-10 top-1/2 left-1/2 max-w-none"
        width="1308"
      />

      <div className="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* toolbox */}
      <div className="z-40 w-2/3 h-full p-12 mx-auto shadow-[0px_0px_50px_40px_#EBF8FF] bg-gray-100 border border-gray-200 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex justify-evenly gap-8">
        <div className=" w-[40%] h-auto gap-4 rounded-md border-2 border-dashed border-gray-200 flex flex-col justify-center items-center bg-slate-50 px-12">
          <Input
            id="name"
            className="col-span-3"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileUpload}
          />
          <Label htmlFor="name" className="text-lg text-gray-400">
            Upload Dataset
          </Label>
        </div>
        <div className="w-1/2">
          <h1 className="sm:text-4xl text-3xl text-[#770785] font-heading font-bold">
            Meta Data
          </h1>

          <form className="flex flex-col w-full gap-4 mt-8">
            <div className="w-full">
              <Label htmlFor="name">Domain Name</Label>
              <Input id="name" placeholder="artificial intelligence" />
            </div>
            <div className="w-full">
              <Label htmlFor="name">Input Text</Label>
              <Input id="name" placeholder="" />
            </div>
            <div className="w-full">
              <Label htmlFor="name">Input Text</Label>
              <Input id="name" placeholder="" />
            </div>

            <div className="flex flex-col items-start gap-8">
              <div className="flex items-center justify-center gap-2">
                <Label className="text-nowrap" htmlFor="framework">
                  Type of model
                </Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Classification">
                      Classification
                    </SelectItem>
                    <SelectItem value="Clustering">Clustering</SelectItem>
                    <SelectItem value="Regression">Regression</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-10 mb-4 -mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Missing Values</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">GPU</Label>
                </div>
              </div>
            </div>

            <Button className="bg-[#770785]/90 hover:bg-[#770785]">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DropZonePage;
