// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import verifyUser from 'utils/VerifyUser';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const loggedUser = verifyUser();
        if (loggedUser) {
            setUser(loggedUser);
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);
    return (
        <ThemeCustomization>
            <ScrollTop>
                <Toaster position="top-right" reverseOrder={false} />
                <Routes isLoggedIn={isLoggedIn} />
            </ScrollTop>
        </ThemeCustomization>
    );
};
export default App;
