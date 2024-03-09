export type Key = string

export type Keyboard = {
  kind: KeyboardKind
  keyArray: Key[][]
}

export type KeyboardKind = "Basic" | "TypeMatrix"

export interface Position {
  x: number
  y: number
}

export interface TypistConfig {
  dark: boolean
  keyboardColor: string
}
