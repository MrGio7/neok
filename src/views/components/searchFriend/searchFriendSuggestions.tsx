import React from "react";

interface SearchFriendSuggestionsProps {
  results?: string[];
}

export default function SearchFriendSuggestions({
  results = [],
}: SearchFriendSuggestionsProps) {
  return (
    <ul
      id="search-friend-suggestions"
      className="absolute w-full bg-neutral-100"
    >
      {results.map((result) => (
        <li
          key={result}
          className="cursor-pointer"
          hx-on="click: 
            const closestDiv = this.closest('div');
            const input = closestDiv.querySelector('input');
            const ul = closestDiv.querySelector('ul');
            const currValue = input.value;
            const currValues = currValue.split(',').map((v) => v.trim());
            currValues.pop();
            currValues.push(this.innerText);
            input.value = currValues.join(', ');
            ul.style.display = 'none';
          "
        >
          {result}
        </li>
      ))}
    </ul>
  );
}
