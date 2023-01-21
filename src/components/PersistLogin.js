import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, []);

    useEffect(() => {
        console.log(`is Loading : ${isLoading}`);
        console.log(`aT : ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    return (
        <>
            {
                !persist
                    ? <Outlet />
                    : isLoading
                        ? <p>Loading...</p>
                        : <Outlet />
            }
        </>
    );

}

export default PersistLogin;