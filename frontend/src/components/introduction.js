import React from "react";
import image_left from "../images/Student_pic.webp";
import image_right from "../images/Students_helping.webp";

const Introduction = () => {
  return (
    <>
      {/* Original section with image on the left */}
      <section className="bg-white dark:bg-gray-800">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full rounded-lg shadow-lg"
            src={image_left}
            alt="dashboard image"
            style={{ width: "500px", height: "300px" }}
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Need Help with Tough Courses?
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Studying alone, especially complex topics, can be challenging. If
              you're feeling stuck, you don’t have to struggle in silence.
              Tutorium connects you with peers who can provide the insight and
              explanations you need to get back on track.
            </p>
          </div>
        </div>
      </section>

      {/* Mirrored section with image on the right and text on the left */}
      <section className="bg-white dark:bg-gray-800">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Peer-Powered Learning
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Leverage the knowledge of fellow students through Tutorium. Engage
              in focused study sessions in a comfortable setting, share
              knowledge, and tackle academic challenges as a team. Find a
              student tutor who can help clarify your doubts and enhance your
              learning process.
            </p>
          </div>
          <img
            className="w-full rounded-md shadow-lg"
            src={image_right}
            alt="engagement image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
      </section>
    </>
  );
};

export default Introduction;
