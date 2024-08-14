import Link from "../base/Link";

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="container flex w-full flex-col-reverse items-center justify-between gap-4 py-4 sm:flex-row">
        <p className="text-center text-xs text-muted sm:text-sm">
          &copy; 2024, All rights reserved.
        </p>

        <ul className="flex items-center justify-center gap-6 text-sm text-subtle">
          <li>
            <Link
              href={"https://resume.shinjith.dev?download=true"}
              className="text-subtle"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link href={"https://notes.shinjith.dev"} className="text-subtle">
              Notes
            </Link>
          </li>
          <li>
            <Link className="text-subtle" href={"/projects"}>
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
