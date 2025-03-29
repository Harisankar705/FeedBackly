import { Link } from "wouter";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/">
              <span className="text-sm text-neutral hover:text-darktext cursor-pointer">
                Home
              </span>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/about">
              <span className="text-sm text-neutral hover:text-darktext cursor-pointer">
                About
              </span>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/contact">
              <span className="text-sm text-neutral hover:text-darktext cursor-pointer">
                Contact
              </span>
            </Link>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-sm text-neutral hover:text-darktext">
              Privacy Policy
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-sm text-neutral hover:text-darktext">
              Terms of Service
            </a>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-neutral hover:text-darktext">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-neutral hover:text-darktext">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="text-neutral hover:text-darktext">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-sm text-neutral">&copy; 2023 FeedBackly. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;