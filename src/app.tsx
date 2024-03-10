import React, { ReactNode, useMemo, useState } from "react"
import { DictionnarySetter } from "./components/DictionnarySetter"
import { Switch } from "antd"
import { PatternSetter } from "./components/PatternSetter"
import { VerticalColumnGrid } from "./components/VerticalColumnGrid"
import { useTranslation } from "react-i18next"

export function App() {
  let { t } = useTranslation()

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
      <h1>{t("Crossword")}</h1>
      <p>{t("Help solving arrow crosswords.")}</p>
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
      {t("Uppercase")}
      <VerticalColumnGrid
        columnCount={4}
        content={gridContent}
        footer={
          extract.length > 60 ? (
            <div className="centerText">
              <div>...</div>
              <em>
                {t(
                  "(Showing the {{count}} first results off of a total of {{total}})",
                  { count: limitedExtract.length, total: extract.length },
                )}
              </em>
            </div>
          ) : null
        }
      />
    </>
  )
}
