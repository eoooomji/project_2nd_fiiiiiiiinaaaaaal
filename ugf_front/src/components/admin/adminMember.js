import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
import PageNavigation from '../board/page_nav';
import AdminMemberUpdate from './adminMemberUpdate';

const AdminMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [pv, setPv] = useState({ currentPage: 1 });
  const { currentPage } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getData(currentPage ? currentPage : 1);
  }, []);

  const getData = async (currentPage) => {
    console.log('currentPage:' + currentPage);

    await axios.get(baseUrl + '/ad/mem/' + currentPage).then((response) => {
      setMemberList(response.data.aList);
      setPv(response.data.pv);
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!window.confirm('수정하시겠습니까?')) {
      return false;
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3 className="text-center">회원 목록</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>회원번호</th>
            <th>닉네임</th>
            <th>출생년도</th>
            <th>성별</th>
            <th>등급</th>
          </tr>
        </thead>
        <tbody>
          {memberList &&
            memberList.map((member, idx) => {
              return (
                <tr key={idx}>
                  <td>{member.usercode}</td>
                  <td>{member.nickname}</td>
                  <td>{member.birth}</td>
                  <td>{member.gender}</td>
                  <td>
                    <AdminMemberUpdate
                      usercode={member.usercode}
                      authRole={member.authRole}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {pv ? (
        <PageNavigation
          currentPage={pv.currentPage}
          startPage={pv.startPage}
          endPage={pv.endPage}
          blockPage={pv.blockPage}
          totalPage={pv.totalPage}
          getList={getData}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default AdminMember;
