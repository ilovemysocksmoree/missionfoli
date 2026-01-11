import React, {useEffect, useRef, useState} from "react"
import {History as HistoryInterface} from "../../interfaces/history"
import {Ps1} from "../ps1"
import {Message} from "ai/react"

type JSONValue =
  | string
  | number
  | boolean
  | {[x: string]: JSONValue}
  | Array<JSONValue>

interface HistoryItem extends HistoryInterface {
  type: "history"
}

interface MessageItem extends Message {
  type: "message"
  date: Date | undefined
}

type MixedHistoryItem = HistoryItem | MessageItem

interface Props {
  history: Array<HistoryInterface>
  messages: Array<Message>
}

export const History: React.FC<Props> = ({history, messages}) => {

  const mixedHistory: Array<MixedHistoryItem> = [
    ...history.map((h) => ({...h, type: "history" as const})),
    ...messages.map((m) => ({
      ...m,
      type: "message" as const,
      date: m.createdAt,
    })),
  ]

  mixedHistory.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  const typingEffect = (text: string, element: HTMLElement) => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
      } else {
        clearInterval(interval)
      }
    }, 5)
  }

  const animPlayed = useRef(false)
  useEffect(() => {
    history.forEach((item) => {
      if (item.command === "neofetch" && !animPlayed.current) {
        setTimeout(() => {
          const lyraElements = document.querySelectorAll(".lyrart")

          lyraElements.forEach((element, index) => {
            typingEffect(element.textContent || "", element as HTMLElement)
            element.textContent = ""

            if (index === lyraElements.length - 1) {
              setTimeout(
                () => {
                  animPlayed.current = true
                },
                (element.textContent?.length || 0) * 5,
              )
            }
          })
        }, 800)
      }
    })
  }, [history])

  return (
    <>
      {mixedHistory.map((item, index) => (
        <div key={index}>
          {item.type === "history" ? (
            <>
              <Ps1 />
              <div className="inline">{item.command}</div>
              <p
                className="whitespace-pre-wrap mb-2"
                style={{lineHeight: "normal"}}
                dangerouslySetInnerHTML={{__html: item.output}}
              />
            </>
          ) : (
            <div className="pb-2">
              {item.role === "assistant" ? (
                <p className="response pb-1">Diya Karmacharya - </p>
              ) : (
                <Ps1 />
              )}
              {item.role === "assistant"
                ? item.content.split("\n").map((line, lineIndex) => (
                    <p className="response py-1" key={lineIndex}>
                      {line}
                    </p>
                  ))
                : item.content.split("\n").map((line, lineIndex) => (
                    <p className="lyra inline" key={lineIndex}>
                      {line}
                    </p>
                  ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default History
