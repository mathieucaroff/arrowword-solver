import React, { ReactNode, useMemo, useState } from "react"
import { DictionnarySetter } from "./components/DictionnarySetter"
import { Col, Input, List, Row, Switch } from "antd"
import { PatternSetter } from "./components/PatternSetter"
import { VerticalColumnGrid } from "./components/VerticalColumnGrid"

export function App() {
  let [dictionnary, setDictionnary] = useState<string[]>(() => [])
  let [regex, setRegex] = useState(/^$/)
  let [patternErrorBag, setPatternErrorBag] = useState<Record<string, string>>(
    {},
  )
  let [upper, setUpper] = useState(false)
  let extract = useMemo(
    () => dictionnary.filter((word) => word.toLocaleLowerCase().match(regex)),
    [dictionnary, regex],
  )

  let limitedExtract = extract.slice(0, 60)

  let gridContent = limitedExtract.map((word) => ({
    key: word,
    element: upper ? word.toLocaleUpperCase() : (word as ReactNode),
  }))

  return (
    <>
      <DictionnarySetter
        dictionnary={dictionnary}
        setDictionnary={setDictionnary}
      />
      <PatternSetter
        patternErrorBag={patternErrorBag}
        setPatternErrorBag={setPatternErrorBag}
        setRegex={setRegex}
      />
      <Switch value={upper} onChange={(checked) => setUpper(checked)} />
      Uppercase
      <VerticalColumnGrid
        columnCount={4}
        content={gridContent}
        footer={
          extract.length > 60 ? (
            <div className="centerText">
              <div>...</div>
              <em>
                (Showing the {limitedExtract.length} first results off of a
                total of {extract.length})
              </em>
            </div>
          ) : null
        }
      />
    </>
  )
}
