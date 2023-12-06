import React from "react";
import Input from "../input";
import SearchFriendSuggestions from "./searchFriendSuggestions";
interface SearchFriendInputProps {
  friends?: string;
}

export default function SearchFriend({ friends = "" }: SearchFriendInputProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        name="friend"
        label="Friends"
        defaultValue={friends}
        hx-post="/search-friend"
        hx-trigger="input changed delay:300ms, friend"
        hx-target="#search-friend-suggestions"
        hx-swap="outerHTML"
      />

      <SearchFriendSuggestions />
    </div>
  );
}
