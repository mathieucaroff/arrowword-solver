import React, { ReactNode, useEffect, useMemo, useState } from "react"
import { DictionnarySetter } from "./components/DictionnarySetter"
import { Switch } from "antd"
import { PatternSetter } from "./components/PatternSetter"
import { VerticalColumnGrid } from "./components/VerticalColumnGrid"
import { useTranslation } from "react-i18next"
import { ArrowwordSolverConfig } from "./type"

export interface AppProps {
  config: ArrowwordSolverConfig
  styleSheet: CSSStyleSheet
}

export function App(props: AppProps) {
  let { config } = props

  // misc hooks
  let { t } = useTranslation()

  // state
  let [dictionnary, setDictionnary] = useState<string[]>(() => [])
  let [regex, setRegex] = useState(/^$/)
  let [patternErrorBag, setPatternErrorBag] = useState<Record<string, string>>(
    {},
  )
  let [upper, setUpper] = useState(false)

  // computed values
  let extract = useMemo(
    () => dictionnary.filter((word) => word.toLocaleLowerCase().match(regex)),
    [dictionnary, regex],
  )

  let limitedExtract = extract.slice(0, 60)

  let gridContent = limitedExtract.map((word) => ({
    key: word,
    element: upper ? word.toLocaleUpperCase() : (word as ReactNode),
  }))

  useEffect(() => {
    document.title = t("Arrowword solver")
  }, [config.language])

  return (
    <>
      <h1>{t("Arrowword solver")}</h1>
      <p>{t("Help solving arrowword puzzles.")}</p>
      <DictionnarySetter
        appLanguage={config.language}
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
