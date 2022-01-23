import { useRouter } from "next/router";
import useSwr from "swr";
import { timeAgo } from "../../utils/dateutils";
import Likes from "../../components/Likes";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Recipe() {
  const router = useRouter();
  const { data: recipe, error } = useSwr(
    router.query.id ? `/api/recipe/${router.query.id}` : null,
    fetcher
  );
  const { data: user } = useSwr(
    recipe ? `/api/user/${recipe.createdBy}` : null,
    fetcher
  );

  if (error) return <div>Failed to load recipe</div>;
  if (!user || !recipe) return <LoadingSpinner text="Fetching recipe" />;

  const { recipe: recipeInformation, likes, createdOn, notes, name, rid } = recipe
  const { image: userImage, name: userName } = user

  return <div>
    <div className="flex flex-row">
      <div className="grow">
        <div className="text-4xl">{name}</div>
        <div className="flex flex-row items-center ml-4 mb-2">
          contributed by <span style={{ backgroundImage: `url(${userImage})` }} className="block h-5 w-5 bg-cover ml-3 mr-1" />
          {userName} {timeAgo(createdOn)}
        </div>
      </div>
      <div>
        <Likes recipe={rid} likes={likes} />
      </div>
    </div>
    {JSON.parse(recipeInformation).map(section => <div>
      <div className="text-xl ml-4 text-purple-500 mt-2">{section.sectionName}</div>
      <hr className="border-1 border-purple-500 mb-2" />
      <div>
        {section.ingredients.map(ingredient =>
          <div className="flex flex-row">
            <div className="w-24 text-right mr-2">{ingredient.qty}</div> <span class="text-purple-500">|</span> <div className="ml-2">{ingredient.name}</div>
          </div>)}
      </div>
    </div>)}

    <div className="mt-16">{notes}</div>
  </div>;
}
