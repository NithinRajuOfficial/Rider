import RiderLogo from "../components/brand/RiderLogo";
import RiderHomeImg from "../assets/trafic_light.jpg";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import AnimatedGridPattern from "../components/AnimatedGridLayout";

const Home = () => {
  return (
    <main className="h-screen mx-auto max-w-screen-xl flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-2">
      {/* Left Section (Image & Logo) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <AnimatedGridPattern
          columns={70}
          rows={30}
          cellSize={25}
          gap={1}
          backgroundColor="#f8fafc" 
          lineColor="#e2e8f0"
          highlightColor="#3b82f6"
        />
      </div>
      <article className="relative w-full md:w-1/2 flex flex-col items-center">
        {/* Logo (Positioned at the top) */}
        <RiderLogo
          width={150}
          height={50}
          className="mb-4 absolute left-0 md:left-20"
        />

        {/* Hero Image */}
        <img
          src={RiderHomeImg}
          alt="heroImg"
          loading="lazy"
          className="w-full max-w-sm md:max-w-md h-auto object-contain rounded-lg"
        />
      </article>

      {/* Right Section (Text & Button) */}
      <article className="relative w-full md:w-1/2 flex flex-col items-center px-6 md:px-10">
        <h1 className="mb-2 text-2xl md:text-3xl font-bold leading-tight bg-white">
          Get Started with Rider..
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-3 bg-white">
          Join the Rider community and experience{" "}
          <br className="hidden md:inline" /> seamless travel with just one tap!
        </p>

        {/* Button */}
        <Link
          to={"/login"}
          className="flex items-center justify-between w-full md:w-72 py-2 px-5 bg-black text-white rounded-lg hover:bg-gray-800 transition hover:cursor-pointer"
        >
          <span className="flex-1 text-center">Continue</span>
          <MdOutlineKeyboardDoubleArrowRight className="text-xl ml-2" />
        </Link>
      </article>
    </main>
  );
};

export default Home;
