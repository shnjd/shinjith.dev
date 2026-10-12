import { Metadata } from "next";
import Listing, { ListingItem } from "@/components/layouts/Listing";

export const metadata: Metadata = {
  title: "Page not found | Shinjith P R",
};

export default function NotFound() {
  return (
    <Listing>
      <h1>Page not found</h1>
      <p>
        There is nothing at this address. It may have moved, or the link may
        have a typo. Try one of these instead:
      </p>
      <ul>
        <ListingItem href="/" title="Home" />
        <ListingItem href="/notes" title="Notes" />
        <ListingItem href="/wiki" title="Wiki" />
        <ListingItem href="/projects" title="Projects" />
      </ul>
    </Listing>
  );
}
