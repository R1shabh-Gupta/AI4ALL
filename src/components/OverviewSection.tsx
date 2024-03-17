import { Button } from "./ui/button";

interface CardProps {
  title: string;
  content: string;
}

const Card = ({ title, content }: CardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <hr className="bg-gray-400 h-[2px] w-[90%]" />
      <h3 className="pt-6 text-lg font-semibold">{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const OverviewSection = () => {
  return (
    <div className="bg-[#EBDAFD] py-24 -mt-1">
      <div className="w-3/4 mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-col w-2/5 gap-4">
            <h2 className="text-sm font-semibold uppercase">
              Revolutionize MACHINE LEARNING
            </h2>
            <h1 className="text-5xl text-[#5F259E] font-semibold">
              Democratized Selection, Tuning, Deployment
            </h1>
          </div>
          <div className="flex flex-col w-2/5 gap-6">
            <p>
              In the era of data abundance and increasing demand for ML and deep
              learning solutions, AI4ALL is your gateway to harnessing the power
              of artificial intelligence and automation for your specific data
              needs.
            </p>
            <Button className="px-8 w-fit">Explore Automation</Button>
          </div>
        </div>

        <img
          className="py-12"
          src="/assets/images/dashboard.png"
          alt="dashboard"
        />

        <div className="flex justify-between gap-8">
          <Card
            title="Guidance and Support"
            content="Whether you're a seasoned data scientist or a newcomer to the world of AI, AI4ALL provides guidance and support every step of the way."
          />

          <Card
            title="Democratizing Access"
            content="Our tool empowers users regardless of their technical expertise, making advanced analytics accessible to everyone."
          />

          <Card
            title="Diverse Domains"
            content="From healthcare to finance, from marketing to manufacturing, AI4ALL is tailored to meet the needs of diverse domains."
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
