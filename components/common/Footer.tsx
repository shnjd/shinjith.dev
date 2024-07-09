import Link from "../base/Link";

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="mx-auto flex w-full max-w-9xl flex-col-reverse items-center justify-between gap-4 py-4 sm:flex-row">
        <p className="text-center text-xs text-muted sm:text-sm">
          &copy; 2024, All rights reserved.
        </p>

        <ul className="flex items-center justify-center gap-4 text-sm text-subtle">
          <li>
            <Link
              className="text-subtle hover:text-muted"
              href={"https://resume.shinjith.dev?download=true"}
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              className="text-subtle hover:text-muted"
              href={"https://notes.shinjith.dev"}
            >
              Notes
            </Link>
          </li>
          <li>
            <Link className="text-subtle hover:text-muted" href={"/projects"}>
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
