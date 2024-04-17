import Link from "next/link";
import WordMark from "./WordMark";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-6 px-16 py-5 border-t border-slate-600 md:flex-row">
      <Link href="/">
        <WordMark />
        <span className="sr-only">TuringLabs.ai Home Page</span>
      </Link>
    </footer>
  );
};

export default Footer;
