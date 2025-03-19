import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Headings() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      navigate(`/search/${trimmedInput}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div>
      <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-bold mt-8">
        RecipeHunt
      </h1>
      <p className="text-lg text-center text-zinc-500 my-4">
        Search for your favourite meal and get its delicious recipe.
      </p>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="search"
          id="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search recipe"
          className="outline-none border-2 border-zinc-500 rounded-lg p-3 my-8 max-w-md w-full"
        />
        <button
          className="text-white bg-black py-3 px-6 rounded-lg mx-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
