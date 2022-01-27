import Link from "next/link";
import useSWR from "swr";
import Likes from "../../components/Likes";
import LoadingSpinner from "../../components/LoadingSpinner";
import NotImpl from "../../components/NotImplemented";
import { timeAgo } from "../../utils/dateutils";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MasterCookbook() {
  // const { data: session, status } = useSession();
  const { data, error } = useSWR(`/api/recipe/`, fetcher);
  console.log(data);
  return (
    <>
      <NotImpl msg="an infinite batch of cards here with embedded like buttons showing all recipes uploaded.">
        {error ? <p>{JSON.stringify(error)}</p> : null}
        {/* {data ? (
          data.results.map(({ rid, name, likes }) => {
            return (
              <Link key={rid} href={`/recipes/${rid}`}>
                <p className="cursor-pointer text-blue-400 underline">{`${name} - ${rid} - ${likes}`}</p>
              </Link>
            )
          })
        ) : (
          <p>no recipes loaded</p>
        )} */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center md:justify-items-center justify-items-stretch">
          {data ? data.results.map(({ rid, name, likes, createdOn, createdBy }) => {
            return (
              <Link
                href={`/recipes/${rid}`}
              ><div className="flex flex-col border m-1 h-64 bg-white drop-shadow-xl rounded-3xl items-center w-full md:w-72 lg:w-64 cursor-pointer">
                  <div className="text-3xl text-bold text-center grow bg-slate-300 pt-6 pl-2 pr-2 border-t-2 rounded-1xl font-title w-full">{name}</div>
                  {/* <div className="text-3xl text-center grow">{createdBy}</div> */}
                  <div className="text-xl text-center grow">{timeAgo(createdOn)}</div>
                  <div className=""><Likes recipe={rid} likes={likes} /></div>
                </div>
              </Link>
            )
          }) : <LoadingSpinner />}
        </div>
        {/* {JSON.stringify(data)} */}
      </NotImpl>
      <br />
      <br />
    </>
  );
}
