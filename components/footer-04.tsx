import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Maps from "@/components/ui/maps";
import {
  DribbbleIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { title: "Home", href: "" },
  { title: "Store", href: "" },
  { title: "ExportQueries", href: "" },
  { title: "Careers", href: "" },
  { title: "Help", href: "" },
  { title: "Privacy", href: "" },
];

const Footer04Page = () => {
  return (
    <div className=" bg-[var(--nav-color)] flex flex-col">
      <div className="grow bg-muted" />
      <footer className="border-t">
        <div className="max-w-(--breakpoint-xl) mx-auto">
          <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
            <div>
              <a href="/" className="mx-auto sm:mx-0 flex justify-center lg:justify-start">
                <img
                  className="h-13 w-25"
                  src="images/khurshid fans logo.png"
                  alt="Khurshid Fans Logo"
                />
              </a>

              <div className="mt-9">
                <ul className="flex items-center gap-5 flex-wrap justify-center lg:justify-start">
                  {footerLinks.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="text-white hover:text-[var(--gold-btn-color)] active:text-[var(--gold-btn-color)] nav-links transition-colors"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Maps />
            {/* <div className="max-w-xs w-full ">
              <h5 className="font-bold text-white text-xl ">Stay up to date</h5>
              <form className="mt-6  flex items-center gap-2 text-white">
                <Input type="email" placeholder="Enter your email" />
                <Button className="cursor-pointer" variant="cta">Subscribe</Button>
              </form>
            </div> */}
          </div>

          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-3 gap-y-5 px-6 xl:px-0">
            <span className="text-white">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Khurshid Fans
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-white ">
              <Link href="#" target="_blank">
                <TwitterIcon className="h-5 w-5 hover:text-[var(--gold-btn-color)]" />
              </Link>
              <Link href="#" target="_blank">
                <InstagramIcon className="h-5 w-5 hover:text-[var(--gold-btn-color)]" />
              </Link>
              <Link href="#" target="_blank">
                <YoutubeIcon className="h-5 w-5 hover:text-[var(--gold-btn-color)]" />
              </Link>
              <Link href="#" target="_blank">
                <FacebookIcon className="h-5 w-5 hover:text-[var(--gold-btn-color)]" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer04Page;
