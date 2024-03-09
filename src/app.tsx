import React, { useMemo, useState } from "react"
import { DictionnarySetter } from "./components/DictionnarySetter"
import { Col, Input, List, Row } from "antd"
import { PatternSetter } from "./components/PatternSetter"

export function App() {
  let [dictionnary, setDictionnary] = useState<string[]>(() => [])
  let [regex, setRegex] = useState(/^$/)
  let [patternErrorBag, setPatternErrorBag] = useState<Record<string, string>>(
    {},
  )
  let extract = useMemo(
    () => dictionnary.filter((word) => word.match(regex)),
    [dictionnary, regex],
  )

  let limitedExtract = extract.slice(0, 60)

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
      <Row>
        {limitedExtract.map((word) => (
          <Col span={6} key={word}>
            {word}
          </Col>
        ))}
        {extract.length > 60 ? (
          <Col span={24} style={{ textAlign: "center" }}>
            <div>...</div>
            <em>
              (Showing the {limitedExtract.length} first results off of a total
              of {extract.length})
            </em>
          </Col>
        ) : null}
      </Row>
    </>
  )
}
