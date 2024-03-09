import { createElement } from "react"
import { createRoot } from "react-dom/client"

import * as packageInfo from "../package.json"
import { githubCornerHTML } from "./lib/githubCorner"
import { createStyleSheet } from "./lib/styleSheet"
import { ensureSpacelessURL, resolveSearch } from "./lib/urlParameter"

import { App } from "./app"
import { TypistConfig } from "./type"
import "./style.css"

function getConfig(location: Location) {
  let config = resolveSearch<TypistConfig>(location, {
    dark: () => false,
    keyboardColor: () => "",
  })
  return config
}

async function main() {
  ensureSpacelessURL(location)

  let cornerDiv = document.createElement("div")
  cornerDiv.innerHTML = githubCornerHTML(
    packageInfo.repository.url,
    packageInfo.version
  )
  document.body.appendChild(cornerDiv)

  let config = getConfig(location)
  console.log(config)

  let styleSheet = createStyleSheet(document)
  styleSheet.insertRule(":root {}")
  let root = createRoot(document.getElementById("root")!)
  root.render(createElement(App, { config, styleSheet }))
}

main()
