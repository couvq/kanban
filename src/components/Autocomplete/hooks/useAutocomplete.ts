import { useMemo, useState, type ChangeEvent } from "react";
import useDebounce from "./useDebounce";

const useAutocomplete = (
  suggestions: string[],
  threshold: number
): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  string[],
  boolean,
  (value: string) => void,
  (value: string, e: KeyboardEvent) => void,
  () => void
] => {
  const [searchText, setSearchText] = useState("");
  const [hasSelected, setHasSelected] = useState(false);
  const debouncedSearchText = useDebounce<string>(searchText, 300);

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
    if (debouncedSearchText.length >= threshold) {
      return suggestions.filter((value) =>
        value.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
    }

    return [];
  };

  const close = () => setHasSelected(true)

  const results = useMemo<string[]>(() => search(), [debouncedSearchText])

  return [
    searchText,
    handleInput,
    results,
    hasSelected,
    handleSelect,
    handleKeyboardSelect,
    close
  ];
};

export default useAutocomplete;
