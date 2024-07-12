import { useEffect, useRef } from "react"
import { toDecimal } from "../../utils/conversions"
import RuleViz from "../ruleViz/ruleViz"
import "./styles.css"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const numGenerations = 5_000
  const drawWidth = 10
  // const cells = generateInitialCells(100)
  const cells = Array(101).fill(0)
  cells[50] = 1
  const neighborhoodSize = 3
  const rule = generateRule(neighborhoodSize)

  useEffect(() => {
    runGenerations(
      cells,
      rule,
      numGenerations,
      neighborhoodSize,
      drawWidth,
      canvasRef.current!
    )
  }, [])

  return (
    <div className="mainContainer">
      <div className="canvasContainer">
        <canvas
          ref={canvasRef}
          id="caCanvas"
          width={cells.length * drawWidth}
          height={numGenerations * drawWidth}
        ></canvas>
      </div>
      <RuleViz
        rule={rule}
        colorMap={{ "0": "black", "1": "green" }}
        neighborhoodSize={neighborhoodSize}
      />
    </div>
  )
}

function generateInitialCells(numCells: number): number[] {
  const cells = []
  for (let i = 0; i < numCells; i++) {
    cells.push(Math.round(Math.random()))
  }
  return cells
}

function drawCell(
  cells: number[],
  index: number,
  row: number,
  width: number,
  canvasCtx: HTMLCanvasElement
) {
  const x = index * width
  const y = row * width
  const context = canvasCtx.getContext("2d")!
  context.fillStyle = cells[index] === 1 ? "green" : "black"
  context.fillRect(x, y, width, width)
}

function drawRow(
  cells: number[],
  row: number,
  width: number,
  ctx: HTMLCanvasElement
) {
  for (let i = 0; i < cells.length; i++) {
    drawCell(cells, i, row, width, ctx)
  }
}

function runGenerations(
  initCells: number[],
  rule: number[],
  generations: number,
  neighborhoodSize: number,
  drawWidth: number,
  ctx: HTMLCanvasElement
) {
  let nextCells = initCells
  drawRow(initCells, 0, drawWidth, ctx)
  for (let i = 1; i < generations; i++) {
    nextCells = computeNextGeneration(nextCells, rule, neighborhoodSize)
    drawRow(nextCells, i, drawWidth, ctx)
  }
}

function computeNextGeneration(
  cells: number[],
  rule: number[],
  neighborhoodSize: number
): number[] {
  const nextCells = []
  const endCapSize = Math.floor(neighborhoodSize / 2)
  for (let i = 0; i < cells.length; i++) {
    // Create a wrap-around neighborhood
    const neighborhood = []
    for (let j = -endCapSize; j <= endCapSize; j++) {
      let neighborIndex = i + j
      // Wrap around if the index is out of bounds
      if (neighborIndex < 0) {
        neighborIndex += cells.length
      } else if (neighborIndex >= cells.length) {
        neighborIndex -= cells.length
      }
      neighborhood.push(cells[neighborIndex])
    }
    const neighborhoodDecimal = toDecimal(neighborhood)
    nextCells[i] = rule[neighborhoodDecimal]
  }
  return nextCells
}

function generateRule(neighborhoodSize: number): number[] {
  const possibleRules = Math.pow(2, neighborhoodSize)
  const rule = []
  for (let i = 0; i < possibleRules; i++) {
    rule.push(Math.round(Math.random()))
  }

  return rule
}
