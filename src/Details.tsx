import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Character {
  uid: string;
  name: string;
  gender: string;
  birthYear: number;
}

const Details = (): JSX.Element => {
  const { uid } = useParams<{ uid: string }>(); // Получаем uid из URL

  const [character, setCharacter] = useState<Character | null>(null); // Стейт для данных персонажа
  const [isLoading, setIsLoading] = useState<boolean>(true); // Индикатор загрузки
  const [error, setError] = useState<string | null>(null); // Стейт для ошибок

  useEffect(() => {
    if (!uid) return; // Если uid не задан, не делаем запрос

    setIsLoading(true);
    setError(null);

    const apiUrl = `https://stapi.co/api/v1/rest/character/search?uid=${uid}`;
    console.log(`Fetching character details from: ${uid}`);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching character: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('API response:', data);

        if (!data.characters || data.characters.length === 0) {
          throw new Error('Character not found');
        }

        const characterData = data.characters.find(
          (character: Character) => character.uid === uid
        );

        // Проверяем, что данные существуют перед установкой
        if (characterData) {
          setCharacter({
            uid: characterData.uid,
            name: characterData.name || 'Unknown',
            gender: characterData.gender || 'Unknown', // Если нет значения, ставим 'Unknown'
            birthYear: characterData.birthYear || 'Unknown', // Если нет значения, ставим 'Unknown'
          });
        } else {
          setError('Character not found');
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error in Details.tsx:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [uid]); // Зависимость от UID, чтобы перезапускать запрос при изменении

  if (isLoading) {
    return <p>Loading character details...</p>; // Индикатор загрузки
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>; // Показываем ошибку, если есть
  }

  if (!character) {
    return <p>No character details found.</p>; // Если данные не найдены
  }

  // Теперь character точно не null, можем безопасно обращаться к его свойствам
  return (
    <div>
      <h3>Name: {character.name}</h3>
      <p>UID: {character.uid}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
};

export default Details;
