import Image from 'next/future/image';
import { DefaultLayout } from '@layouts/default';
import { NextPage } from "next/types";

const AboutPage: NextPage<{}> = ({}) => {
  return (
    <DefaultLayout title="Lucas Norgaard - About">
      <div className="p-3">
        <section className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex-1 flex flex-col pr-8 h-[200px]">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
              Lucas Nørgård
            </h1>
            <p className="text-gray-700 dark:text-gray-200 mb-4 flex-1">
              I&apos;m a self-taught developer from Aarhus, Denmark. <br />
              In my spare time i enjoy learning new technologies and solving
              problems. My preferred tools right now are TypeScript, Rust and
              React.
              <br />
              <br />
              Got any questions?{' '}
              <a href="mailto:lucasnrgaard@gmail">Contact me.</a>
            </p>
          </div>
          <div className="sm:w-[150px] relative mb-8 sm:mb-0 mr-auto">
            <Image
              alt="Lucas Nørgård"
              height={150}
              width={150}
              src="/avatar.jpg"
              sizes="30vw"
              priority
              className="rounded-lg filter grayscale"
            />

            <div className="mt-4 bg-gray-200 dark:bg-gray-600 rounded-lg">
              <div className="flex justify-center items-center">
                <a
                  href="https://github.com/luxass"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-8 h-8  rounded-md flex items-center justify-center hover:ring-2 ring-gray-700 transition-all cursor-pointer ml-0 m-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    focusable="false"
                    role="img"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block align-middle overflow-hidden"
                  >
                    <path d="M16.24 22a1 1 0 01-1-1v-2.6a2.15 2.15 0 00-.54-1.66 1 1 0 01.61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 00-.67-2.22 2.75 2.75 0 01-.41-2.06 3.71 3.71 0 000-1.41 7.65 7.65 0 00-2.09 1.09 1 1 0 01-.84.15 10.15 10.15 0 00-5.52 0 1 1 0 01-.84-.15 7.4 7.4 0 00-2.11-1.09 3.52 3.52 0 000 1.41 2.84 2.84 0 01-.43 2.08 4.07 4.07 0 00-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 01.82.66 1 1 0 01-.21 1 2.06 2.06 0 00-.55 1.56V21a1 1 0 01-2 0v-.57a6 6 0 01-5.27-2.09 3.9 3.9 0 00-1.16-.88 1 1 0 11.5-1.94 4.93 4.93 0 012 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 01.23-1.58c-2.06-.52-5-2-5-7a6 6 0 011-3.33.85.85 0 00.13-.62 5.69 5.69 0 01.33-3.21 1 1 0 01.63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 015.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 01.63.57 5.71 5.71 0 01.33 3.22.75.75 0 00.11.57 6 6 0 011 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 01.22 1.67V21a1 1 0 01-.94 1z" />
                  </svg>
                </a>
                <a
                  href="mailto:lucasnrgaard@gmail.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:ring-2 ring-gray-700 transition-all cursor-pointer m-1"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block align-middle overflow-hidden"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/lucasnrgaard/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:ring-2 ring-gray-700 transition-all cursor-pointer m-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    focusable="false"
                    role="img"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block align-middle overflow-hidden"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 9.55C12.917 8.613 14.111 8 15.5 8a5.5 5.5 0 015.5 5.5V21h-2v-7.5a3.5 3.5 0 00-7 0V21h-2V8.5h2v1.05zM5 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1 2h2V21H4V8.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};
export default AboutPage;
