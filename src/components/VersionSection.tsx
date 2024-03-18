import { Button } from "./ui/button";

const VersionSection = () => {
  return (
    <div className="pt-24 -mt-1 ">
      <div className="flex justify-between w-3/4 mx-auto">
        {/* sub-section 1 */}
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-[#DC5F05] uppercase font-semibold text-md">
            Product Changelog & Release Notes
          </h1>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-gray-800">Version 1.0</h2>
              <p className="text-gray-600 ">
                Core functionality for model selection, tuning, and deployment.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-gray-800">Version 2.0</h2>
              <p className="text-gray-600 ">
                Upgraded infrastructure to accommodate growing user demand.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-gray-800">Version 3.0</h2>
              <p className="text-gray-600 ">
                Launched customized solutions tailored to specific user needs.
              </p>
            </div>
          </div>
        </div>

        {/* sub-section 2 */}
        <div className="relative">
          <img src="/assets/images/gradient.png" alt="gradient" />
          <Button className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            Explore product changelog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VersionSection;
