import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Character {
  uid: string;
  name: string;
  gender: string;
  birthYear: number;
}

const Details = (): JSX.Element => {
  const { uid } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const frontpage = queryParams.get('frontpage');

  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (uid) {
      fetch(`https://stapi.co/api/v1/rest/character/${uid}`)
        .then((res) => res.json())
        .then((data) => setCharacter(data));
    }
  }, [uid]);
  if (!character) {
    return <p>Loading character details...</p>;
  }

  return (
    <div>
      <h3>Details for {character.name}</h3>
      <p>UID: {character.uid}</p>
      <p>Gender: {character.gender}</p>
      <p>Birth Year: {character.birthYear}</p>
      <p>Currently viewing page: {frontpage}</p>
    </div>
  );
};

export default Details;
