import { useLocation } from 'react-router-dom';

const Details = (): JSX.Element => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const frontpage = queryParams.get('frontpage');
  const details = queryParams.get('details');
  return (
    <div>
      {details === '1' && (
        <div>
          <h3>Details for selected character</h3>
          <p>Currently on page: {frontpage}</p>
        </div>
      )}
    </div>
  );
};

export default Details;
