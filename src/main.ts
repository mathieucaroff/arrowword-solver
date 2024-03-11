import { createElement } from "react"
import { createRoot } from "react-dom/client"

import * as packageInfo from "../package.json"
import { githubCornerHTML } from "./lib/githubCorner"
import { createStyleSheet } from "./lib/styleSheet"
import { ensureSpacelessURL } from "./lib/urlParameter"
import { App } from "./app"
import { getConfig } from "./config"
import { i18n } from "./i18n"
import "./style.css"

async function main() {
  ensureSpacelessURL(location)

  let cornerDiv = document.createElement("div")
  cornerDiv.innerHTML = githubCornerHTML(
    packageInfo.repository.url,
    packageInfo.version,
  )
  document.body.appendChild(cornerDiv)

  let config = getConfig(location)
  console.log(config)

  let styleSheet = createStyleSheet(document)
  styleSheet.insertRule(":root {}")

  let root = createRoot(document.getElementById("root")!)
  const renderApp = () => {
    root.render(createElement(App, { config, styleSheet }))
  }

  i18n.changeLanguage(config.language || "en")
  window.addEventListener("hashchange", () => {
    console.log("hashchange")
    config = getConfig(location)
    i18n.changeLanguage(config.language || "en")
    renderApp()
  })
  renderApp()
}

main()
