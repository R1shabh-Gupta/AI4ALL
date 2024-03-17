interface CardProps {
  title: string;
  content: string;
}

const Card = ({ title, content }: CardProps) => {
  return (
    <div className="flex flex-col w-[30%] gap-2">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

const FAQsSection = () => {
  return (
    <div className="py-24 -mt-1 ">
      <div className="relative flex flex-col justify-between w-3/4 gap-16 mx-auto">
        {/* sub-section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[#862FE7] uppercase font-semibold text-md">
            Frequently asked questions
          </h1>
          <h2 className="text-5xl font-semibold">
            Everything you need to know
          </h2>
          <p>
            If you have anything else you want to ask,{" "}
            <span className="text-[#862FE7]">reach out to us.</span>
          </p>
        </div>

        {/* sub-section */}
        <div className="flex flex-wrap gap-x-10 gap-y-20">
          <Card
            title="What is AI4ALL?"
            content="AI4ALL is a revolutionary no-code tool designed to simplify and democratize the process of selecting, tuning, and deploying machine learning (ML) or deep learning models for diverse datasets."
          />

          <Card
            title="Is AI4ALL free?"
            content="Yes. AI4ALL does come with a free plan. Paid plans start for only $19/month."
          />

          <Card
            title="Who can use AI4ALL?"
            content="AI4ALL is designed for users of all levels, from beginners to experienced data scientists. Whether you're new to machine learning or looking to streamline your workflow, AI4ALL provides the tools and guidance you need."
          />

          <Card
            title="What datasets can I use with AI4ALL?"
            content="AI4ALL supports a wide range of datasets across various domains, including but not limited to healthcare, finance, marketing, and manufacturing. You can upload your own datasets or explore publicly available datasets within the platform."
          />

          <Card
            title="How do I deploy models with AI4ALL?"
            content="AI4ALL offers seamless deployment capabilities, allowing you to integrate your trained models into existing infrastructure or deploy them as standalone applications. Our platform ensures scalability, reliability, and security throughout the deployment process."
          />

          <Card
            title="How can I get started with AI4ALL?"
            content="Getting started with AI4ALL is easy! Simply sign up for an account on our platform and begin exploring the features and capabilities. Our comprehensive tutorials and documentation provide guidance every step of the way."
          />
        </div>

        <div className="h-96 w-96 rounded-full blur-3xl bg-[#ff5fe489] absolute -z-10 top-52 -left-28" />

        <div className="h-96 w-96 rounded-full blur-3xl bg-[#d7b6f9] absolute -z-10 top-12 right-28" />
      </div>
    </div>
  );
};

export default FAQsSection;
