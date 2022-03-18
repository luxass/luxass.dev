import { useMediaQuery } from "@hooks/use-mediaquery";

export default function Home() {
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  return <section></section>;
}
