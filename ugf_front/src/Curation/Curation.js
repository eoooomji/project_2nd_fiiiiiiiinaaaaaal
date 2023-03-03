import axios from 'axios';
import { useEffect, useState } from 'react';
import { json, NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { baseUrl } from '../commonApi_tmdb/baseUrl';
import BasicCuration from './basic_curation';
import ChoiceCuration from './choice_curation';
import './Curation.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CheckCuration from './check_curation';

const Curation = () => {
  const [check, setCheck] = useState([]);

  const [user, setUser] = useState({
    ageGroup: '',
    gender: '',
  });
  // 전체 기준
  const [basicCuration, setBasicCuration] = useState({
    bestMovie: [{}],
    bestCast: {},
    bestDirector: {},
    bestGenre: {},
  });
  // 유저 기준(성별)
  const [choiceGender, setChoiceGender] = useState({
    curationMovie: [{}],
    curationGenre: {},
    curationDirector: {},
    curationCast: {},
  });
  // 유저 기준(연령)
  const [choiceAge, setChoiceAge] = useState({
    curationMovie: [{}],
    curationGenre: {},
    curationDirector: {},
    curationCast: {},
  });

  const data = new FormData();
  data.append('usercode', localStorage.getItem('usercode'));

  const getCuration = async () => {
    await axios
      .post(baseUrl + '/curation', data)
      .then((response) => {
        setUser({
          gender: response.data.user.gender,
          ageGroup: response.data.user.ageGroup,
        });

        setBasicCuration({
          bestCast: response.data.basic_curation.bestCast,
          bestDirector: response.data.basic_curation.bestDirector,
          bestGenre: response.data.basic_curation.bestGenre,
          bestMovie: response.data.basic_curation.bestMovie,
        });

        if (response.data.status !== 404) {
          setChoiceGender({
            curationMovie: response.data.gender_curation.CurationMovie,
            curationGenre: response.data.gender_curation.CurationGenre,
            curationDirector: response.data.gender_curation.CurationDirector,
            curationCast: response.data.gender_curation.CurationCast,
          });
        }

        if (response.data.status !== 404) {
          setChoiceAge({
            curationMovie: response.data.age_curation.CurationMovie,
            curationGenre: response.data.age_curation.CurationGenre,
            curationDirector: response.data.age_curation.CurationDirector,
            curationCast: response.data.age_curation.CurationCast,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getCheckMovie = async () => {
    await axios
      .post(baseUrl + '/checkMovie', data)
      .then((response) => {
        setCheck(response.data);
      })
      .catch((err) => {
        console.log(err.meesage);
      });
  };

  useEffect(() => {
    getCuration();
    getCheckMovie();
  }, []);

  return (
    <>
      <div className='curation_wrap'>
        <div className='basic_curation'>
          <BasicCuration basicCuration={basicCuration} />
        </div>
        <br />
        <br />
        {choiceAge.curationGenre === null ? (
          <></>
        ) : (
          <div className='choice_curation'>
            <ChoiceCuration
              choiceGender={choiceGender}
              choiceAge={choiceAge}
              user={user}
            />
          </div>
        )}
        <br />
        <br />
        <br />
        <div className='check_curation'>
          {check &&
            check.map((element, idx) => {
              return <CheckCuration check={element} key={idx} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Curation;
