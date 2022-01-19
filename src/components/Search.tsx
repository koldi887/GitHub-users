import React, { useEffect, useState } from "react";

interface ISearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export const Search: React.FC<ISearchProps> = ({ search, setSearch }) => {
  const [tempSearch, setTempSearch] = useState<string>("");

  useEffect(() => {
    setTempSearch(search);
  }, [search]);

  return (
    <>
      <input
        value={tempSearch}
        type="text"
        placeholder={"search"}
        onChange={(e) => setTempSearch(e.target.value)}
      />
      <button onClick={() => setSearch(tempSearch)}>Find</button>
      <button onClick={() => setSearch("lukso")}>Reset</button>
    </>
  );
};
