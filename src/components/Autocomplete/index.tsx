import useAutocomplete from "./hooks/useAutocomplete";
import "./Autocomplete.scss";
import { useRef } from "react";
import useClickOutside from "./hooks/useClickOutside";

type AutocompleteProps = {
  /** All possible values to search for. */
  suggestions: string[];
  /** The number of characters that need to be typed before filtering matching results, defaults to 0. */
  threshold?: number;
};

const Autocomplete = ({ suggestions, threshold = 0 }: AutocompleteProps) => {
  const [
    searchText,
    handleInput,
    results,
    hasSelected,
    handleSelect,
    handleKeyboardSelect,
    close,
  ] = useAutocomplete(suggestions, threshold);
  const menuRef = useRef()
  useClickOutside(menuRef, close)

  return (
    <div className="autocomplete">
      <input
        placeholder="Search..."
        value={searchText}
        onChange={handleInput}
      />
      {results.length > 0 && !hasSelected && (
        <ul className="dropdown" ref={menuRef}>
          {results.map((result) => (
            <li
              key={result}
              className="dropdown_item"
              onClick={() => handleSelect(result)}
              onKeyDown={(e) => handleKeyboardSelect(result, e)}
              tabIndex={0}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
