const verifyUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
};

export default verifyUser;
