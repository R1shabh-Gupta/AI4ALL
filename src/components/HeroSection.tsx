import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-6 mt-24">
      <h1 className="text-6xl text-[#770785] font-heading font-bold">AI4ALL</h1>
      <h2 className="w-1/3 text-4xl font-semibold text-center">
        Democratizing Machine Learning for Everyone
      </h2>
      <p className="w-2/5 font-thin text-center">
        The revolutionary no-code tool designed to simplify and democratize the
        process of selecting, tuning, and deploying machine learning or deep
        learning models for diverse datasets
      </p>

      <div className="flex gap-4">
        <Button className="px-6">
          <div className="flex gap-2">
            <img
              className="scale-75"
              src="/assets/images/star-icon.png"
              alt="star"
            />
            <p> Sign up for free</p>
          </div>
        </Button>
        <Button className="px-6" variant="outline">
          See <b>AI4ALL</b> in action
        </Button>
      </div>

      <div className="flex gap-4 -mt-3 text-sm text-gray-500">
        <div className="flex gap-1">
          <img
            className="scale-90"
            src="/assets/images/card-Icon.png"
            alt="card icon"
          />
          <p>No credit card required</p>
        </div>

        <div className="flex gap-1">
          <img
            className="scale-90"
            src="/assets/images/timer-Icon.png"
            alt="timer icon"
          />
          <p>14-day free trial</p>
        </div>
      </div>

      <div className="-mt-36 -z-10">
        <img src="/assets/images/herobg.png" alt="hero" />
      </div>
    </div>
  );
};

export default HeroSection;
