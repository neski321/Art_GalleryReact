import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/Login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms(){
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {    
    updateAtoms();
    authCheck(router.pathname);
    
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push('/Login');
      } else {
        setAuthorized(true);
      }
  }

  return <>{authorized && props.children}</>
}