import React from "react";
import Input from "../input";
import SearchFriendResults from "./searchFriendResults";
import SearchFriendSelected from "./searchFrindSelected";

interface SearchFriendInputProps {}

export default function SearchFriend({}: SearchFriendInputProps) {
  return (
    <div className="relative">
      <SearchFriendSelected />

      <Input
        type="search"
        name="search-friend"
        hx-post="/search-friend"
        hx-trigger="input changed delay:300ms, search-friend"
        hx-target="#search-friend-results"
      />

      <SearchFriendResults />
    </div>
  );
}
