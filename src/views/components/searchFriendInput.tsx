import React from "react";
import Input from "./input";
import SearchFriendResults from "./searchFriendResults";

interface SearchFriendInputProps {}

export default function SearchFriendInput({}: SearchFriendInputProps) {
  return (
    <label className="relative">
      <Input
        type="search"
        name="search-friend"
        hx-post="/search-friend"
        hx-trigger="input changed delay:300ms, search-friend"
        hx-target="#search-friend-results"
      />
      <SearchFriendResults />
    </label>
  );
}
