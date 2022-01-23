import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSwr from "swr";
import LoadingSpinner from "../components/LoadingSpinner";
import NotImpl from "../components/NotImplemented";
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
  if (!data || status === "loading") return <LoadingSpinner text="Fetching profile" />;

  return <NotImpl msg="Typical profile page. User's image, user's name, # of hearts? Hearted recipes list, submitted recipes list, recipes are all links to their page">
    <div>
      {JSON.stringify(data, null, 4)}
      <hr />
      likes:
      {likedItems.map(rid => <Link key={rid} href={`/recipes/${rid}`}><p className="cursor-pointer text-blue-400 underline">{rid}</p></Link>)}
    </div>
  </NotImpl>;
}
