import { Input } from "antd"
import React, { Dispatch, SetStateAction, useState } from "react"

export interface PatternSetterProp {
  patternErrorBag: Record<string, string>
  setPatternErrorBag: Dispatch<SetStateAction<Record<string, string>>>
  setRegex: Dispatch<SetStateAction<RegExp>>
}

export function PatternSetter(prop: PatternSetterProp) {
  let { patternErrorBag, setPatternErrorBag, setRegex } = prop

  return (
    <>
      <div>Pattern</div>
      <div>
        <Input
          onChange={(ev) => {
            let pattern = ev.currentTarget.value
            let error: undefined | string = undefined
            let hasCrashed = false
            try {
              let query = pattern
                .replace(/[?*]/g, ".")
                .replace(/\{\d+\}/g, ".$&")
              setRegex(new RegExp(`^${query}$`))
            } catch {
              hasCrashed = true
              error = "Invalid pattern"
            }
            setPatternErrorBag({
              ...patternErrorBag,
              regexError: error!, // If the value is undefined, then JS just removes the corresponding entry from the bag. This behaviour is desired and it is why the non-null assertion is safe here.
            })
          }}
        />
        {Object.entries(patternErrorBag).map(([key, message]) => (
          <span key={key}>{message}</span>
        ))}
      </div>
    </>
  )
}
