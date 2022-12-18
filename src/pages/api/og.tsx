import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
        
      >
        <p tw="text-blue-600">
          LN
        </p>
      </div>
    ),
    {
      width: 300,
      height: 300
    }
  );
}
