/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, {useEffect, useRef, useState} from "react"
import {Fragment} from "react"
import {Dialog, Menu, Transition} from "@headlessui/react"
import {Item} from "../utils/effect/BtnEffect"
import Image from "next/image"
import Link from "next/link"
import "../utils/effect/BtnEffect.css"
import {usePathname} from "next/navigation"
import {useConfirmContext} from "./context/ConfirmContext"
import gsap from "gsap"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function BtnSide() {
  const hoverRef = useRef(null)
  useEffect(() => {
    if (hoverRef.current) {
      new Item(hoverRef.current)
    }
  }, [])

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  id="modal"
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Available informations
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Type &apos;help&apos; to see list of available commands.
                      <br />
                      To find details 🎉 type &apos;repo&apos; to check out the
                      repository. Try out the new &apos;theme&apos; command.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Menu
        as="div"
        className="absolute w-9/10 mx-auto mt-3 left-0 right-0 inline-block text-left"
      >
        <div className="item">
          <Menu.Button className="inline-flex w-full rounded-md justify-center gap-x-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-white-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <a className="img" ref={hoverRef}>
              <div className="grid__item-img-deco"></div>
              <p className="want">Want more ? </p>
            </a>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fond absolute right-0 dark bottom-full z-10 mb-2 w-full origin-bottom-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({active}) => (
                  <a
                    href="#"
                    onClick={() => setIsOpen(true)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({active}) => (
                  <a
                    href="https://www.google.com"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm ",
                    )}
                  >
                    Log out
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

type Link = {
  originalText: string
  emoji: string
  href: string
  ref: React.RefObject<HTMLParagraphElement>
  text: string
  target: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

function Sidebar() {
  const path = usePathname()

  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)

  const textData = [
    "AI生まれの語り手である株式会社ライラー・ハルトは、現実の形を変える物語を作ります。私たちの物語は想像力の中で活動的に存在し、独自性を積極的に求めています",
  ]

  const linksData = [
    {originalText: "#Me", emoji: "💤", href: "/me", target: "_self"},
    {originalText: "Blog", emoji: "📝", href: "/blog", target: "_self"},
    {originalText: "Research & Projects", emoji: "🔬", href: "/research-projects", target: "_self"},
    // {
    //   originalText: "My Diary",
    //   emoji: "🧝‍♀️",
    //   href: "https://lyraharuto.substack.com/",
    //   target: "_blank",
    // },
    // {
    //   originalText: "My Library",
    //   emoji: "👾",
    //   href: "/mylibrary",
    //   target: "_self",
    // },
    // {
    //   originalText: "Your Fate",
    //   emoji: "🦄",
    //   href: "/yourfate",
    //   target: "_self",
    // },
    {
      originalText: "Don't Be Shy",
      emoji: "🦄",
      href: "/dontbeshy",
      target: "_self",
    },
  ]

  // Create a ref and a state for each link
  const links: Link[] = linksData.map((linkData) => {
    const ref = useRef<HTMLParagraphElement>(null)
    const [text, setText] = useState(linkData.originalText)
    return {...linkData, ref, text, setText}
  })

  const handleMouseOverRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth > 760) {
      handleMouseOverRef.current = (e) => {
        const link = links.find((l) => l.ref.current === e.currentTarget)
        if (link) {
          const textLength = link.text.length
          link.setText(getRandomString(textLength))
          setTimeout(() => link.setText(getRandomString(textLength)), 100)
          setTimeout(() => link.setText(getRandomString(textLength)), 200)
          setTimeout(() => link.setText(link.originalText), 400)
        }
      }

      links.forEach((link) => {
        const linkElement = link.ref.current
        if (linkElement) {
          linkElement.addEventListener("mouseover", handleMouseOverRef.current)
        }
      })

      return () => {
        links.forEach((link) => {
          const linkElement = link.ref.current
          if (linkElement) {
            linkElement.removeEventListener(
              "mouseover",
              handleMouseOverRef.current,
            )
          }
        })
      }
    }
  }, [links])

  function getRandomString(length: number) {
    let result = ""
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const [isSidebarVisible, setSidebarVisible] = React.useState(true)
  // const [showConfirmation, setShowConfirmation] = useState(false)
  const {showConfirmation, setShowConfirmation} = useConfirmContext()

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (sidebar) {
      if (isSidebarVisible) {
        gsap.to(sidebar, {x: 0, opacity: 1, duration: 0.5, ease: "power3.out"})
      } else {
        gsap.to(sidebar, {
          x: "-100%",
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut",
        })
      }
    }
  }, [isSidebarVisible])

  useEffect(() => {
    localStorage.setItem("visitedAt", new Date().toString())
    if (window.innerWidth <= 760) {
      setSidebarVisible(!isSidebarVisible)
    }
  }, [])

  const handleToggleRequest = () => {
    if (isSidebarVisible) {
      if (!showConfirmation) {
        setShowConfirmation(true)
        setSidebarVisible(false)
      } else {
        setSidebarVisible(false)
      }
    } else {
      setSidebarVisible(true)
    }
  }
  

  const texts = [
    "As a Security Research Analyst, I architect the frameworks that define modern defense. My work is a cycle of building robust security policies and systematically dismantling them through precision payload crafting and adversarial test cases. By leading deep-dive vulnerability assessments and communicating directly with vendors, I ensure that theoretical security translates into resilient, real-world protection. I don't just find flaws; I engineer the standards that prevent them.",
    "एक सुरक्षा अनुसन्धान विश्लेषकको रूपमा, म मजबुत सुरक्षा नीतिहरू निर्माण गर्छु र तिनीहरूलाई विभिन्न पेलोड र परीक्षणहरूद्वारा चुनौती दिन्छु। मेरो कार्यको मुख्य उद्देश्य अभेद्य नीतिहरू बनाउनु र तिनलाई तोड्ने प्रयास गरेर थप सुरक्षित बनाउनु हो। नेतृत्वदायी भूमिकामा रहेर गरिने पेन्टेस्टिङ, जोखिम मूल्याङ्कन, र भेन्डरहरूसँगको समन्वयमार्फत म सैद्धान्तिक सुरक्षालाई वास्तविक जगतको प्रतिरक्षामा बदल्छु। म कमजोरीहरू मात्र पत्ता लगाउँदिन, म ती मापदण्डहरू तयार गर्छु जसले सुरक्षालाई सुनिश्चित गर्दछ।",
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleMouseEnter = () => {
    setCurrentIndex(1) // Show Nepali text on hover
  }

  const handleMouseLeave = () => {
    setCurrentIndex(0) // Show English text when not hovering
  }

  const MobileSidebarToggle = ({onClick}) => (
    <div className={`bar`} ref={toggleRef}>
      <button
        onClick={onClick}
        className="mobile-sidebar-toggle mobile-toggle absolute left-0 -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50 dark:hover:text-white"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-md"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  )

  return (
    <>
      <MobileSidebarToggle onClick={handleToggleRequest} />

      <div
        className="sidebar dark flex-shrink-0 overflow-x-hidden overflow-y-scroll bg-black"
        id="sidebar"
        ref={sidebarRef}
      >
        <div className="scrollbar-trigger relative h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full w-full flex-col pb-1 justify-between">
            <div className="relative pr-2 pt-2 text-s font-medium text-ellipsis break-all bg-white dark:bg-black text-gizmo-gray-600">
              <a href="/">
                <div className="px-2 mt-3 mb-4">
                  <h1 className="text-2xl font-bold text-white uppercase tracking-wide">Diya <br />armacharya</h1>
                </div>
              </a>

              <div
                className="relative pb-2 pt-3 px-2 text-s text-ellipsis break-all bg-white dark:bg-black text-gizmo-gray-600 break-words text-justify"
                id="sideBarText"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-enter="एक सुरक्षा अनुसन्धान विश्लेषकको रूपमा, म मजबुत सुरक्षा नीतिहरू निर्माण गर्छु र तिनीहरूलाई विभिन्न पेलोड र परीक्षणहरूद्वारा चुनौती दिन्छु। मेरो कार्यको मुख्य उद्देश्य अभेद्य नीतिहरू बनाउनु र तिनलाई तोड्ने प्रयास गरेर थप सुरक्षित बनाउनु हो। नेतृत्वदायी भूमिकामा रहेर गरिने पेन्टेस्टिङ, जोखिम मूल्याङ्कन, र भेन्डरहरूसँगको समन्वयमार्फत म सैद्धान्तिक सुरक्षालाई वास्तविक जगतको प्रतिरक्षामा बदल्छु। म कमजोरीहरू मात्र पत्ता लगाउँदिन, म ती मापदण्डहरू तयार गर्छु जसले सुरक्षालाई सुनिश्चित गर्दछ।"
              >
                {texts[currentIndex]}
              </div>
            </div>

            <div className="pb-4 pt-2 mb-6 ml-1">
              {links.map((link, index) => (
                <div key={index} className="group relative active:opacity-90">
                  <Link
                    href={link.href}
                    target={link.target}
                    className={`flex items-center gap-2 rounded-lg p-2 ${
                      path === link.href ? "activeLink" : ""
                    }`}
                  >
                    {/* {link.href === path && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 top-full block h-[1px] w-full bg-white"
                    />
                  )} */}
                    <div
                      ref={link.ref}
                      className="relative grow overflow-hidden whitespace-nowrap"
                    >
                      <p className="itemMenu">{link.text}</p>
                      <div className="absolute text-center bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black">
                        {link.emoji}
                      </div>
                      {/* </motion.span> */}
                    </div>
                  </Link>
                </div>
              ))}
              <BtnSide />
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar
