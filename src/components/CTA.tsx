import { Button } from "./ui/button";

const CTA = () => {
  return (
    <div className="py-24 -mt-1">
      <div className="flex bg-[url(/assets/images/CardBG.png)] bg-cover bg-no-repeat bg-center justify-between w-[90%] mx-auto rounded-3xl text-white py-16 shadow-md">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <h1 className="text-sm uppercase text-gray-50">
            Get started with Supahub for free
          </h1>
          <h2 className="w-2/4 text-4xl font-semibold text-center">
            Ready to revolutionize your approach to machine learning?
          </h2>
          <p className="w-2/5 font-thin text-center">
            Join the AI4ALL community and experience the future of machine
            learning – accessible, intuitive, and empowering.
          </p>

          <div className="flex gap-4">
            <Button className="px-6 text-black bg-white hover:bg-slate-50 hover:text-black">
              <p> Sign up for free</p>
            </Button>
            <Button className="px-6 bg-transparent" variant="outline">
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
