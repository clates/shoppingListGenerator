import { useSession } from 'next-auth/react';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const LikesContext = React.createContext();
const LikesProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const { data, error } = useSWR(session ? `/api/user/${session.user.id}/likes` : null, fetcher)

  return <LikesContext.Provider value={{
    likedItems: data ? data.map(x => x.rid) : [],
  }}>
    {children}
  </LikesContext.Provider>

}
export { LikesContext, LikesProvider };
