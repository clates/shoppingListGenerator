import Link from "next/link";
import useSWR from "swr";
import NotImpl from "../../components/NotImplemented";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MasterCookbook() {
  // const { data: session, status } = useSession();
  const { data, error } = useSWR(`/api/recipe/`,
    fetcher
  );
  return <NotImpl msg="an infinite batch of cards here with embedded like buttons showing all recipes uploaded.">
    {error ? <p>{JSON.stringify(error)}</p> : null}
    {data ? data.results.map(({ rid, name, likes }) => <Link key={rid} href={`/recipes/${rid}`}><p className="cursor-pointer text-blue-400 underline">{`${name} - ${rid} - ${likes}`}</p></Link>) : <p>no recipes loaded</p>}
    {/* {JSON.stringify(data)} */}
  </NotImpl>
}