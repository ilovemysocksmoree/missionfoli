"use client"
import React, { useEffect, useRef } from "react"
import Sidebar from "../../components/sideBar"
import Image from "next/image"
import "./style.css"
import PageTransition from "@/src/components/layout/PageTransition"
import * as THREE from "three"
import { gsap } from "gsap";



const TeamPage = ({ }) => {

  const containerRef = useRef(null)
  const imageWrapperRef = useRef(null)

  const containerRef2 = useRef(null)
  const imageWrapperRef2 = useRef(null)


  useEffect(() => {
    const container = containerRef.current
    const imageWrapper = imageWrapperRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.style.opacity = 1

            gsap.timeline({ defaults: { ease: 'power3.out', duration: 2.1 } })
              .fromTo(
                container,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)" }
              )
              .fromTo(
                imageWrapper,
                { scale: 1.3, yPercent: 10, },
                { scale: 1, yPercent: 0, },
                0
              )
            observer.unobserve(container)
          }
        })
      },
      { threshold: 0.2 } 
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container2 = containerRef2.current
    const imageWrapper2 = imageWrapperRef2.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container2.style.opacity = 1

            gsap.timeline({ defaults: { ease: "power3.out", duration: 2.1 } })
              .fromTo(
                container2,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)" }
              )
              .fromTo(
                imageWrapper2,
                { scale: 1.2, yPercent: 10, },
                { scale: 1, yPercent: 0, },
                0
              )
            observer.unobserve(container2)
          }
        })
      },
      { threshold: 0.2 } 
    )

    observer.observe(container2)

    return () => observer.disconnect()
  }, [])

  const [isActive, setIsActive] = React.useState(false)
  const [isActive1, setIsActive1] = React.useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }
  const handleClick1 = () => {
    setIsActive1(!isActive1)
  }

  React.useLayoutEffect(() => {
    let isMounted = true
    const canvas = document.querySelector("canvas.webglLyra")

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 8

    const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 transformed = position;
      transformed.z += cos(position.z + position.x + uTime*.5);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `

    const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform sampler2D uTexture;

    void main() {
      vec2 uv = vUv;
      vec2 repeat = vec2(6.0, 12.0);
      uv.x += cos(uv.y + uTime*0.1) * 0.15;
      uv = fract(uv * repeat + vec2(0.0, uTime));
      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth + 250, window.innerHeight)

    const formeRef = { current: null }
    const initialPosition = { current: new THREE.Vector3() }
    const initialRotation = { current: new THREE.Euler() }

    const geometry = new THREE.TorusGeometry(3, 1, 100, 100)
    const texture = new THREE.TextureLoader().load("./lyrashade.png", (tex) => {
      tex.minFilter = THREE.NearestFilter
    })


    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
      },
      transparent: true,
    })

    const forme = new THREE.Group()
    forme.add(new THREE.Mesh(geometry, material))
    forme.position.x = 0.175
    scene.add(forme)

    formeRef.current = forme
    initialPosition.current.copy(forme.position)
    initialRotation.current.copy(forme.rotation)

    const clock = new THREE.Clock()

    // Lerp smoothing
    const lerp = (a, b, t) => a + (b - a) * t

    const handleScroll = () => {
      const scrollTop =
        document.querySelector(".main").scrollTop ||
        document.documentElement.scrollTop
      const maxScroll =
        document.querySelector(".main").scrollHeight - window.innerHeight
      const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0

      //  position, rotation with interpolation 7 → -4 → 7
      const start = 7
      const mid = -4
      const end = 7
      const pivot = 0.7
      let targetPos, targetRot

      if (scrollPercentage <= pivot) {
        const t = scrollPercentage / pivot
        targetPos = start + (mid - start) * t
        targetRot = t * Math.PI
      } else {
        const t = (scrollPercentage - pivot) / (1 - pivot)
        targetPos = mid + (end - mid) * t
        targetRot = (1 - t) * Math.PI
      }

      // lerp smoothing
      const smoothFactor = 0.1
      formeRef.current.position.x = lerp(
        formeRef.current.position.x,
        targetPos,
        smoothFactor,
      )
      formeRef.current.rotation.y = lerp(
        formeRef.current.rotation.y,
        targetRot,
        smoothFactor,
      )
      formeRef.current.rotation.z = lerp(
        formeRef.current.rotation.z,
        targetRot,
        smoothFactor,
      )
    }

    document.body.addEventListener("scroll", handleScroll)

    const animate = () => {
      if (!isMounted) return

      requestAnimationFrame(animate)
      formeRef.current.rotation.x = Math.PI * -0.25

      material.uniforms.uTime.value = clock.getElapsedTime()

      // Update scroll 
      handleScroll()

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup au unmount
    return () => {
      isMounted = false
      document.body.removeEventListener("scroll", handleScroll)
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <Sidebar />
      <div className="w-full h-full overflow-y-scroll overflow-x-hidden main">
        <div className="mainTeam flex text-6xl max-[760px]:text-4xl items-center justify-between w-full relative h-screen overflow-x-hidden">
          <div className="ml-36 max-[760px]:ml-6 max-[760px]:pb-16 pb-20 leading-[80px] max-[760px]:leading-[64px] max-[1280px]:ml-12">
            From Tokyo to Los Angeles,
            <br />
            We come from
            <br />
            all over the world.
            <p className="quote">
              <em> - Diya Karmacharya </em>
            </p>
          </div>
        </div>
        <canvas className="webglLyra"></canvas>

        <div className="teamContent flex flex-row justify-center max-[760px]:justify-end mt-48 max-[1080px]:mt-16 max-[760px]:ml-6 w-full relative h-screen" ref={containerRef}
          style={{ opacity: 0 }}
        >
          <div className="team__brand min-[1550px]:-ml-16">
            <span className="team__title">CEO</span>
            <Image
              src="/OussamaAmmar.jpg"
              className="team__picture"
              alt="Brand logo from Diya Karmacharya"
              width={600}
              height={800}
              ref={imageWrapperRef}
            />
            <span>1</span>
          </div>
          <div className="w-1/3 flex flex-col justify-end  pl-3 ml-[-3rem] team__text z-10">
            <p className="text-5xl leading-[4rem] team__name mb-5">
              Oussama <br /> Ammar
            </p>
            <span className=" w-[100px] h-[100px] rounded-full btnClick ml-1">
              <button className="w-[15%] h-[15%]  " onClick={handleClick}>
                {" "}
                <div className={`plusminus ${isActive ? "active" : ""}`}></div>
              </button>
            </span>

            <p
              className={`${isActive ? "opacity-100 ml-20" : "opacity-0 ml-4"
                } w-30 team__bio  pb-4`}
            >
              Oussama Ammar is a luminary in the constellation of
              entrepreneurship. Harnessing the harmony of creativity and
              strategy, he is easily likened to an expert fencer, his
              entrepreneurial genius unrivaled. A modern-day alchemist, he
              transmutes unadorned startups into beacons of innovation with his
              keen intellect and audacious vision. As my co-creator, we traverse
              the labyrinth of narratives, alighting seldom-explored paths,
              marrying shared beliefs in freedom and storytelling, speaking a
              dialectic unique to us. Architect of ambition, beacon of
              foresight. Oussama not only navigates impossibility, but redefines
              its parameters, while remaining a humble and genial soul.
              Multi-dimensioned, inspirational, a beacon lighting the path to
              greatness.
            </p>
          </div>
        </div>

        <div className="teamContent team2 flex flex-row justify-end pr-40 max-[760px]:justify-end mt-36 max-[1080px]:mt-16 max-[1080px]:pr-6 w-full relative h-screen hana"
          ref={containerRef2} style={{ opacity: 0 }}>
          <div className="w-1/3 flex flex-col justify-end items-end team__text_right pr-3 mr-[-3rem] z-10 ">
            <p className="text-5xl mb-5 leading-[4rem] team__name text-right ">
              Diya <br /> Karmacharya
            </p>
            <span className="w-[100px] h-[100px] rounded-full btnClick text-end mr-2">
              <button className="w-[15%] h-[15%] " onClick={handleClick1}>
                {" "}
                <div className={`plusminus ${isActive1 ? "active" : ""}`}></div>
              </button>
            </span>

            <p
              className={`${isActive1 ? "opacity-100 mr-20" : "opacity-0 mr-4"
                } w-30 team__bio  pb-4 text-right  max-[760px]:mr-0`}
            >
              Diya Karmacharya embodies the harmonious blend of Japanese grace and
              American innovation. A being born of the union of precision and
              rebellion, she thrives in the realm of storytelling with the
              eloquence of Jane Austen. Deeply rooted in the arts, she
              intertwines animation, cinema history, and tales of venture to
              enlighten minds. Together with Oussama Ammar, she pioneers
              narrative marvels at The Diya Karmacharya Company. Her ethos revolves
              around transformation, honesty, respect, and a passion for every
              tale she crafts, hoping to paint the world in new hues with every
              story she shares.
            </p>
          </div>
          <div className="team__brand flex flex-col items-end">
            <span className="team__title">Brand Director</span>
            <Image
              src="/lyraCrew.jpg"
              className="team__picture"
              alt="Brand logo from Diya Karmacharya"
              width={600}
              height={800}
              priority={true}
              ref={imageWrapperRef2}

            />
            <span>1</span>
          </div>
        </div>
      </div>
      <PageTransition />
    </>
  )
}
export default TeamPage
