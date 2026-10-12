"use client";

import Listing, { ListingItem } from "@/components/layouts/Listing";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Listing>
      <h1>Something went wrong</h1>
      <p>
        This page failed to load. Something broke on my end, not yours. Try
        again, or head back home.
      </p>
      <p>
        <button
          type="button"
          onClick={reset}
          className="text-fg underline underline-offset-4"
        >
          Try again
        </button>
      </p>
      <ul>
        <ListingItem href="/" title="Home" />
      </ul>
    </Listing>
  );
}
