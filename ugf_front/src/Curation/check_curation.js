import { NavLink } from 'react-router-dom';

const CheckCuration = (props) => {
  const { check } = props;

  return (
    <>
      <div className='check_curation'>
        <div className='check_image'>
          {check.poster_url === null || check.poster_url === undefined ? (
            <img src='/images/none_img.jpg' />
          ) : (
            <img
              src={'https://image.tmdb.org/t/p/w500' + check.poster_url}
              width='200'
            />
          )}
        </div>
        <NavLink
          to={`/detail/${check.moviecode}`}
          key={check.moviecode}
          style={{ textDecoration: 'none' }}
        >
          <div className='check_title'>{check.title}</div>
        </NavLink>
      </div>
    </>
  );
};

export default CheckCuration;
