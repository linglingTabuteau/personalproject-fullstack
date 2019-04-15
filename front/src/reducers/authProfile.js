const initialState = {
  user: {
    email: '',
    password: '',
  },
  token: '',
};

const authProfile = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      console.log('actionuser-signinProfile:', action.user);
      document.cookie = `token=${action.token}`;
      return {
        // ci-dessous duplique les propriétés de action.user pour le pas modifier
        user: { ...action.user },
        token: action.token,
      };
    case 'AUTOLOGIN':
      return {
        user: { ...action.user },
        token: action.token,
      };
    case 'SIGNOUT':
      document.cookie = 'token=';
      return initialState;
    default:
      return state;
  }
};

export default authProfile;
