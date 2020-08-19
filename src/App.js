import React, { useState, useRef, useCallback } from "react";
import useUserSearch from "./useUserSearch";
import UserCard from "./userCard";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setPageNumber(1);
  };

  const { loading, error, users } = useUserSearch(query, pageNumber);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (el) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (el) observer.current.observe(el);
    },
    [loading]
  );

  return (
    <div className="App">
      <h2>React infinite scrolling example</h2>
      <p>In this project I use <a href="https://randomuser.me/" target="_blank">https://randomuser.me/</a> api. Please refer the document.</p>
      <input type="search" onChange={handleSearch} value={query} placeholder="Seed as Search query" />

      {users.map((user, index) => {
        if (users.length === index + 1) {
          return <div key={user.id} ref={lastUserElementRef}><UserCard name={user.name} email={user.email} cell={user.cell} thumbnail={user.thumbnail} /></div>;
        } else {
          return <div key={user.id}><UserCard name={user.name} email={user.email} cell={user.cell} thumbnail={user.thumbnail} /></div>;
        }
      })}
      <div>{loading && `Loading...`}</div>
      <div>{error && `Error`}</div>
    </div>
  );
}

export default App;
