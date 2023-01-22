/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge"
};

export default function () {
  return new ImageResponse(
    (
      <div tw="text-center items-center justify-center flex w-full h-full bg-white text-[128px]">
        <p tw="text-blue-600">LN</p>
      </div>
    ),
    {
      width: 300,
      height: 300
    }
  );
}
