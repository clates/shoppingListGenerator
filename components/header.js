import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css"
import {
  faBookOpen,
  faReceipt,
  faMagic,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="w-full">
      <nav>
        <nav className="mb-8 bg-purple-300">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              <Link href="/">
                <div className="cursor-pointer group flex items-center space-x-2 hover:text-slate-600">
                  No Plan. #JustShop
                </div>
              </Link>
            </h1>
            <div className="flex space-x-10">
              {/* <Link href="/recipes/add-recipe"> */}
              <div className="cursor-not-allowed group flex items-center space-x-2">
                <span>
                  <FontAwesomeIcon
                    icon={faMagic}
                    className="fa-2x transition-all duration-300 group-hover:text-slate-600"
                    inverse
                  />
                </span>
                <span className="text-white transition-all duration-300 group-hover:text-slate-600">
                  Generate
                </span>
              </div>
              {/* </Link> */}
              <Link href="/recipes/add-recipe">
                <div className="cursor-pointer group flex items-center space-x-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faReceipt}
                      className="fa-2x transition-all duration-300 group-hover:text-slate-600"
                      inverse
                    />
                  </span>
                  <span className="text-white transition-all duration-300 group-hover:text-slate-600">
                    Add New Recipie
                  </span>
                </div>
              </Link>
              <Link href="/recipes/">
                <div className="cursor-pointer group flex items-center space-x-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      className="fa-2x transition-all duration-300 group-hover:text-slate-600"
                      inverse
                    />
                  </span>
                  <span className="text-white transition-all duration-300 group-hover:text-slate-600">
                    Master Cookbook
                  </span>
                </div>
              </Link>
            </div>
            {session ?
              <div className="cursor-pointer">
                <Link href="/profile" >
                  <span style={{ backgroundImage: `url(${session.user.image})` }} className={styles.avatar} />
                </Link>
              </div>
              :
              <div
                className="group lg:flex hidden items-center space-x-2 py-1 px-2 rounded-full hover:text-slate-600"
                role="button"
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}>
                <FontAwesomeIcon icon={faUserCircle} className="fa-2x group-hover:text-slate-600" inverse />
              </div>
            }

          </div>
        </nav>
      </nav>
    </header >
  );
}
