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
        {results.map((character, index) => (
          <div key={index}>
            <h4>{character.uid}</h4>
            <p>{character.name}</p>
            <p>{character.gender}</p>
            <p>{character.birthYear}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
