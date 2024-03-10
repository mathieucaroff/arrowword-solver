import { Button, Input, Select, Upload } from "antd"
import React, { Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"

const dictionnaryTextGetterSet: Record<string, () => Promise<string>> = {
  "english (10 k-words)": () =>
    import("bundle-text:../../asset/dictionnary/english.list.txt"),
  "espagñol (1 k-palabras)": () =>
    import("bundle-text:../../asset/dictionnary/espagnol.list.txt"),
  "français (336 k-mots)": () =>
    import("bundle-text:../../asset/dictionnary/francais.336K.list.txt"),
  "deutsche (10 k-worter)": () =>
    import("bundle-text:../../asset/dictionnary/deutsche.list.txt"),
  "français scrabble 2012 (386 k-mots)": () =>
    import(
      "bundle-text:../../asset/dictionnary/francais.scrabble2012.386K.list.txt"
    ),
  "français réduit (21 k-mots)": () =>
    import("bundle-text:../../asset/dictionnary/francais.21K.list.txt"),
}

export interface DictionnarySetterProp {
  dictionnary: string[]
  setDictionnary: Dispatch<SetStateAction<string[]>>
}

export function DictionnarySetter(prop: DictionnarySetterProp) {
  let { dictionnary, setDictionnary } = prop
  let { t } = useTranslation()

  let [loading, setLoading] = useState(false)
  let [dictionnaryLanguage, setDictionnaryLanguage] = useState("other")

  const handleDictionnaryLanguageChange = async (value: string) => {
    setDictionnaryLanguage(value)
    let name = value.toLowerCase()
    const dictionnaryTextGetter =
      dictionnaryTextGetterSet[name] ?? (async () => dictionnary.join("\n"))

    setLoading(true)
    let dictionnaryText = await dictionnaryTextGetter()
    setDictionnary(() => {
      setLoading(false)
      return dictionnaryText.split("\n")
    })
  }

  return (
    <>
      <div>{t("Word list")}</div>
      <div>
        <Select<string>
          onChange={handleDictionnaryLanguageChange}
          value={dictionnaryLanguage}
          loading={loading}
          disabled={loading}
          style={{ width: "50%" }}
          options={[
            { value: "other", label: t("other") },
            { value: "English (10 K-words)" },
            { value: "Espagñol (1 K-palabras)" },
            { value: "Français (336 K-mots)" },
            { value: "Deutsche (10 K-Worter)" },
            { value: "Français réduit (21 K-mots)" },
            { value: "Français scrabble 2012 (386 K-mots)" },
          ]}
        />
        <Upload
          beforeUpload={(file) => {
            var reader = new FileReader()
            reader.readAsText(file, "utf-8")
            setLoading(true)
            reader.onload = (onloadEvent) => {
              setDictionnary((onloadEvent.target!.result as string).split("\n"))
              setLoading(false)
            }
            return false
          }}
        >
          <Button>{t("Select a file")}</Button>
        </Upload>
      </div>
      <div>
        <Input.TextArea
          rows={4}
          onChange={(ev) => {
            setDictionnary(ev.currentTarget.value.split("\n"))
            setDictionnaryLanguage("other")
          }}
          value={dictionnary.join("\n")}
          disabled={loading}
        />
      </div>
    </>
  )
}
