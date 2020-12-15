import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0);
  border: none;
  border-bottom: 2px solid black;
  padding: 5px;
  font-size: 1em;
`;

const StyledButton = styled.button`
  font-size: 1em;
  color: none;
  padding: 0.3em 1em;
  border-radius: 5px;
  margin-left: 15px;
  background: rgba(255, 255, 255, 1);
  border: thin solid black;
`;

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/search/" + searchQuery);
      }}
    >
      <StyledInput
        required
        type="text"
        name="movieName"
        id=" movieName"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <StyledButton type="submit">Search</StyledButton>
    </StyledForm>
  );
}

export default Searchbar;
