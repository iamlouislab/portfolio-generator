import React from "react";

function Testimonials() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800 py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 mb-4">Don't take our word for it</h2>
            <p className="text-xl text-gray-400">
              Here's what some of our customers have to say about this amazing
              tool.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6">
            <div
              className="flex h-full flex-col bg-gray-800 p-6"
              data-aos="fade-up"
            >
              <div>
                <div className="relative mb-4 inline-flex flex-col">
                  <img
                    className="rounded-full"
                    src="/images/testimonial-02.jpg"
                    width="48"
                    height="48"
                    alt="Testimonial 01"
                  />
                  <svg
                    className="absolute top-0 right-0 -mr-3 h-5 w-6 fill-current text-purple-600"
                    viewBox="0 0 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="grow text-lg text-gray-400">
                I designed my portfolio in 10 minutes and got a job offer for my
                dream job!
              </blockquote>
              <div className="mt-6 border-t border-gray-700 pt-5 font-medium text-gray-700">
                <cite className="not-italic text-gray-200">John Doe</cite> -{" "}
                <a
                  className="text-purple-600 transition duration-150 ease-in-out hover:text-gray-200"
                  href="/"
                >
                  Software Engineer
                </a>
              </div>
            </div>

            {/* 2nd testimonial */}
            <div
              className="flex h-full flex-col bg-gray-800 p-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div>
                <div className="relative mb-4 inline-flex flex-col">
                  <img
                    className="rounded-full"
                    src="/images/testimonial-01.jpg"
                    width="48"
                    height="48"
                    alt="Testimonial 02"
                  />
                  <svg
                    className="absolute top-0 right-0 -mr-3 h-5 w-6 fill-current text-purple-600"
                    viewBox="0 0 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="grow text-lg text-gray-400">
                It was really easy to use and I got a lot of compliments on my
                portfolio.
              </blockquote>
              <div className="mt-6 border-t border-gray-700 pt-5 font-medium text-gray-700">
                <cite className="not-italic text-gray-200">Jane Doe</cite> -{" "}
                <a
                  className="text-purple-600 transition duration-150 ease-in-out hover:text-gray-200"
                  href="/"
                >
                  Photographer
                </a>
              </div>
            </div>

            {/* 3rd testimonial */}
            <div
              className="flex h-full flex-col bg-gray-800 p-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div>
                <div className="relative mb-4 inline-flex flex-col">
                  <img
                    className="rounded-full"
                    src="/images/testimonial-03.jpg"
                    width="48"
                    height="48"
                    alt="Testimonial 03"
                  />
                  <svg
                    className="absolute top-0 right-0 -mr-3 h-5 w-6 fill-current text-purple-600"
                    viewBox="0 0 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="grow text-lg text-gray-400">
                I love the design and the fact that I can customize it so
                easily. It helped me to display my work in a beautiful way and
                get more clients.
              </blockquote>
              <div className="mt-6 border-t border-gray-700 pt-5 font-medium text-gray-700">
                <cite className="not-italic text-gray-200">Jared Doe</cite> -{" "}
                <a
                  className="text-purple-600 transition duration-150 ease-in-out hover:text-gray-200"
                  href="/"
                >
                  UI/UX Designer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
