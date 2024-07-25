import heroImg from "../assets/heroImg.jpg";

const Hero = () => {
  return (
    <div className="">
      <img
        src={heroImg}
        alt="hero"
        className="w-full max-h-[600px] bg-orange-400 object-cover "
      />
    </div>
  );
};

export default Hero;
