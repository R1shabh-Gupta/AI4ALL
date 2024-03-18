const FeaturesSection = () => {
  return (
    <div className="py-24 -mt-1 ">
      <div className="flex flex-col justify-between w-3/4 mx-auto">
        {/* sub section */}
        <div className="flex flex-col w-full gap-4 mx-auto text-center">
          <h1 className="text-[#862FE7] uppercase font-semibold text-md">
            AI4ALL tool features
          </h1>
          <h2 className="text-5xl font-semibold">See all features</h2>
        </div>

        {/* sub section */}
        <div className="flex flex-wrap justify-between gap-5 mt-24">
          <div className="w-[30%] p-8 rounded-xl shadow-sm bg-gray-50">
            <h2 className="text-lg font-semibold">Model Selection</h2>
            <ul className="flex flex-col gap-1 mt-2 ml-4 text-gray-600 list-disc">
              <li>
                AI4ALL simplifies the process of selecting the most appropriate
                machine learning model for your dataset.
              </li>
              <li>
                Choose from a variety of algorithms tailored to your specific
                data characteristics.
              </li>
              <li>
                Make informed decisions with AI-driven recommendations for
                optimal model selection.
              </li>
            </ul>
          </div>

          <div className="w-[30%] p-8 rounded-xl shadow-sm bg-gray-50">
            <h2 className="text-lg font-semibold">Fine-Tuning</h2>
            <ul className="flex flex-col gap-1 mt-2 ml-4 text-gray-600 list-disc">
              <li>
                Fine-tune your machine learning models effortlessly with
                AI4ALL's intuitive interface.
              </li>
              <li>
                Adjust hyperparameters and settings to optimize model
                performance.
              </li>
              <li>
                Instantly visualize the impact of parameter changes and track
                improvements in real-time.
              </li>
            </ul>
          </div>

          <div className="w-[30%] p-8 rounded-xl shadow-sm bg-gray-50">
            <h2 className="text-lg font-semibold">Guidance</h2>
            <ul className="flex flex-col gap-1 mt-2 ml-4 text-gray-600 list-disc">
              <li>
                Receive expert guidance every step of the way with AI4ALL's
                comprehensive tutorials and documentation.
              </li>
              <li>
                Access educational resources to deepen your understanding of
                machine learning concepts.
              </li>
              <li>
                Get personalized recommendations and support from our team of
                data science professionals.
              </li>
            </ul>
          </div>
        </div>

        {/* sub section */}
        <div className="flex flex-wrap justify-between mt-24 ">
          <div className="w-[30%] flex gap-4">
            <img
              className="w-10 h-10"
              src="/assets/images/icon-1.png"
              alt="icon"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Deployment</h3>
              <p className="text-gray-600">
                Integrate models into your existing infrastructure or deploy
                them as standalone applications.
              </p>
            </div>
          </div>

          <div className="w-[30%] flex gap-4">
            <img
              className="w-10 h-10"
              src="/assets/images/icon-2.png"
              alt="icon"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Scalability</h3>
              <p className="text-gray-600">
                Handle large volumes of data and growing user demands without
                compromising performance.
              </p>
            </div>
          </div>

          <div className="w-[30%] flex gap-4">
            <img
              className="w-10 h-10"
              src="/assets/images/icon-3.png"
              alt="icon"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Collaboration</h3>
              <p className="text-gray-600">
                Share models, datasets, and insights securely with team members
                and stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
