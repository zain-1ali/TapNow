// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useRequireAuth = () => {
//   const isAuthenticated =localStorage.getItem('tapNowUid')
//   const history = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       history('/login');
//     }
//   }, [isAuthenticated, history]);

//   return isAuthenticated;
// };

// export default useRequireAuth;