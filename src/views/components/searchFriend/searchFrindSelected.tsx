import React from "react";

interface SearchFriendSelectedProps {
  selected?: string[];
}

export default function SearchFriendSelected({
  selected = [],
}: SearchFriendSelectedProps) {
  return (
    <ul id="search-friend-selected">
      {selected.map((friend) => (
        <li key={friend}>{friend}</li>
      ))}
    </ul>
  );
}
