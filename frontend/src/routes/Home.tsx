import {
  ArrowLeftRight,
  CalendarRange,
  CircuitBoard,
  Clock,
  HandHelping,
  Mail,
  Microchip,
  Presentation,
  School,
  UsersRound,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import Faq from "react-faq-component";
import { FAQDT } from "../types/FAQDT";
import { useEffect, useState } from "react";

const styles = {
  bgColor: '#2c3e50"',
  rowTitleColor: "white",
  rowContentColor: "white",
  // rowContentColor: 'grey',
  arrowColor: "white",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

function Home() {
  const [faqs, setFaqs] = useState<{
    rows: { title: string; content: string }[];
  }>({ rows: [] });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY; // Access the API key from .env file

    fetch("https://factorystrapi.mcgilleus.ca/api/faqs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`, // Use the API key in the Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Map the fetched FAQDT[] into the structure required for the FAQ component
        const formattedFaqs = data.data.map((faq: FAQDT) => ({
          title: faq.attributes.title,
          content: faq.attributes.content,
        }));

        // Update the state with the formatted FAQs
        setFaqs({ rows: formattedFaqs });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {/* Mobile Version */}

      <div className="lg:hidden">
        <div className="h-[770px] bg-factory-green flex items-center justify-center ">
          <img src="/FactoryBoxWithText.png" alt="" className="w-72" />
        </div>

        <div className="bg-factory-black text-white font-medium px-10 pt-20 pb-12 flex flex-col items-center ">
          <h2 className="text-4xl text-center">What is the Factory?</h2>
          <Divider
            aria-hidden="true"
            sx={{
              opacity: 1,
              borderColor: "white",
              borderWidth: 2,
              width: "10%",
              alignSelf: "center",
              marginTop: "0.8rem",
              marginBottom: "1rem",
            }}
          />
          <p className="mt-3 text-lg mb-8 text-center">
            The Factory is a hardware design lab run by students, for students
            in the department of Electrical, Computer, and Software Engineering
            at McGill University. The Factory is a dedicated space in room 0080
            of the Trottier building for developing personal projects, gaining
            experience with the latest hardware, or just brainstorming ideas
            with fellow students. The Factory aims to foster an environment of
            innovation and collaboration where the resources are provided to
            make your ideas become a reality.
          </p>
          <h2 className="text-4xl text-center mb-4">Where is the Factory?</h2>
          <Divider
            aria-hidden="true"
            sx={{
              opacity: 1,
              borderColor: "white",
              borderWidth: 2,
              width: "10%",
              alignSelf: "center",
              marginTop: "0.3rem",
              marginBottom: "1rem",
            }}
          />
          <p className="mb-5 text-center">
            We're located in room 0080 of the Trottier Building! (See the
            building in Red below)
          </p>

          <iframe
            src="https://maps.mcgill.ca/?lat=45.50597407531836&lng=-73.57909006262219&z=16.25&cmp=1&txt=EN&id=Trottier"
            width="80%"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="bg-factory-black px-6 flex flex-col items-center">
          <iframe
            width="80%"
            height="315"
            src="https://www.youtube.com/embed/H-EEBm-rxqw?si=X_x06NfcIzyQxJbe"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className=""
          ></iframe>
        </div>

        <div className="bg-factory-black text-white font-medium px-10 pb-12 flex flex-col items-center ">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-center text-2xl mt-10">FAQ</h3>
            <Divider
              aria-hidden="true"
              sx={{
                opacity: 1,
                borderColor: "white",
                borderWidth: 2,
                width: "10%",
                alignSelf: "center",
                marginTop: "0rem",
                marginBottom: "0rem",
              }}
            />
            <div>
              <Faq data={faqs} styles={styles} config={config} />
            </div>
          </div>
        </div>

        <div className="bg-white px-10 pt-20 flex flex-col items-center">
          <h2 className="text-center text-4xl font-medium">MEMBERSHIP</h2>
          <Divider
            aria-hidden="true"
            sx={{
              opacity: 1,
              borderColor: "black",
              borderWidth: 2,
              width: "10%",
              alignSelf: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          />
          <p className="text-lg mt-6 text-center">
            Becoming a member of the factory is free and gives you access to a
            space dedicated to creativity. Whether you want to use the space to
            work on personal projects, gain experience with hardware, or
            brainstorm ideas with fellow students, the Factory is the place for
            you!
          </p>
          <h3 className="text-center font-semibold text-2xl mt-6">
            Membership Benefits
          </h3>

          <div className="flex mt-10 gap-32">
            <ul className="flex-1 flex flex-col gap-y-5">
              <li className="flex gap-3 ">
                <Clock />
                <p>Access to the lab during opening hours</p>
              </li>
              <li className="flex gap-3 ">
                <CircuitBoard />
                <p>Use of advanced equipment available in the lab</p>
              </li>
              <li className="flex gap-3">
                <Microchip />
                <p>Access to components for personal projects</p>
              </li>
              <li className="flex gap-3">
                <ArrowLeftRight />
                <p>Rental of equipment for personal projects</p>
              </li>
              <li className="flex gap-3 ">
                <UsersRound />
                <p>Collaboration with other members</p>
              </li>

              <li className="flex gap-3 ">
                <HandHelping />
                <p>Support from experienced managers</p>
              </li>
              <li className="flex gap-3 ">
                <School />
                <p>Available training on lab safety and equipment use</p>
              </li>
              <li className="flex gap-3">
                <Presentation />
                <p>Participation in workshops</p>
              </li>
            </ul>
          </div>

          <a
            href="https://factorydb.notkaramel.dev/dashboard/#/nc/form/b1f34cd8-bde2-490c-abd9-dadbada72737"
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // For security reasons to prevent tab hijacking
            className="bg-factory-green p-3 rounded-lg mt-14 text-white font-semibold mb-8 hover:bg-factory-dark-green"
          >
            BECOME A MEMBER
          </a>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:block">
        
        <div className="h-customh bg-factory-green flex items-center justify-center ">
          <img src="/FactoryBoxWithText.png" alt="" />
        </div>

        <div className="bg-factory-black text-white font-medium px-40 pt-20 flex flex-col items-center pb-12">
          <h2 className="text-4xl text-center">What is the Factory?</h2>
          <Divider
            aria-hidden="true"
            sx={{
              opacity: 1,
              borderColor: "white",
              borderWidth: 2,
              width: "10%",
              alignSelf: "center",
              marginTop: "0.8rem",
              marginBottom: "1rem",
            }}
          />
          <p className="mt-3 text-lg mb-8 text-center">
            The Factory is a hardware design lab run by students, for students
            in the department of Electrical, Computer, and Software Engineering
            at McGill University. The Factory is a dedicated space in room 0080
            of the Trottier building for developing personal projects, gaining
            experience with the latest hardware, or just brainstorming ideas
            with fellow students. The Factory aims to foster an environment of
            innovation and collaboration where the resources are provided to
            make your ideas become a reality.
          </p>
          <h2 className="text-4xl text-center mb-4">Where is the Factory?</h2>
          <Divider
            aria-hidden="true"
            sx={{
              opacity: 1,
              borderColor: "white",
              borderWidth: 2,
              width: "10%",
              alignSelf: "center",
              marginTop: "0.3rem",
              marginBottom: "1rem",
            }}
          />

          <p className="mb-2">
            We're located in room 0080 of the Trottier Building! (See the
            building in Red below)
          </p>

          <iframe
            src="https://maps.mcgill.ca/?lat=45.50597407531836&lng=-73.57909006262219&z=16.25&cmp=1&txt=EN&id=Trottier"
            width="1000"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          >
            {" "}
          </iframe>
          <div className="flex gap-24 justify-center mt-14">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/H-EEBm-rxqw?si=X_x06NfcIzyQxJbe"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="mt-12"
            ></iframe>
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-center text-2xl">FAQ</h3>
              <Divider
                aria-hidden="true"
                sx={{
                  opacity: 1,
                  borderColor: "white",
                  borderWidth: 2,
                  width: "10%",
                  alignSelf: "center",
                  marginTop: "0rem",
                  marginBottom: "0rem",
                }}
              />
              <div className="w-[480px]">
                <Faq data={faqs} styles={styles} config={config} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-36 pt-20 flex flex-col items-center">
          <h2 className="text-center text-4xl font-medium">MEMBERSHIP</h2>
          <Divider
            aria-hidden="true"
            sx={{
              opacity: 1,
              borderColor: "black",
              borderWidth: 2,
              width: "10%",
              alignSelf: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          />
          <p className="text-lg mt-6 text-center">
            Becoming a member of the factory is free and gives you access to a
            space dedicated to creativity. Whether you want to use the space to
            work on personal projects, gain experience with hardware, or
            brainstorm ideas with fellow students, the Factory is the place for
            you!
          </p>
          <h3 className="text-center font-semibold text-2xl mt-6">
            Membership Benefits
          </h3>

          <div className="flex mt-10 gap-32">
            <ul className="flex-1 flex flex-col gap-y-4  text-nowrap">
              <li className="flex gap-3 ">
                <Clock />
                <p>Access to the lab during opening hours</p>
              </li>
              <li className="flex gap-3 ">
                <CircuitBoard />
                <p>Use of advanced equipment available in the lab</p>
              </li>
              <li className="flex gap-3">
                <Microchip />
                <p>Access to components for personal projects</p>
              </li>
              <li className="flex gap-3">
                <ArrowLeftRight />
                <p>Rental of equipment for personal projects</p>
              </li>
            </ul>
            <ul className="flex-1 gap-y-4 flex flex-col w-max  text-nowrap ">
              <li className="flex gap-3 ">
                <UsersRound />
                <p>Collaboration with other members</p>
              </li>

              <li className="flex gap-3 ">
                <HandHelping />
                <p>Support from experienced managers</p>
              </li>
              <li className="flex gap-3 ">
                <School />
                <p>Available training on lab safety and equipment use</p>
              </li>
              <li className="flex gap-3">
                <Presentation />
                <p>Participation in workshops</p>
              </li>
            </ul>
          </div>

          <a
            href="https://factorydb.notkaramel.dev/dashboard/#/nc/form/b1f34cd8-bde2-490c-abd9-dadbada72737"
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // For security reasons to prevent tab hijacking
            className="bg-factory-green p-3 rounded-lg mt-14 text-white font-semibold mb-8 hover:bg-factory-dark-green"
          >
            BECOME A MEMBER
          </a>
        </div>

        <div className="h-[650px] bg-factory-black text-white font-medium px-40 pt-20 flex flex-col items-center ">
          <h2 className="text-4xl text-center">Learn more</h2>
          <Divider
            aria-hidden="true"
            sx={{
              opacity: 1,
              borderColor: "white",
              borderWidth: 2,
              width: "10%",
              alignSelf: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          />
          <div className="flex px-28 mt-10 gap-44">
            <ul className="flex flex-col gap-y-14">
              <Link
                to="/office-hours"
                className="flex flex-col items-center gap-2 hover:bg-factory-dark-black p-8"
              >
                <CalendarRange size={44} />
                <p className="text-4xl">Offifce Hours</p>
              </Link>

              <Link
                to="/our-lab"
                className="flex flex-col items-center gap-2 hover:bg-factory-dark-black p-8"
              >
                <Warehouse size={44} />
                <p className="text-4xl">Our Lab</p>
              </Link>
            </ul>
            <ul className="flex flex-col gap-y-14">
              <Link
                to="/workshops"
                className="flex flex-col items-center gap-2 hover:bg-factory-dark-black p-8"
              >
                {" "}
                <Presentation size={44} />
                <p className="text-4xl">Workshops</p>
              </Link>

              <a
                href="mailto:thefactory@mcgilleus.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:bg-factory-dark-black p-8"
              >
                <Mail size={44} />
                <p className="text-4xl">Contact Us</p>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
