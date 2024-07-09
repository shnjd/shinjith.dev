import Link from "../base/Link";

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="max-w-9xl mx-auto py-4 gap-4 flex sm:flex-row justify-between items-center w-full flex-col-reverse">
        <p className="text-muted text-center text-xs sm:text-sm">&copy; 2024, All rights reserved.</p>

        <ul className="flex gap-4 text-subtle items-center justify-center text-sm">
          <li>
            <Link className="text-subtle hover:text-muted" href={"https://resume.shinjith.dev?download=true"}>Resume</Link>
          </li>
          <li>
            <Link className="text-subtle hover:text-muted" href={"https://notes.shinjith.dev"}>Notes</Link>
          </li>
          <li>
            <Link className="text-subtle hover:text-muted" href={"/projects"}>Projects</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
