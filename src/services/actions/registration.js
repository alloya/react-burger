// import { createUser } from "../../utils/api";

// export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
// export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
// export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

// export const registration = (form) => (dispatch) => {
//   dispatch({
//     type: REGISTRATION_REQUEST
//   });
//   createUser(form)
//     .then(res => {
//       if (res && res.success) {
//         dispatch({
//           type: REGISTRATION_SUCCESS,
//           user: res.user,
//           accessToken: res.accessToken,
//           refreshToken: res.refreshToken
//         });
//         dispatch({
//           type: 
//         })
//         dispatch
//       }
//     })
//     .catch(err => {
//       dispatch({
//         type: REGISTRATION_FAILED
//       });
//       console.log(err)
//     })
// }