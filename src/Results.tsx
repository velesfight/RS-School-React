import React from 'react';

interface Character {
  uid: string;
  name: string;
  gender: string;
  birthYear: number;
}

interface ResultsProps {
  results: Character[];
}

class Results extends React.Component<ResultsProps> {
  render() {
    const { results } = this.props;
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
            {results.map((character, index) => (
              <tr key={index}>
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
  }
}

export default Results;
