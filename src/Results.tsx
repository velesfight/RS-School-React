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
            <th>Character Uniq ID</th>
            <th>Character name </th>
            <th>Character gender </th>
          </tr>
        </thead>
        <tbody>
          {results.map((character) => (
            <tr key={character.uid} onClick={() => onClick(character)}>
              <td>{character.uid}</td>
              <td>{character.name}</td>
              <td>{character.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
