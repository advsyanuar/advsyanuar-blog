
// Generated using Claude, not because i'm lazy but i got no time dude. Give me a break 8)
// ----------------------------------------------------------
// 5x7 bitmap font (1 = pixel on, 0 = pixel off), row-major.
// Each glyph is 5 columns wide, 7 rows tall. Two glyphs side
// by side (5+5) fill a 10-column matrix.
// ----------------------------------------------------------
const FONT: Record<string, string[]> = {
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  r: ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
  e: ["00000", "00000", "01110", "10001", "11111", "10000", "01111"],
  b: ["10000", "10000", "11110", "10001", "10001", "10001", "11110"],
};

function buildGrid(word: string): string[] {
  const [c1, c2] = word.split("");
  const g1 = FONT[c1] ?? Array(7).fill("00000");
  const g2 = FONT[c2] ?? Array(7).fill("00000");
  const grid: string[] = [];
  for (let row = 0; row < 7; row++) {
    grid.push(g1[row] + g2[row]); // 5 + 5 = 10 columns
  }
  return grid;
}

/**
 * DotMatrix — a reusable 10x7 pulsing dot matrix display.
 *
 * Props:
 *   text        (string)  two-character string, e.g. "Pr". Required.
 *   color       (string)  any CSS color. Default "#ff3b30".
 *   offColor    (string)  color of unlit pixels. Default "#1a1a1a".
 *   pixelSize   (number)  pixel size in px. Default 14.
 *   gap         (number)  gap between pixels in px. Default 3.
 *   delay       (number)  animation-delay in seconds, useful for
 *                         staggering multiple matrices. Default 0.
 *   showLabel   (boolean) show the text label under the matrix. Default true.
 */
export default function DotMatrix({
  text = "Pr",
  color = "#ff3b30",
  offColor = "#1a1a1a",
  pixelSize = 14,
  gap = 3,
  delay = 0,
  showLabel = true,
}) {
  const grid = buildGrid(text);

  const style = {
    "--dot-color": color,
    "--dot-off": offColor,
    "--pixel-size": `${pixelSize}px`,
    "--pixel-gap": `${gap}px`,
    "--pulse-delay": `${delay}s`,
  };

  return (
    <div
      style={{
        ...style,
        background: "#050505",
        border: "0",
        borderRadius: "0px",
        padding: "16px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(10, var(--pixel-size))`,
          gridTemplateRows: `repeat(7, var(--pixel-size))`,
          gap: "var(--pixel-gap)",
        }}
      >
        {grid.flatMap((row, r) =>
          row.split("").map((cell, c) => {
            const on = cell === "1";
            return (
              <div
                key={`${r}-${c}`}
                style={{
                  width: "var(--pixel-size)",
                  height: "var(--pixel-size)",
                  borderRadius: "1px", // square-ish with soft corners; use 0 for hard square
                  background: on ? "var(--dot-color)" : "var(--dot-off)",
                  boxShadow: on
                    ? "0 0 6px var(--dot-color), 0 0 12px var(--dot-color)"
                    : "none",
                  animation: on
                    ? "dot-matrix-pulse 2.2s ease-in-out infinite"
                    : "none",
                  animationDelay: "var(--pulse-delay)",
                  transition: "background 0.15s linear",
                }}
              />
            );
          })
        )}
      </div>

      {showLabel && (
        <div
          style={{
            color: "#555",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {text}
        </div>
      )}

      <style>{`
        @keyframes dot-matrix-pulse {
          0%, 100% {
            opacity: 0.35;
            box-shadow: 0 0 3px var(--dot-color), 0 0 6px var(--dot-color);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 8px var(--dot-color), 0 0 18px var(--dot-color);
          }
        }
      `}</style>
    </div>
  );
}