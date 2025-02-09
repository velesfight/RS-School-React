import React from 'react';

interface Character {
  uid: string;
  name: string;
  gender: string;
}

interface ResultsProps {
  results: Character[];
  onClick: (character: Character) => void;
}

const Results = ({ results, onClick }: ResultsProps): JSX.Element => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Character UID</th>
            <th>Character Name</th>
          </tr>
        </thead>
        <tbody>
          {results.map((character) => (
            <tr key={character.uid} onClick={() => onClick(character)}>
              <td>{character.uid}</td>
              <td>{character.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
