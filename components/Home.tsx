"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import video from "../public/images/video.jpg";

function Home() {
  const router = useRouter();
  const handleTakeTour = () => {
    router.push("/AddStudent");
  };
  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden">
      <Image
        src={video}
        alt="University student"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,21,34,0.9)_0%,rgba(16,36,59,0.78)_44%,rgba(20,122,105,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(201,154,67,0.22),transparent_25%)]" />

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16">
          <p className="mb-5 text-lg font-medium tracking-[0.08em] text-[#f8e8bf] sm:text-xl md:text-2xl">
            The Best University Of The State
          </p>

          <h1
            className="
              inline-block
              border-l-4 border-[#c99a43] bg-[#10243b]/78
              px-5 py-4 shadow-2xl backdrop-blur-sm
              font-serif
              text-4xl font-bold leading-tight text-white
              sm:px-7 sm:py-4 sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            Kingster University
          </h1>

          <div className="mt-8">
            <button
              onClick={handleTakeTour}
              className="
                border border-[#d9bb77] bg-[#fffdf8] px-7 py-4
                text-sm font-bold uppercase tracking-[0.12em] text-[#10243b]
                shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-300
                hover:-translate-y-1 hover:bg-[#147a69] hover:text-white hover:border-[#147a69]
              "
            >
              Take A Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Home;
