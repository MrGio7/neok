import React from "react";

interface SearchFriendResultsProps {
  results?: string[];
}

export default function SearchFriendResults({
  results = [],
}: SearchFriendResultsProps) {
  return (
    <ul id="search-friend-results" className="absolute">
      {results.map((result) => (
        <li key={result}>{result}</li>
      ))}
    </ul>
  );
}
