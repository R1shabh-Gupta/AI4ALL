import { Button } from "./ui/button";

const CTA = () => {
  return (
    <div className="py-12 -mt-1 sm:py-24">
      <div className="flex bg-[url(/assets/images/CardBG.png)] bg-cover bg-no-repeat bg-center justify-between w-[90%] mx-auto rounded-3xl text-white py-16 shadow-md">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <h1 className="text-sm uppercase text-gray-50">
            Get started with Supahub for free
          </h1>
          <h2 className="w-[90%] text-2xl font-semibold text-center  sm:w-2/4 sm:text-4xl">
            Ready to revolutionize your approach to machine learning?
          </h2>
          <p className="w-[90%] sm:w-2/5 font-thin text-center">
            Join the AI4ALL community and experience the future of machine
            learning – accessible, intuitive, and empowering.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="px-6 text-black bg-white hover:bg-slate-50 hover:text-black">
              <p> Sign up for free</p>
            </Button>
            <Button className="px-6 bg-transparent" variant="outline">
              See <b>AI4ALL</b> in action
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4 text-sm text-gray-500 sm:-mt-3 sm:flex-row">
            <div className="flex gap-1">
              <img
                className="scale-90"
                src="/assets/images/card-Icon.png"
                alt="card icon"
              />
              <p className="text-gray-400">No credit card required</p>
            </div>

            <div className="flex gap-1">
              <img
                className="scale-90"
                src="/assets/images/timer-Icon.png"
                alt="timer icon"
              />
              <p className="text-gray-400">14-day free trial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
