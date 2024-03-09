import { Button, Input, Select, Upload } from "antd"
import React, { Dispatch, SetStateAction, useState } from "react"

export interface DictionnarySetterProp {
  dictionnary: string[]
  setDictionnary: Dispatch<SetStateAction<string[]>>
}

export function DictionnarySetter(prop: DictionnarySetterProp) {
  let { dictionnary, setDictionnary } = prop

  let [loading, setLoading] = useState(false)
  let [dictionnaryLanguage, setDictionnaryLanguage] = useState("other")

  const handleDictionnaryLanguageChange = async (value: string) => {
    setDictionnaryLanguage(value)
    let name = value.toLowerCase()
    const dictionnaryTextGetter =
      {
        english: () =>
          import("bundle-text:../../asset/dictionnary/english.list.txt"),
        espagñol: () =>
          import("bundle-text:../../asset/dictionnary/espagnol.list.txt"),
        français: () =>
          import("bundle-text:../../asset/dictionnary/francais.list.txt"),
        deutsche: () =>
          import("bundle-text:../../asset/dictionnary/deutsche.list.txt"),
      }[name] ?? (async () => dictionnary.join("\n"))

    setLoading(true)
    let dictionnaryText = await dictionnaryTextGetter()
    setDictionnary(() => {
      setLoading(false)
      return dictionnaryText.split("\n")
    })
  }

  return (
    <>
      <div>Word list</div>
      <div>
        <Select<string>
          onChange={handleDictionnaryLanguageChange}
          value={dictionnaryLanguage}
          loading={loading}
          style={{ width: "50%" }}
          options={[
            { value: "other" },
            { value: "English" },
            { value: "Espagñol" },
            { value: "Français" },
            { value: "Deutsche" },
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
          <Button>Select a file</Button>
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
