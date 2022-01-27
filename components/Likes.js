import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { LikesContext } from "../context/LikesContext";


export default ({ recipe, likes, initialLike }) => {
  const { data: session, status } = useSession()
  const { likedItems } = useContext(LikesContext)
  const [like, setLike] = useState(likedItems.some(x => x === recipe))
  const [likesCount, setLikesCount] = useState(likes)

  const onClick = () => {
    if (!session) {
      signIn();
    } else {
      setLike(!like);
      setLikesCount(like ? likesCount - 1 : likesCount + 1)
      fetch(`/api/user/${session.user.id}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe: recipe,
          like: !like,
        }),
      })
    }
  }
  return (
    <div role="button" onClick={onClick} className="group flex flex-col items-center w-16 border-2 border-rose-300 rounded-lg hover:border-rose-500 cursor-pointer">
      <FontAwesomeIcon
        icon={like ? solidStar : faStar}
        className="fa-lg text-rose-400 mt-1 group-hover:text-rose-500" />
      {likesCount}
    </div>
  );
};
