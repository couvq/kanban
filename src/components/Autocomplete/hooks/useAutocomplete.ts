import { useState, type ChangeEvent } from "react";

const useAutocomplete = (
  suggestions: string[],
  threshold: number
): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  string[],
  boolean,
  (value: string) => void,
  (value: string, e: KeyboardEvent) => void
] => {
  const [searchText, setSearchText] = useState("");
  const [hasSelected, setHasSelected] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setHasSelected(false);
    setSearchText(e.target.value);
  };

  const handleSelect = (value: string) => {
    setHasSelected(true);
    setSearchText(value);
  };

  const handleKeyboardSelect = (value: string, e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setHasSelected(true);
      setSearchText(value);
    }
  };

  const search = () => {
    if (searchText.length >= threshold) {
      return suggestions.filter((value) =>
        value.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return [];
  };

  const results = search();

  return [searchText, handleInput, results, hasSelected, handleSelect, handleKeyboardSelect];
};

export default useAutocomplete;
