interface Character {
  uid: string;
  name: string;
  gender: string;
  birthYear: number;
}

interface ResultsProps {
  results: Character[];
}

const Results = ({ results }: ResultsProps): JSX.Element => {
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
            <th>Character Birth Year</th>
          </tr>
        </thead>
        <tbody>
          {results.map((character) => (
            <tr key={character.uid}>
              <td>{character.uid}</td>
              <td>{character.name}</td>
              <td>{character.gender}</td>
              <td>{character.birthYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
