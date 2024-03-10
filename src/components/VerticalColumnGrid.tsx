import { Col, Row } from "antd"
import React, { ReactNode } from "react"

export interface VerticalColumnGridProp {
  content: { key: string; element: ReactNode }[]
  columnCount: number
  footer: ReactNode
}

export function VerticalColumnGrid(prop: VerticalColumnGridProp) {
  let { content, columnCount, footer } = prop

  let lineCount = Math.ceil(content.length / columnCount)

  return (
    <>
      <Row
        className="vertical-column-grid"
        style={{ maxHeight: `${3 * lineCount}ex` }}
      >
        {content.map(({ key, element }) => (
          <Col key={key} span={Math.floor(24 / columnCount)}>
            {element}
          </Col>
        ))}
      </Row>
      <div>{footer}</div>
    </>
  )
}
