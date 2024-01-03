"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import SigninButton from "./components/SigninButton/SigninButton";
import Pricing from "./landingComponents/Pricing";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector("#showMenu")?.addEventListener("click", function (event) {
      document.querySelector("#mobileNav")?.classList.remove("hidden");
    });

    document.querySelector("#hideMenu")?.addEventListener("click", function (event) {
      document.querySelector("#mobileNav")?.classList.add("hidden");
    });

    document.querySelectorAll(".toggleElement").forEach((toggle) => {
      toggle.addEventListener("click", function (event) {
        const answerElement = toggle.querySelector(".answer");
        const caretElement = toggle.querySelector("img");
        if (answerElement?.classList.contains("hidden")) {
          answerElement.classList.remove("hidden");
          caretElement?.classList.add("rotate-90");
        } else {
          answerElement?.classList.add("hidden");
          caretElement?.classList.remove("rotate-90");
        }
      });
    });
  }, []);

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false)
    }
  }, [session])

  if (loading) {
    return (<div className="text-center">{"Loading...."}</div>)
  }

  return (
    <div className="scroll-smooth scroll-p-[20rem]">
      <nav className="fixed flex justify-between py-5 w-full lg:px-48 md:px-12 px-4 content-center bg-secondary z-10">
        <div className="flex items-center">
          <Image width={200} height={100} src='/assets/hh_logo.png' alt="Logo" className="hover:cursor-pointer" onClick={() => window.scrollTo(0, 0)} />
        </div>
        <ul className="font-montserrat items-center hidden md:flex">
          <li className="mx-3 ">
            <a className="growing-underline" href="#howitworks">
              How it works
            </a>
          </li>
          <li className="growing-underline mx-3">
            <a href="#features">Features</a>
          </li>
          <li className="growing-underline mx-3">
            <a href="#pricing">Pricing</a>
          </li>
          <li className="growing-underline mx-3">
            <a target="_blank" href="https://habitharbor.canny.io/feature-requests">Bug / Feature request</a>
          </li>
          <li className="growing-underline mx-3">
            <a target="_blank" href="https://habitharbor.canny.io/changelog">Changelog</a>
          </li>
          {
            session && session.user && session.user.profile_id === '966536f3-a528-4754-a474-2b7be0cff440' &&
            <li className="growing-underline mx-3">
              <a href="mailto:antonio@ticroom.cl">Contact</a>
            </li>
          }
        </ul>
        <div className="font-montserrat hidden md:block">
          <SigninButton />
        </div>
        <div id="showMenu" className="md:hidden">
          <Image height={24} width={24} src='/assets/logos/Menu.svg' alt="Menu icon" />
        </div>
      </nav>
      <div id='mobileNav' className="hidden px-4 py-6 fixed top-0 left-0 h-full w-full bg-secondary z-20 animate-fade-in-down">
        <div id="hideMenu" className="flex justify-end">
          <Image height={24} width={24} src='/assets/logos/Cross.svg' alt="" className="h-16 w-16" />
        </div>
        <ul className="font-montserrat flex flex-col mx-8 my-24 items-center text-3xl">
          <li className="my-6">
            <a href="howitworks">How it works</a>
          </li>
          <li className="my-6">
            <a href="features">Features</a>
          </li>
          <li className="my-6">
            <a href="pricing">Pricing</a>
          </li>
          <li className="my-6">
            <a target="_blank" href="https://habitharbor.canny.io/feature-requests">Bug / Feature request</a>
          </li>
          <li className="my-6">
            <a target="_blank" href="https://habitharbor.canny.io/changelog">Changelog</a>
          </li>
          {
            session && session.user && session.user.profile_id === '966536f3-a528-4754-a474-2b7be0cff440' &&
            <li className="my-6">
              <a href="mailto:antonio@ticroom.cl">Contact</a>
            </li>
          }
        </ul>
      </div>

      <section
        className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
        <div className="md:flex-1 md:mr-10">
          <h1 className="font-pt-serif text-5xl font-bold mb-7">
            No distractions <br />
            <span className="bg-underline1 bg-left-bottom bg-no-repeat pb-3 bg-100%">
              right to the action
            </span>
          </h1>
          <p className="font-pt-serif font-normal pb-10 pt-5 text-justify">
            Welcome to HabitHarbor.app, where productivity meets precision. Say goodbye to distractions and hello to focused action. Our all-in-one productivity platform empowers you to take control of your day like never before.
          </p>
          <div className="font-montserrat">
            <a href="#pricing" className="bg-black px-6 py-4 rounded-lg border-2 border-black border-solid text-white mr-2 mb-2">
              {"Go Premium"}
            </a>
            {
              session && session.user ?
                (
                  <a href={'/app'} className="px-6 py-4 border-2 border-black border-solid rounded-lg">
                    Start for free
                  </a>

                ) : (
                  <button onClick={() => { signIn('google', { callbackUrl: '/app' }) }} className="px-6 py-4 border-2 border-black border-solid rounded-lg">
                    Start for free
                  </button>
                )
            }
          </div>
        </div>
        <div className="flex justify-around md:block mt-8 md:mt-0 md:flex-1">
          <div className="relative">
            <Image height={113} width={89} src='/assets/Highlight1.svg' alt="" className="absolute -top-16 -left-10" />
          </div>
          <div className="animate-glowing z-20 mx-auto max-w-screen-2xl overflow-hidden rounded-xl border-2 border-slate-800">
            <video loop muted autoPlay src="/assets/videos/Hero-Video-Final.mp4">
            </video>
          </div>
          <Image className="w-full p-5 hidden" height={285} width={465} src='/assets/homeSS.png' alt="Macbook" />
          <div className="relative">
            <Image height={58} width={55} src='/assets/Highlight2.svg' alt="" className="absolute -bottom-10 -right-6" />
          </div>
        </div>
      </section>

      <section className="bg-black text-white sectionSize" id="howitworks">
        <div>
          <h2 className="secondaryTitle bg-underline2 bg-100%">How it works</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mx-8 flex flex-col items-center my-4">
            <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
              1
            </div>
            <h3 className="font-montserrat font-medium text-xl mb-2">Plan</h3>
            <p className="text-justify font-montserrat">
              Start by planning your day and setting clear objectives. Organize your tasks and set priorities that align with your goals. With HabitHarbor.app, planning has never been easier.
            </p>
          </div>
          <div className="flex-1 mx-8 flex flex-col items-center my-4">
            <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
              2
            </div>
            <h3 className="font-montserrat font-medium text-xl mb-2">Focus</h3>
            <p className="text-justify font-montserrat">
              Once your plan is in place, dive into focused work sessions using our Pomodoro Timer. Eliminate distractions and dedicate your full attention to the task at hand. Watch your productivity soar.
            </p>
          </div>
          <div className="flex-1 mx-8 flex flex-col items-center my-4">
            <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
              3
            </div>
            <h3 className="font-montserrat font-medium text-xl mb-2">Build new habits</h3>
            <p className="text-justify font-montserrat">
              Building new habits is a breeze with HabitHarbor.app. Track your daily habits, from staying hydrated to reducing bad habits, and see your progress over time. Develop a routine that leads to lasting change.
            </p>
          </div>
        </div>
      </section>

      <section className="sectionSize bg-secondary" id="features">
        <div>
          <h2 className="secondaryTitle bg-underline3 bg-100%">Features</h2>
        </div>
        <div className="md:grid md:grid-cols-2 md:grid-rows-2">

          <div className="flex items-start font-montserrat my-6 mr-10">
            <Image width={24} height={24} src='/assets/logos/Heart.svg' alt='' className="mr-4" />
            <div>
              <h3 className="font-semibold text-2xl pb-1">Pomodoro Timer</h3>
              <p className="text-justify">
                Boost your productivity with the renowned Pomodoro Technique. Work in focused bursts and achieve more in less time.
              </p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <Image width={24} height={24} src='/assets/logos/Heart.svg' alt='' className="mr-4" />
            <div>
              <h3 className="font-semibold text-2xl pb-1">Task Management</h3>
              <p className="text-justify">
                Organize your tasks effortlessly. Keep track of your to-dos, deadlines, and progress at a glance.
              </p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <Image width={24} height={24} src='/assets/logos/Heart.svg' alt='' className="mr-4" />
            <div>
              <h3 className="font-semibold text-2xl pb-1">Task Highlighting</h3>
              <p className="text-justify">
                Identify your most crucial tasks with ease. Stay on top of your priorities and supercharge your productivity.
              </p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <Image width={24} height={24} src='/assets/logos/Heart.svg' alt='' className="mr-4" />
            <div>
              <h3 className="font-semibold text-2xl pb-1">Task Prioritization</h3>
              <p className="text-justify">
                {"Make informed decisions about what to tackle next. Our prioritization feature ensures you're always working on what matters most."}
              </p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <Image width={24} height={24} src='/assets/logos/Heart.svg' alt='' className="mr-4" />
            <div>
              <h3 className="font-semibold text-2xl pb-1">Daily Habits</h3>
              <p className="text-justify">
                {"Form positive habits that stick. Whether it's drinking more water or reducing your daily indulgences, HabitHarbor.app helps you stay on track."}
              </p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <Image width={24} height={24} src='/assets/logos/Heart.svg' alt='' className="mr-4" />
            <div>
              <h3 className="font-semibold text-2xl pb-1">{"Integrations (soon)"}</h3>
              <p className="text-justify">
                {" I'm working on integrations with Canny, Github, Gitlab and more. Stay tuned!"}
              </p>
            </div>
          </div>

        </div>
      </section>

      <Pricing />

      <section className="sectionSize items-start pt-8 md:pt-36 bg-black text-white">
        <div>
          <h2 className="secondaryTitle bg-highlight3 p-10 mb-0 bg-center bg-100%">
            FAQ
          </h2>
        </div>

        <div className="w-full py-4 toggleElement">
          <div className="flex justify-between items-center">
            <div className="font-montserrat font-medium mr-auto question">
              Can I use HabitHarbor without a log in?
            </div>
            <Image width={57} height={57} src='/assets/logos/CaretRight.svg' alt="" className="transform transition-transform" />
          </div>
          <div className="font-montserrat text-sm font-extralight pb-8 hidden answer">
            {"No, you can't use HabitHarbor without a log in. You need to login with a google account to use HabitHarbor."}
          </div>
        </div>
        <hr className="w-full bg-white" />

        <div className="w-full py-4 toggleElement">
          <div className="flex justify-between items-center">
            <div className="font-montserrat font-medium mr-auto question">
              How does the free plan work?
            </div>
            <Image width={57} height={57} src='/assets/logos/CaretRight.svg' alt="" className="transform transition-transform" />
          </div>
          <div className="font-montserrat text-sm font-extralight pb-8 hidden answer">
            {" All features are available for free. However, your data will be saved locally on your device, specifically in your browser's local storage."}
            <br />
            {" All new features will be studied if they will be for free tier or pro one."}
          </div>
        </div>
        <hr className="w-full bg-white" />
      </section>

      <section className="bg-black sectionSize">
        <div className="text-white">
          <h2 className="secondaryTitle bg-underline2 bg-100%">Ready to dive deeper?  👇</h2>
        </div>
        <div className="flex mb-8 text-white">
          <a href="https://twitter.com/chill__eno" target="_blank" className="flex hover:font-bold">
            <Image width={24} height={24} src='/assets/logos/Twitter.svg' alt="Twitter logo" className="mx-4" />
            {"Join the conversation on X (ex Twitter)! 🚀"}
          </a>
        </div>
        <div className="text-white font-montserrat text-sm">
          © {new Date().getFullYear()} with ❤️ by <a href="https://twitter.com/chill__eno" className="hover:font-bold" target="_blank">@chill__eno</a>
        </div>
        {
          session && session.user && session.user.profile_id === '966536f3-a528-4754-a474-2b7be0cff440' &&
          <div className="text-white font-montserrat text-sm mt-5">
            <a href="mailto:antonio@ticroom.cl" className="hover:font-bold">Need help? contact me!</a>
          </div>
        }
      </section>

      <div className="fixed bottom-4 right-4 flex justify-center items-center cursor-pointer z-40">
        <a href="https://www.producthunt.com/posts/habit-harbor?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-habit&#0045;harbor" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=432560&theme=light" alt="Habit&#0032;Harbor - Say&#0032;goodbye&#0032;to&#0032;distractions&#0032;and&#0032;hello&#0032;to&#0032;focused&#0032;action | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" /></a>
      </div>
    </div>
  )
}
