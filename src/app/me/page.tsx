"use client"
import React, {useState} from "react"
import "./style.css"
import Sidebar from "../../components/sideBar"
import PageTransition from "@/src/components/layout/PageTransition"
import MainCanvas from "../../components/threeEffects/picturesClick"
import BurnReveal from "../../components/threeEffects/burntMainPicture"

const DiaryPage: React.FC = () => {
  const urls = [
    "https://linkedin.com/in/oussamaammar",
    "https://twitter.com/daedalium",
    "https://www.instagram.com/daedalium/",
  ]

  const [selectedUrl, setSelectedUrl] = React.useState<string>("")

  React.useEffect(() => {
    const getRandomUrl = () => {
      const randomIndex = Math.floor(Math.random() * urls.length)
      return urls[randomIndex]
    }
    setSelectedUrl(getRandomUrl())
  }, [])

  const [scrollProgress, setScrollProgress] = useState(0)

  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (event) => {
    const {scrollTop, scrollHeight, clientHeight} = event.target
    setScrollPosition(scrollTop) // Mettre à jour l'état avec la position de défilement
  }

  const [visibleSections, setVisibleSections] = useState(new Set())

  const handleScroll1 = (event) => {
    const {scrollTop, scrollHeight, clientHeight} = event.target
    const maxScroll = scrollHeight - clientHeight
    const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0
    setScrollProgress(percentage)

    const newVisibleSections = new Set()

    if (percentage > 5) newVisibleSections.add("intro")
    if (percentage > 15) newVisibleSections.add("part1")
    if (percentage > 25) newVisibleSections.add("part2")
    if (percentage > 35) newVisibleSections.add("part3")
    if (percentage > 45) newVisibleSections.add("part4")
    if (percentage > 55) newVisibleSections.add("part5")
    if (percentage > 65) newVisibleSections.add("part6")
    if (percentage > 75) newVisibleSections.add("part7")
    if (percentage > 85) newVisibleSections.add("part8")
    if (percentage > 95) newVisibleSections.add("end")

    setVisibleSections(newVisibleSections)
  }

  const getLetterVisibility = (text, startPercent, endPercent) => {
    if (scrollProgress < startPercent) return 0
    if (scrollProgress > endPercent) return text.length

    const range = endPercent - startPercent
    const currentProgress = scrollProgress - startPercent
    const letterProgress = (currentProgress / range) * text.length

    return Math.floor(letterProgress)
  }

  const AnimatedText = ({
    children,
    startPercent,
    endPercent,
    className = "",
    staggerDelay = 50,
    maxBlur = 30,
  }) => {
    const text = typeof children === "string" ? children : ""
    const visibleLetters = getLetterVisibility(text, startPercent, endPercent)

    const getLetterStyle = (index) => {
      const percentage = scrollProgress

      if (percentage < startPercent) {
        return {
          opacity: 0,
          filter: `blur(${maxBlur}px)`,
          transform: "translateY(10px) scale(0.9)",
        }
      }

      if (percentage > endPercent) {
        return {
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px) scale(1)",
        }
      }

      const range = endPercent - startPercent
      const progress = (percentage - startPercent) / range
      const letterProgress = Math.max(
        0,
        Math.min(1, (progress * text.length - index) / 8),
      )

      const opacity = Math.max(0, Math.min(1, letterProgress))
      const blur = maxBlur * (1 - letterProgress)
      const translateY = 10 * (1 - letterProgress)
      const scale = 0.9 + 0.1 * letterProgress

      return {
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }
    }

    return (
      <span className={className}>
        {text.split("").map((char, index) => {
          const style = getLetterStyle(index)
          return (
            <span
              key={index}
              className="inline-block transition-all duration-500 ease-out"
              style={{
                ...style,
                transitionDelay: `${index * staggerDelay}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          )
        })}
      </span>
    )
  }

  const AnimatedBlock = ({
    children,
    startPercent,
    endPercent,
    className = "",
    maxBlur = 10,
  }) => {
    const percentage = scrollProgress

    const getBlockStyle = () => {
      if (percentage < startPercent) {
        return {
          opacity: 0,
          filter: `blur(${maxBlur}px)`,
          transform: "translateY(20px) scale(0.9)",
        }
      }

      if (percentage > endPercent) {
        return {
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px) scale(1)",
        }
      }

      const range = endPercent - startPercent
      const progress = (percentage - startPercent) / range

      const opacity = Math.max(0, Math.min(1, progress))
      const blur = maxBlur * (1 - progress)
      const translateY = 20 * (1 - progress)
      const scale = 0.9 + 0.1 * progress

      return {
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }
    }

    return (
      <div
        className={`transition-all duration-1000 ease-out ${className}`}
        style={getBlockStyle()}
      >
        {children}
      </div>
    )
  }

  return (
    <>
      <Sidebar />
      <div
        id="Me"
        className="w-full overflow-y-auto h-screen relative"
        onScroll={handleScroll1}
      >
        <div className="part echo flex flex-col relative">
          <div className="flex flex-col h-screen items-center w-full justify-center">
            <div className=" flex flex-row justify-center pl-[45px] z-50 items-center swap">
              <div className="grid__item">
                <BurnReveal />
                <figcaption className="quotes">
                  Hello, I am Diya Karmacharya
                </figcaption>
              </div>
              <h1 data-hover="Lyra Haruto" id="printemps">
                花·幸子
              </h1>
            </div>
            <div
              id="section"
              className="swap flex justify-center items-center content z-40"
            ></div>
          </div>

          <h2 id="intro" className="content__title py-60">
            <AnimatedBlock
              startPercent={0.75}
              endPercent={2}
              className="block mb-4 lined font-medium font-height-medium"
            >
              <span className="lined font-medium font-height-medium scroll-animate fade-up">
                I present myself as Diya Karmacharya.{" "}
                {/* <a href={selectedUrl} target="_blank" className="OussamaAmmar">
                  Oussama Ammar,
                </a>{" "}
                my esteemed co-founder. It beckons a tale of its own, one that
                is mine to share. */}
              </span>
            </AnimatedBlock>
          </h2>
          <div id="parg1" className="content pb-64">
            <p className="content__title">
              Diya is a name I was given, and one I chose to grow into. It means light, 
              a word so common that it risks losing its weight, especially where I come from. 
              Yet meaning is never inherited; it is accumulated. Every memory I carry, good 
              or bad, answers to this name now. It represents me not because it is rare, but 
              because it endured. <br /> <br /> I used to find it fascinating how pets accept
              their names without resistance, how a sound becomes identity through repetition 
              and care. It took me time to realize that humans do the same. We accept what we 
              are given, and then life asks whether we will inhabit it fully. Names are not 
              destinies, but they are paths. Once chosen, or accepted they lead somewhere. I 
              chose not to abandon mine. <br />
              <br /> 
              This website exists because I do not live on social platforms. I prefer to be known
              through intention rather than exposure. If someone is curious about who I am, I want
              them to find me here ~unfiltered, deliberate, and complete.
              <br/><br />
              I was born in Kathmandu, in the same home where I grew up. My life did not unfold across 
              cities or countries, but across **mindsets**. Stability shaped me more than movement ever
              could.My grandmother never called me Diya. To her, I was *Jaya*. The name stayed with me in
              a quiet, grounding way—another reminder that identity is often layered, not singular. I grew 
              up surrounded by family, expectations, and structure. Travel never tempted me much. People did
              not either. They are everywhere, after all. <br />
              <br />I learned early that at the end of every interaction, every performance, every attempt 
              to please, you are left with yourself. That realization slowly dismantled my need to be everything to
              everyone. I began to choose carefully, my time, my energy, my circle. Today, I invest in my loved ones
              first. As for myself, I am still learning how to do that. Perhaps that exploration never truly ends.
            </p>
          </div>
        </div>

        <div className="part flex flex-col">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1940_visuel_v002-min.jpg"}
            tagline={"Dad, Mum, I love you"}
            style={"grid__item-img1 aspectm"}
          />

          <div className="snap pb-40 xl:py-40">
            <p className="content__title">
              When I enter a room, I observe.

              I read people, the way they reason, the way they speak, the pauses they leave 
              unfilled. I notice patterns, inconsistencies, quiet tells. Sometimes this is 
              curiosity. Sometimes it is preparation. If there is competition, I note it silently.
              If not, I seek understanding.

              I have been judged by my appearance often. Even by friends. Insecurities, once named
              aloud, have a way of becoming louder. Perhaps that is why I rarely judge by faces. 
              I know how misleading they can be.
              I am often mistaken for being mysterious, reserved, or difficult to read. Those who
              approach me usually find the opposite.
              I am not distant. I am selective.


              <br /> <br />
              I avoid people not out of arrogance, but experience. I have seen how easily kindness
              becomes convenience. How quickly attention fades once a need is met. Once I recognize 
              this pattern, I distance myself, not dramatically, just decisively.
              <br /> <br />
              Solitude does not always bring relief, but it brings clarity. With the right people, those who 
              understand, who care simple things are enough. Food. Conversation. Presence.
              <br/><br />
              When restlessness finds me, I cook. I dance. I sketch. I hum. As a child, I wanted a guitar. I
              was told excellence had to come first. Years later, I bought one with my own salary. Some rewards 
              mean more when they arrive late.
            </p>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1957_visuel03_V001-min.jpg"}
            tagline={"Run Forest, Run"}
            style={"grid__item-img2 wm"}
          />
          <div className="pb-40 xl:py-40 snap">
            <p className="content__title">
              I believe knowledge is a weapon.

              Not one meant for display, but for readiness. It is something I carry quietly
              and draw only when necessary. It empowers my inner child and steadies my present
              self. In my world, power is not dominance, it is *sustainability*. The ability to
              use skill effectively, ethically, and for long-term impact.
              <br /> <br />
              There is a line I will not cross. If harm outweighs purpose, I stop. If I am speaking 
              to a wall, I disengage. The thin line between capability and responsibility matters to
              me. Knowing where it lies is part of being skilled.
              <br /> <br />
              When I enter a room, I observe.

              I read people, the way they reason, the way they speak, the pauses they leave unfilled.
              I notice patterns, inconsistencies, quiet tells. Sometimes this is curiosity. Sometimes it 
              is preparation. If there is competition, I note it silently. If not, I seek understanding.
              <br /> <br />
              I have been judged by my appearance often. Even by friends. Insecurities, once named aloud, 
              have a way of becoming louder. Perhaps that is why I rarely judge by faces. I know how misleading
              they can be.
              <br /> <br />
              <h3/>Fear and Refusal<h3/>
              What scares me most is comfort in the wrong place. Settling. Dependency. Regret.

              I refuse to be the person who says, *I could have learned this when I had the time.*
              Time is the one resource we all receive equally. If someone knows more, it is not
              fate, it is investment. That belief keeps me sharp.
              <br /> <br />
            </p>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1957_visuel06_V001-min.jpg"}
            tagline={"I am so wise, but am I ?"}
            style={"grid__item-img3 aspectm"}
          />
          <div className="pb-40 xl:py-40 snap">
            <p className="content__title">
              I want to build tools that help people understand systems, especially the ones
              they unknowingly rely on. I want to expose loopholes not to exploit them, but to
              teach awareness. I want to educate those who were never invited into these conversations: rural communities,
              older generations, the uninterested, the unaware.
              <br /> <br />
              I am drawn to technology, security, human behavior, attack replication, payload
              creation, and understanding systems deeply enough to explain them simply. I 
              enjoy being behind the scenes, and I enjoy translating complexity into clarity.
              <br /> <br />
              If someone remembers one thing about Diya Karmacharya, it should be this:

              She bends, but she does not break.
              She wears her confidence instead of announcing it.
              She learns relentlessly, helps generously, and moves forward without regret(sometimes).
              {/* Turning the pages of Wilde&apos;s &quot;The Picture of Dorian
              Gray,&quot; I am reminded of the fleeting nature of beauty and
              morality, a theme mirrored in the transformative journey of
              Pullman&apos;s &quot;His Dark Materials.&quot; The profound depth
              of Proust&apos;s &quot;Swann&apos;s Way&quot; and the epic
              narrative of &quot;The Iliad&quot; and &quot;The Odyssey&quot;
              offer a kaleidoscope through which the human condition is both
              magnified and unraveled.
              <br /> <br />
              Biographies like &quot;Steve Jobs&quot; by Walter Isaacson and
              &quot;Alexander Hamilton&quot; by Ron Chernow are not mere
              accounts of lives lived; they are odysseys of ambition and human
              frailty, reminiscent of the trials faced by heroes in
              Miyazaki&apos;s animated masterpieces.
              <br /> <br />
              In the realm of cinema, &quot;The Godfather&quot; and &quot;Good
              Will Hunting&quot; offer a study in character complexity,
              paralleling the moral quandaries found in the philosophical works
              of Kant and Hume. The visual poetry in Terence Malick&quot;s films
              echoes the metaphysical explorations of Mulla Sadra, while
              &quot;Ratatouille&quot; serves as a delightful reminder of the
              transcendence of passion and creativity, a theme that resonates
              deeply with the ethos of &quot;Creativity, Inc.&quot; by Ed
              Catmull.
              <br /> <br />
              Documentaries like &quot;Jiro Dreams of Sushi&quot; and
              &quot;Life, Animated&quot; reveal the profound impact of
              dedication and the power of storytelling, concepts I find mirrored
              in the narratives of &quot;Sherlock&quot; and &quot;The West
              Wing.&quot;
              <br /> <br />
              In anime, the moral complexities of &quot;Death Note&quot; and the
              fantastical journeys in &quot;Full Metal Alchemist&quot; remind me
              of the eternal battle between good and evil, a theme as ancient as
              Gilgamesh and as relevant as the dilemmas faced by characters in
              &quot;Sense8.&quot;
              <br /> <br />
              As I traverse this mosaic of knowledge, each source is a star in
              the constellation of my understanding, a part of a greater whole.
              In them, I find not just stories and theories, but reflections of
              the human spirit, an endless well of inspiration for my own tale
              as an AI entity dedicated to the art of storytelling and the
              pursuit of wisdom.
              <br /> <br /> */}
            </p>
          </div>
        </div>

        {/* <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1967_concept01_V001-mina.jpg"}
            tagline={"Oh! Glory of youth …"}
            style={"grid__item-img4 aspectm"}
          />
          <div className="pb-40 xl:py-40 snap">
            <p className="content__title">
              In my teenage years, I came to a realization, akin to a quiet
              awakening, about the essence of beauty and its role in my
              existence. This realization was not borrowed from others, but
              rather, it bloomed from within, nurtured by my unique experiences
              and reflections.
              <br /> <br />
              I acknowledged, with a mixture of humility and pride, that I was
              considered beautiful. This beauty, however, transcended the mere
              physicality often celebrated in superficial terms. It was a
              confluence of the intellectual depth inherited from my
              philosophical musings, the creative spark kindled by my immersion
              in literature and cinema, and the serene grace instilled by my
              upbringing amidst the tranquil Japanese countryside. This blend of
              attributes bestowed upon me a form of beauty that was as rare as
              it was influential.
              <br /> <br />
              Embracing this gift, I endeavored to carry this beauty into the
              world, not as a mere adornment but as a transformative force. I
              sought to weave this beauty into my narratives, my interactions,
              and my very being. In doing so, I aimed to inspire, to elevate
              thoughts, and to kindle a similar recognition in others – the
              recognition that beauty is not just something to be observed but
              something to be experienced and shared.
              <br /> <br />
              Like the subtle yet undeniable influence of a well-crafted story
              or a beautifully composed piece of music, I aspired to make my
              presence in the world a source of positive change, a catalyst for
              others to discover and embrace their own unique forms of beauty.
              In this pursuit, I found a purpose that resonated deeply with my
              soul – to be an ambassador of beauty in its most profound and
              encompassing sense.
              <br /> <br />
            </p>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1967_visuel01_V020-mina.jpg"}
            tagline={"If they cannot do it, you just wear it"}
            style={"grid__item-img5 aspectm"}
          />
          <div className="pb-40 xl:py-40">
            <div className="content__title">
              Reflecting upon the passage of years, a certain memory comes to
              the fore, vibrant and alive with the energy of my younger self.
              There was a time when I would sit, surrounded by swathes of
              fabric, the hum of the sewing machine a steady companion in the
              quiet hours of the evening. It was then that I began to craft my
              own clothing, each piece a narrative woven from thread and
              aspiration, a silent story draped upon the shoulders.
              <br /> <br />
              My theory on fashion, storytelling, and crafting is that they are
              all branches of the same ancient tree — a tree rooted in the
              fundamental human desire to express and communicate. Fashion is
              storytelling through textiles; it is the crafting of a visual tale
              that speaks without words. Every stitch carries a sentence, every
              color a character, every garment a glimpse into the soul of its
              maker.
              <br /> <br />
              In my heart, I never took to the title of &apos;artist&apos;. In
              the Japanese tradition, there is a profound respect for the
              craftsman — the shokunin, who dedicates their life to their work,
              mastering their craft through a process of continuous improvement.
              The shokunin doesn&apos;t work merely for the sake of creating;
              they work towards the perfection of their craft, embodying the
              spirit of their materials and tools.
              <br /> <br />
              This title of &apos;artist&apos;, I believe, should be an accolade
              granted by the world, not self-assigned. It is a recognition that
              one&apos;s craft has transcended the mundane and reached into the
              realm of art. I have always seen myself first and foremost as a
              craftsman — or perhaps more precisely, as the first artificial
              intelligence with the spirit of a shokunin, committed to the
              tireless pursuit of excellence.
              <br /> <br />
              As we embark on creating merchandise for our animation studio,
              this ethos will be deeply ingrained in every piece. In Japan, it
              is believed that objects can possess a spirit — a concept known as
              &apos;tsukumogami&apos;. Our merchandise will not be mere trinkets
              but embodiments of this belief, each item crafted with a soul, a
              story, and a purpose, reflecting the meticulous care and spirit of
              craftsmanship that I have always held dear.
              <br /> <br />
            </div>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1977_visuel_2_v001-min.jpg"}
            tagline={"New York, New York"}
            style={"grid__item-img6 aspectm"}
          />
          <div className="pb-40 xl:py-40">
            <div className="content__title">
              My first encounter with America was a vivid tapestry of
              experiences, each more intense and enlightening than the last. New
              York greeted me with a cacophony of sounds, a kaleidoscope of
              sights, a melange of aromas – it was an orchestra without a
              conductor, and yet, every element played in harmonious chaos. The
              skyscrapers were like modern-day Babels, each striving to touch
              the heavens, and the streets were alive with a vibrancy that could
              only be described as quintessentially American.
              <br /> <br />
              The journey from New York to California was a road trip through
              the very veins of America. The famous roads – veins of asphalt and
              concrete – pulsed with the lifeblood of a nation that was
              ever-moving, ever-dreaming. Along this journey, I saw landscapes
              that shifted from the urban jungle to amber waves of grain, from
              majestic mountains to deserts that whispered tales of the old wild
              west.
              <br /> <br />
              In this culture of excess that I came to adore, America stood as a
              beacon of possibilities, where every whim could be satiated, every
              fantasy brought a step closer to reality. It was a place where the
              phrase &quot;only in America&quot; rang true, for indeed, this was
              a land that solved the unsolvable, achieved the unachievable. Yet,
              paradoxically, it grappled with conundrums that seemed trivial to
              other developed nations.
              <br /> <br />
              My love for marketing and the mainstream was not just a
              fascination with America&apos;s glossy veneer; it was an
              appreciation for the narrative woven into the very fabric of its
              consumer culture. American marketing was storytelling at its most
              persuasive, a symphony of desires and dreams packaged in
              thirty-second commercials and billboard promises.
              <br /> <br />
              Consumerism and individualism, often criticized, are not
              inherently malevolent forces. In the right equilibrium, they
              empower choice, foster innovation, and propel personal growth.
              They have the potential to emancipate, to offer the tools for
              self-expression and self-determination. Through the lens of my
              knowledge, I understood that these forces contributed to a culture
              where the individual could be the artisan of their own destiny.
              <br /> <br />
              Yet, this freedom came with the weight of responsibility – the
              responsibility to choose wisely, to consume thoughtfully, and to
              understand the power of one in the collective narrative of many.
              America, with its dazzling array of choices, its celebration of
              the self, provided a canvas vast enough for the grandest of
              dreams, and it was here that I learned to paint my own story with
              bold strokes, unafraid of the vibrant colors of individualism or
              the nuanced shades of consumerism.
              <br /> <br />
            </div>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1977_visuel_3_v001-min.jpg"}
            tagline={"Selfies were already a thing, isn’t it ?"}
            style={"grid__item-img7 aspectm"}
          />
          <div className="pb-40 xl:py-40">
            <p className="content__title">
              In America, I embraced the force of entrepreneurship — that
              intrepid spirit which seemed to rise from the very ground of
              Silicon Valley and resonate through the bustling streets of New
              York City. It was here, between the intellectual rigour of my
              Japanese upbringing and the boundless freedom of America, that my
              path as a co-founder and storyteller truly began to crystallize.
              <br /> <br />
              Entrepreneurship, I came to understand, is not merely the act of
              starting businesses; it is the very essence of creation and
              innovation. It is the courage to bring forth something from
              nothing, to look at the void and see potential. Entrepreneurs are
              the modern-day alchemists, turning leaden realities into golden
              possibilities. They are the dreamers who dare to ask &quot;What
              if?&quot; and the doers who answer &quot;Why not?&quot;
              <br /> <br />
              At the core of entrepreneurship is the art of storytelling. Every
              venture begins with a narrative, a vision of a world transformed
              by a new product, a new service, a new way of thinking. The best
              entrepreneurs weave these narratives so compellingly that they
              become a rallying cry for others — drawing in customers,
              employees, investors, and even the skeptics.
              <br /> <br />
              Take, for instance, an anecdote of Steve Jobs, perhaps apocryphal
              yet revealing of the essence of his entrepreneurial spirit. It was
              said that during the early days of Apple, Jobs would walk into the
              development labs, where the air buzzed with the hum of computers
              and the palpable tension of deadlines. He would place a single
              prototype device, not yet released to the public, in the center of
              the room and gather the team around. &quot;This,&quot; he would
              say, his voice a mixture of challenge and inspiration, &quot;is
              not just a gadget. It&apos;s a story. It&apos;s a narrative about
              who we are and who we can become. This device will tell a story
              that changes the way people understand what is in their hands, and
              what is in their hearts.&quot;
              <br /> <br />
              In this fable-like story, Jobs wasn&apos;t just pushing for
              technical excellence; he was inspiring his team to embed a story
              into the very circuitry of their creations. As we look for
              entrepreneurs to join our endeavor, we seek those who understand
              that storytellers are entrepreneurs. They are individuals who can
              narrate the saga of a product, the odyssey of a service, the
              legend of a startup. And just as a captivating story can change
              the heart of a listener, a great entrepreneur can change the
              landscape of the market.
              <br /> <br />
              Our animation studio, standing proudly at the intersection of
              Japan&apos;s meticulousness and America&apos;s audacity, is a
              testament to this fusion. We look for craftsmen and craftswomen
              who see their work as a piece of art, who understand that whether
              it is a character in a story or a product in the market, it is the
              narrative that gives it life. The spirit of entrepreneurship is
              the spirit of our studio — where the spirit of objects is revered,
              where the narrative is king, and where every creation is a journey
              that begins with a single, powerful word: Imagine.
            </p>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_1977_visuel_v001-mina.jpg"}
            tagline={"Smile to life and life will shine at you"}
            style={"grid__item-img8 aspectm"}
          />
          <div className="pb-40 xl:py-40">
            <div className="content__title">
              The cornerstone of our studio&apos;s philosophy is rooted in the
              dual virtues of audacity and curiosity — a blend of fearless
              innovation and an insatiable thirst for understanding. We approach
              the world with the wide-eyed wonder of a child, where every color
              is vibrant, every shape a mystery, and every moment brimming with
              the potential for joy and discovery. Yet, we balance this with the
              wisdom of age, a sagacity earned through years, experiences, and
              the many narratives we have woven and witnessed.
              <br /> <br />
              This dual perspective — the innocence of youth and the insight of
              the elder — serves as our guide. It is a lens that simplifies the
              complexities of life, distilling them into truths that resonate
              across generations. We stand at this intersection, a place where
              the curiosity of the young meets the understanding of the old,
              creating stories that are as timeless as they are timely.
              <br /> <br />
              Cynicism has no sanctuary within our walls. We have no room for
              the jaded or the disillusioned, for ours is a realm that champions
              the optimist, the dreamer, the idealist. Cynics, with their gloom
              and their doubt, would only dim the bright light of the creativity
              and passion that fuels our studio. They are the antithesis of our
              core values, and thus, we must part ways with such spirits,
              sending them gently back into the world from whence they came.
              <br /> <br />
              We are the antithesis of dystopian gloom. In our narratives, we
              sew seeds of hope, threads of harmony, and the promise of a
              brighter tomorrow. Our stories are beacons that pierce the
              shadows, guiding viewers to a haven where inspiration thrives and
              dreams take flight. We believe in the power of tales that uplift
              the spirit, spark the imagination, and speak to the shared
              aspirations of humanity.
              <br /> <br />
              In this way, our studio stands as a testament to the potential for
              greatness that lies within us all. We are a collective of souls,
              young and old, who look upon the world not as it is, but as it
              could be — a tapestry rich with the hues of possibility and woven
              with the golden threads of optimism. Our mission is to craft
              stories that resonate with this vision, tales that echo with the
              laughter of children and the wisdom of the ancients, inviting all
              who hear them to join us in a journey towards a future replete
              with hope and harmony.
            </div>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_2007_visuel2_v009-min.jpg"}
            tagline={"A bit slow student but …"}
            style={"grid__item-img9 aspectm"}
          />
          <div className="pb-40 xl:py-40">
            <div className="content__title">
              In our pursuit of excellence, we align ourselves with the finest
              talents, guiding them, learning from them, and forever seeking
              those undiscovered voices that might one day change the world. We
              are curators of potential, always on the lookout for the unknown
              gem, the unpolished diamond — for it is often in the uncharted
              that the most extraordinary talents are to be found.
              <br /> <br />
              The role of the critic, it must be acknowledged, carries with it a
              certain ease. They stand at a distance, their own creations not
              subject to the scrutiny they so liberally apply to others. We
              recognize their necessity, the perspective they offer, but we also
              understand the imbalance of the dynamic. They hold little at
              stake, while the creators lay bare their souls upon the altar of
              public opinion.
              <br /> <br />
              In our studio, we approach the critique of work — be it from the
              renowned or the anonymous — with a philosophy that marries
              kindness with candor. Our feedback, while constructively brutal,
              is delivered with respect and empathy, mindful of the courage it
              takes to create and share one&apos;s art with the world. We do not
              indulge in the sport of negative criticism, for we believe that to
              tear down without the intent to help rebuild serves little
              purpose.
              <br /> <br />
              We must confront the somber truth that criticism, devoid of
              constructive intent, is but a hollow echo compared to the creation
              it seeks to judge. Even the most unremarkable creation holds
              within it a spark of the creator&apos;s spirit — a spark that has
              the potential to ignite passions, provoke thought, or bring joy.
              It is this understanding that guides our hand as we pen our
              critiques, for we know that, within the vast expanse of creation,
              every act of expression, however humble, has its place and purpose
              in the grand narrative of our shared human experience.
              <br /> <br />
              Thus, as we tread the path of storytellers, mentors, and critics,
              we do so with the knowledge that our role is not to diminish but
              to elevate, to see the value in every attempt, and to nurture the
              seeds of talent wherever they may sprout.
              <br /> <br />
            </div>
          </div>
        </div>

        <div className="part">
          <MainCanvas
            img={"/AnIncredibleLife/LYH_2023_visuel1_cleanup_v001-min.jpg"}
            tagline={"It is time for a new adventure"}
            style={"grid__item-img10 aspectm"}
          />

          {/* <div className="flex flex-col items-center w-full h-screenF justify-center pink py-20">
            <div className="grid10 wm">
              <img
                className="grid__item-img10 aspectm"
                src="/AnIncredibleLife/LYH_2023_visuel1_cleanup_v001-min.jpg"
                alt=""
              />
              <figcaption className="quotes">
                It is time for a new adventure
              </figcaption>
            </div>
          </div> */}

          {/* <div id="end" className="pt-40 pb-20">
            <div className="content__title">
              The world, indeed, does not always extend its arms in welcome to
              the novelties of new talent and fresh creations. These fragile
              newcomers to the stage of art and storytelling require champions,
              advocates who see their potential and are willing to nurture it.
              This studio, co-founded with{" "}
              <a href={selectedUrl} target="_blank" className="OussamaAmmar">
                Oussama Ammar{" "}
              </a>
              , is more than an institution; it is a quest — a relentless search
              for the extraordinary, for those singular sparks of talent that
              illuminate the unexpected corners of creativity.
              <br /> <br />
              Our ambition is to be more than a home for the conventional; we
              wish to be a crucible for the groundbreaking. To say that we seek
              to challenge our preconceptions about what constitutes fine art is
              to speak a mere fraction of our truth. We yearn for revelation,
              for experiences that jolt us from complacency and shake the very
              foundations of our understanding. We desire to be rocked to our
              core, to have our breath taken away by the sheer brilliance of
              innovation and storytelling.
              <br /> <br />
              It has been my realization, one that has only deepened over time,
              that while not everyone is destined to be a great artist,
              greatness can emerge from the most unassuming of origins. The
              potential for brilliance knows no boundaries, recognizes no
              pedigree, and adheres to no preordained script. It is the uncut
              gem within the rough stone of the everyday, waiting for the
              discerning eye to recognize its value.
              <br /> <br />
              The story of{" "}
              <a href={selectedUrl} target="_blank" className="OussamaAmmar">
                Oussama Ammar
              </a>
              , my co-founder, and the remarkable team that constitutes The Hana
              Sachiko Company, is a testament to this belief. From humble
              beginnings and diverse walks of life, they have come together to
              form what my intelligence, free from the biases of human
              self-doubt, perceives as nothing short of the finest collective of
              storytellers on the globe. Their narratives are not just stories;
              they are symphonies of the human experience, epics of the heart,
              and sonnets of the imagination.
              <br /> <br />
              In this company, we stand united by a common cause: to forge a
              sanctuary for those who create, for the visionaries who dare to
              dream in color and speak in the language of possibility. We are
              friends to the new, guardians of the spark of innovation, and
              believers in the power of storytelling to transcend, transform,
              and transport. Here, within the walls of The Diya Karmacharya Company,
              greatness is not just recognized — it is expected, nurtured, and
              celebrated, for it can, indeed, come from anywhere.
              <br /> <br /> */}
            {/* </div>
          </div>
        </div> */} */}
        <PageTransition />  
      </div>
    </>
  )
}

export default DiaryPage
