import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSwr from "swr";
import { LikesContext } from "../context/LikesContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data: session, status } = useSession()
  const { likedItems } = useContext(LikesContext)
  // const { data, error } = useSwr(
  //   router.query.id ? `/api/user/${router.query.id}` : null,
  //   fetcher
  // );
  const { data, error } = useSwr(
    (status === "authenticated" && session.user.id) ? `/api/user/${session.user.id}` : null,
    fetcher
  );


  if (error) return <div>Failed to load user profile</div>;
  if (!data || status === "loading") return <div>Loading...</div>;

  return <div>
    {JSON.stringify(data, null, 4)}
    <hr />
    {JSON.stringify(likedItems)}
  </div>;
}
