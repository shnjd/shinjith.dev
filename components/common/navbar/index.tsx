import Link from "next/link";
import ModeSwitch from "./ModeSwitch";

const Navbar = () => {
  return (
    <nav className="relative z-10">
      <div className="mx-auto flex w-full justify-between container p-5">
        <Link
          href="/"
          className={`text-lg text-secondary sm:text-xl  md:text-2xl`}
        >
          /shinjith-dev_
        </Link>

        <ul className="flex items-center gap-2">
          <li>
            <ModeSwitch />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
