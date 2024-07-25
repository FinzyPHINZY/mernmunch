import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">
          Food is just a click away. Crave It, Get It, Love It!
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="apps" />
        <div className="flex flex-col items-center justify-center gap04 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span className="">
            Download the MernMunch App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} alt="download apps" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
