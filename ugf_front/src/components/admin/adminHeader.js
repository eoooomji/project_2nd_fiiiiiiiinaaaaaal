import { NavLink } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div>
      <div>
        <ul>
          <li>
            <NavLink to="/">
              <span>메인으로</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/mem/1">
              <span>회원 등급 수정</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/comment/1">
              <span>전체 한줄평 조회 및 삭제</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
