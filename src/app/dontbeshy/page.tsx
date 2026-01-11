"use client"
import React from "react"
import Sidebar from "../../components/sideBar"
import "./style.css"
import gsap from "gsap"
import PageTransition from "@/src/components/layout/PageTransition"

const DiaryPage = ({}) => {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [message, setMessage] = React.useState(false)
  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const object = Object.fromEntries(formData)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(object),
      })

      const result = await response.json()
      if (result.success) {
        setIsSuccess(true)
      } else {
      }
    } catch (error) {
    }
  }

  const [letters, setLetters] = React.useState<Array<string>>([])
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const hiRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const overlay = overlayRef.current
    const hi = hiRef.current

    const handleMouseEnter = () => {
      gsap.to(overlay, {
        backgroundColor: "#f1a7ce",
        opacity: 1,
        zIndex: 10,
        duration: 0.5,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(overlay, {
        backgroundColor: "transparent",
        opacity: 0,
        zIndex: -10,
        duration: 0.5,
      })
      setLetters([])
    }

    hi?.addEventListener("mouseenter", handleMouseEnter)
    hi?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      hi?.removeEventListener("mouseenter", handleMouseEnter)
      hi?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const gifData = [
    "/hello.gif",
    "hello1.gif",
    "hello2.gif",
    "hello3.gif",
    "hello4.gif",
    "hello5.gif",
    "hello7.gif",
  ]

  const gifShyData = [
    "shy.gif",
    "shy1.gif",
    "shy2.gif",
    "shy3.gif",
    "shy4.gif",
    "shy5.gif",
    "shy6.gif",
  ]

  const [selectedGif, setSelectedGif] = React.useState<string>("")
  const [selectedShyGif, setSelectedShyGif] = React.useState<string>("")

  const getRandomGif = () => {
    const randomIndex = Math.floor(Math.random() * gifData.length)
    return gifData[randomIndex]
  }

  const getRandomShyGif = () => {
    const randomIndex1 = Math.floor(Math.random() * gifShyData.length)
    return gifShyData[randomIndex1]
  }

  React.useEffect(() => {
    setSelectedGif(getRandomGif())
  }, [])

  React.useEffect(() => {
    setSelectedShyGif(getRandomShyGif())
  }, [])

  const shyRef = React.useRef<HTMLDivElement>(null)
  const gifshyRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const shyElement = shyRef.current
    const gifshyElement = gifshyRef.current

    const hoverInAnimation = () => {
      gsap.to(gifshyElement, {
        width: "150px",
        clipPath: "inset(0%)",
        duration: 0.5,
      })
    }

    const hoverOutAnimation = () => {
      gsap.to(gifshyElement, {
        width: "0px",
        clipPath: "inset(0% 0% 0% 100%)",
        duration: 0.5,
      })
    }

    shyElement?.addEventListener("mouseenter", hoverInAnimation)
    shyElement?.addEventListener("mouseleave", hoverOutAnimation)

    return () => {
      shyElement?.removeEventListener("mouseenter", hoverInAnimation)
      shyElement?.removeEventListener("mouseleave", hoverOutAnimation)
    }
  }, [])

  const sectionRef = React.useRef<HTMLDivElement>(null)

  const [displayImageSrc, setDisplayImageSrc] = React.useState<string | null>(
    null,
  )
  const soundPaths = ["whatdog.mp3"]
  const imagePaths = [
    "egg-head.png",
    "hello.gif",
    "lyrawalk2.gif",
    "luigitoadpeach.png",
    "panda.png",
    "trunks.png",
  ]
  const [images, setImages] = React.useState<
    {src: string; x: number; y: number}[]
  >([])

  React.useEffect(() => {
    const section = sectionRef.current
    const handleMouseMove = (e: MouseEvent) => {
      if (!section) return

      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left - 42
      const y = e.clientY - rect.top - 42

      if (Math.random() < 0.7) {
        const randomImageIndex = Math.floor(Math.random() * imagePaths.length)
        const newImage = {src: imagePaths[randomImageIndex], x, y}
        setImages((prevImages) => [...prevImages, newImage])
      } else {
        const randomSoundIndex = Math.floor(Math.random() * soundPaths.length)
        const audio = new Audio(soundPaths[randomSoundIndex])
        audio.play()
      }
    }

    section?.addEventListener("click", handleMouseMove)

    return () => {
      section?.removeEventListener("click", handleMouseMove) 
    }
  }, [])

  const scrollRef = React.useRef(null)

  const scrollToSection = () => {
    scrollRef.current.scrollIntoView({behavior: "smooth", block: "start"})
  }

  return (
    <>
      <Sidebar />
      <div
        className="w-full overflow-y-auto h-screen relative"
        id="contact-main"
      >
        <div className="flex flex-col w-full h-screen" id="headContact">
          <div className="flex flex-col justify-center align-middle items-center h-screen w-full mt-4">
            <div ref={hiRef} className="z-20">
              <p className="overflow-hidden py-1 z-20">SAY HI</p>
            </div>

            <div className="py-16 max-[760px]:pb-2">
              <div className="text-8xl max-[760px]:text-6xl text-center uppercase relative overflow-hidden">
                <div className="revealText"> No need </div>
              </div>

              <div
                ref={shyRef}
                id="shy"
                className="text-8xl max-[760px]:text-6xl text-center uppercase relative overflow-hidden"
              >
                <div className="revealText">
                  to be
                  <img ref={gifshyRef} id="shygif" src={selectedShyGif} /> shy.
                </div>
              </div>
            </div>

            <button className="btnHead px-8 py-1" onClick={scrollToSection}>
              Let’s talk
            </button>
          </div>
          <div
            className="flex flex-row max-[1500px]:flex-col px-12 pb-6 justify-between"
            id="header-text"
          >
            {" "}
            <div className="uppercase flex items-end">
              waiting to hear from you
            </div>{" "}
            <div className="uppercase ">
              Social
              <br />
              <div className="flex flex-row justify-between">
                <a
                  className="btnContact"
                  href="https://www.instagram.com/none/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IG
                </a>
                <br />
                <a
                  href="https://ae.linkedin.com/in/oussamaammar"
                  className="btnContact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LK
                </a>
                <br />
                <a
                  href="https://x.com/daedalium"
                  className="btnContact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </div>
            </div>{" "}
            <div className="uppercase flex items-end">
              Contacts
              <br />
              hello@thehanasachikocompany.com
            </div>{" "}
            <div className="uppercase flex items-end">
              Location <br /> 4, Privet Drive, Little Whinging, Surrey{" "}
            </div>{" "}
          </div>
          <div
            className="h-screen w-full opacity-0 absolute flex flex-row items-end max-[760px]:items-center justify-center align-middle overflow-scroll -z-10"
            id="overlayHello"
            ref={overlayRef}
          >
            <p className="helloFont">H</p>
            <p className="helloFont">E</p>
            <p className="helloFont">L</p>
            <p className="helloFont">L</p>
            <p className="helloFont">O</p>
          </div>
        </div>
        <div
          className="flex flex-col h-screen overflow-x-hidden overflow-y-hidden "
          id="form-section"
          ref={scrollRef}
        >
          <div className="text-7xl max-[760px]:text-4xl py-4" id="stripe">
            <div id="stripeAnim">
              {" "}
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>{" "}
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>{" "}
              <span>
                {" "}
                SAY HI <span>😊</span>
              </span>
            </div>
          </div>{" "}
          <br />
          <div className="flex h-screen">
            <div className="w-2/5 flex items-end">
              <img id="gifForm" src={selectedGif} />
            </div>{" "}
            <div className="w-3/5 px-2">
              <div className="text-7xl max-[760px]:text-5xl uppercase font-bold pt-8">
                Hello
              </div>
              <div className="text-7xl max-[760px]:text-5xl uppercase font-light pb-8">
                Diya Karmacharya
              </div>
              {(isSuccess && (
                <div className="mt-12 text-sm text-left text-green-500">
                  {
                    "Sugoi! Your path to this journey have been sent successfully"
                  }
                </div>
              )) || (
                <form onSubmit={handleSubmit} className="">
                  <div>
                    <div>
                      <label htmlFor="NAME">I’m </label>
                      <input type="text" name="NAME" id="NAME" />
                      <span id="mce-NAME-HELPERTEXT"></span>
                    </div>
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL">Here is my email</label>
                      <input
                        type="email"
                        name="EMAIL"
                        id="mce-EMAIL"
                        required
                      />
                      <span
                        id="mce-EMAIL-HELPERTEXT"
                        className="helper_text"
                      ></span>
                    </div>
                    <div className="mc-field-group">
                      <label htmlFor="mce-FROM">
                        I heard about Diya Karmacharya{" "}
                      </label>
                      <select name="FROM" className="" id="mce-FROM">
                        <option></option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="TikTok">TikTok</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Word of mouth">Word of mouth</option>
                        <option value="Other">Other</option>
                      </select>
                      <span
                        id="mce-FROM-HELPERTEXT"
                        className="helper_text"
                      ></span>
                    </div>
                    <div className="mc-field-group">
                      <label htmlFor="mce-SERVICE">
                        I need you service for{" "}
                      </label>
                      <input
                        type="text"
                        name="SERVICE"
                        className=""
                        id="mce-SERVICE"
                      />
                      <span
                        id="mce-SERVICE-HELPERTEXT"
                        className="helper_text"
                      ></span>
                    </div>
                    <div className="mc-field-group">
                      <label htmlFor="mce-PROJECT">Here is my project </label>
                      <div
                        className="text-box-form"
                        role="textbox"
                        aria-label="project description"
                      ></div>
                      <input
                        type="text"
                        name="PROJECT"
                        className=""
                        id="mce-PROJECT"
                      />
                      <span
                        id="mce-PROJECT-HELPERTEXT"
                        className="helper_text"
                      ></span>
                    </div>
                    <div className="optionalParent">
                      <div className="clear foot">
                        <input
                          type="submit"
                          name="submit"
                          id="mc-embedded-subscribe"
                          className="btnSubmit"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>{" "}
          </div>
        </div>
        <div
          className="flex flex-col w-full h-screen relative"
          id="tapeScreen"
          ref={sectionRef}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={`Dynamic at ${img.x}, ${img.y}`}
              style={{
                position: "absolute",
                left: img.x,
                top: img.y,
                maxWidth: "250px",
                maxHeight: "250px",
                rotate: `${Math.random() > 0.5 ? 6 : -6}deg`,
              }}
            />
          ))}
          <div className="flex flex-col justify-center align-middle items-center h-screen w-full  -mt-8">
            <a>Click on the screen</a>

            <div className="py-16">
              <div className="text-7xl max-[760px]:text-5xl text-center uppercase">
                Let’s
              </div>

              <div className="text-7xl max-[760px]:text-5xl text-center uppercase">
                Talk
              </div>
            </div>

            <a className="">Let’s talk</a>
          </div>
        </div>
        <div className="flex flex-col w-full" id="footer-contact">
          <div
            className="flex flex-row max-[880px]:flex-col px-12 pb-6 pt-6 justify-between"
            id="footer-text"
          >
            {" "}
            <div className="uppercase">
              SAY HI : <br />
              <span className=""> hello@thehanasachikocompany.com</span>
            </div>{" "}
            <div className="uppercase"></div>{" "}
            <div className="uppercase">
              made with love by
              <br /> Diya Karmacharya
            </div>{" "}
            <div className="uppercase">
              <a
                href="https://www.instagram.com/daedalium/"
                target="_blank"
                className="footerLink"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <br />{" "}
              <a
                href="https://ae.linkedin.com/in/oussamaammar"
                target="_blank"
                className="footerLink"
                rel="noopener noreferrer"
              >
                {" "}
                Linkedin
              </a>
              <br />{" "}
              <a
                href="https://x.com/daedalium"
                target="_blank"
                className="footerLink"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{" "}
            </div>{" "}
          </div>
          <div className="flex flex-col justify-end align-end h-screen w-full -mt-8">
            <div className="py-8">
              <div className="text-7xl text-center uppercase relative z-10">
                Diya Karmacharya - 花·幸子{" "}
                <span>
                  <img
                    src="lyrawalk2.gif"
                    alt=""
                    id="lyrawalk"
                    className="relative -z-10"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageTransition />
    </>
  )
}

export default DiaryPage
