import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import "./styles.css"

type ColorStr = string
type CellValue = string

export default function RuleViz(props: {
  rule: number[]
  colorMap: Record<CellValue, ColorStr>
  neighborhoodSize: number
}) {
  const { colorMap, rule, neighborhoodSize } = props
  const values = Object.keys(colorMap)
  const binaryRule = rule.join("")
  const ruleNumber = parseInt(binaryRule, 2)

  return (
    <div className="ruleContainer">
      <h1>{`Rule ${ruleNumber}`}</h1>
      {rule.map((ruleOutput, ruleDecimal) => {
        const binaryRulePattern = ruleDecimal
          .toString(2)
          .padStart(neighborhoodSize, "0")
        return (
          <div key={ruleDecimal} className="ruleLine">
            <div className="rulePattern">
              {binaryRulePattern
                .split("")
                ?.map((x) => parseInt(x))
                .map((bit, i) => (
                  <div
                    key={i}
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      backgroundColor: colorMap[values[bit]],
                      outline: "1px solid white",
                    }}
                  ></div>
                ))}
            </div>
            <ArrowForwardIcon />
            <div
              className="ruleOutput"
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: colorMap[values[ruleOutput]],
              }}
            ></div>
          </div>
        )
      })}
    </div>
  )
}
