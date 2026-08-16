import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffdf8",
          borderRadius: "50%",
          border: "2px solid #c1703f",
        }}
      >
        <span
          style={{
            fontSize: 26,
            color: "#c1703f",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          L&A
        </span>
      </div>
    ),
    { ...size },
  );
}
