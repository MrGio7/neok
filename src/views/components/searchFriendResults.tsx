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
        <li
          key={result}
          hx-on={`
            click:
              const input = this.closest('label').querySelector('input');
              const inputValues = input.value.split(',').map(v => v.trim());
              inputValues.pop();
              inputValues.push(this.textContent);
              input.value = inputValues.join(', ');
              this.closest('ul').style.display = 'none';
          `}
        >
          {result}
        </li>
      ))}
    </ul>
  );
}
