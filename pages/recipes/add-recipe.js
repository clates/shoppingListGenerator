import Layout from "../../components/layout";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPlus,
  faMinusSquare,
  faSave,
  faEraser,
  faStar,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import EditableInput from "../../components/buttons/EditableInput";
import InputStyled from "../../components/input/InputStyled";
import IconButton from "../../components/buttons/IconButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AddRecipe() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("Dad's Chicken Noodle Soup");
  const [notes, setNotes] = useState(`
  Pan Fry the garlic and onions until brown
  In the same pan add chicken, cook until chicken is white on all sides.
  Add to pot
  `);
  const [recipe, setRecipe] = useState([
    {
      sectionName: "Stock from scratch",
      ingredients: [
        { qty: "1", name: "Whole chicken" },
        { qty: "2", name: "Carrots" },
        { qty: "3", name: "Celery Stalks" },
        { qty: "2", name: "Onion" },
        { qty: "1", name: "Garlic - Head" },
        { qty: "1", name: "Turnip" },
        { qty: "1/4 bunch", name: "Thyme" },
        { qty: "2", name: "Bay Leaves" },
        { qty: "1 Tsp", name: "Whole black peppercorns" },
      ],
    },
    {
      sectionName: "Main",
      ingredients: [
        { qty: "2 Tbs", name: "Extra-virgin olive oil" },
        { qty: "1", name: "Onion" },
        { qty: "3 cloves", name: "Garlic" },
        { qty: "2", name: "Carrots" },
        { qty: "2", name: "Celery ribs" },
        { qty: "4 sprigs", name: "Thyme" },
        { qty: "1", name: "Bay Leaves" },
        { qty: "2 qts", name: "Chicken Stock" },
        { qty: "8 oz", name: "Egg Noodle" },
        { qty: "To taste", name: "Salt" },
        { qty: "To taste", name: "Pepper" },
        { qty: "1 handful", name: "Parsley" },
      ],
    },
  ]);
  const { data: session, status } = useSession();
  const [showHelper, setShowHelper] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") return <LoadingSpinner text="Loading" />;
  if (status !== "authenticated")
    return "Please log in in the upper right in order to add a new recipe";
  if (isLoading) return <LoadingSpinner text="Submitting" />;

  return (
    <div>
      {showHelper && (
        <div className="bg-purple-100 rounded p-3 mb-7 border-2 border-purple-300 text-slate-500 hover:text-black">
          Help others with their meal prep by adding one of your favorite
          recipies! You and other will be able to view and{" "}
          <FontAwesomeIcon icon={faStar} className="fa-md text-rose-300" /> the
          recipe in the{" "}
          <FontAwesomeIcon icon={faBookOpen} className="fa-md text-rose-300 " />{" "}
          Master Cookbook to have it included in your regular meal prep
          rotation. A good recipe for #NPJS uses easy-to-find ingredients and
          has simple and easy-to-follow instructions.
          <br />
          Get started by clicking the{" "}
          <FontAwesomeIcon
            icon={faEraser}
            className="fa-md text-amber-500"
          />{" "}
          below to clear the fields. Use the{" "}
          <FontAwesomeIcon icon={faPlus} className="fa-md text-rose-300" />{" "}
          buttons to add new sections or ingredients.
        </div>
      )}
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-1/2 max-w-lg">
          <div className="text-3xl">
            <EditableInput value={recipeName} onChange={setRecipeName} />
          </div>
          {recipe.map(({ sectionName, ingredients }, sectionIndex) => (
            <div className="">
              <div className="flex items-center text-xl ml-3 mt-4 mb-2">
                <EditableInput
                  value={sectionName}
                  onChange={(newValue) => {
                    setRecipe(
                      recipe.map((section, _idx) => ({
                        sectionName:
                          sectionIndex === _idx
                            ? newValue
                            : section.sectionName,
                        ingredients: section.ingredients,
                      }))
                    );
                  }}
                />
                <FontAwesomeIcon
                  className="ml-3 fa-md text-red-600 cursor-pointer"
                  icon={faTrashAlt}
                  onClick={() =>
                    alert(
                      `Are you sure you want to delete the ${sectionName} section?`
                    )
                  }
                />
              </div>
              <hr className="border-1 border-purple-700  mb-2" />
              <div className="flex flex-col ml-6">
                {ingredients.map(({ qty, name }, ingredientIndex) => (
                  <div className="flex flex-row items-center mb-1">
                    <div>
                      <InputStyled
                        placeholder={qty}
                        value={qty}
                        onBlur={() => {}}
                        onChange={(e) => {
                          setRecipe(
                            recipe.map((section, _idx) => {
                              if (_idx === sectionIndex) {
                                return {
                                  sectionName: section.sectionName,
                                  ingredients: section.ingredients
                                    .map((sectionIngredients, _idx2) => {
                                      if (_idx2 === ingredientIndex) {
                                        return {
                                          qty: e.target.value,
                                          name: sectionIngredients.name,
                                        };
                                      }
                                      return sectionIngredients;
                                    })
                                    .filter(Boolean),
                                };
                              }
                              return section;
                            })
                          );
                        }}
                        className={"w-32 text-right"}
                      />
                    </div>
                    <div className="col-span-4 grow ml-5">
                      <InputStyled
                        className=""
                        placeholder={name}
                        value={name}
                        onBlur={() => {}}
                        onChange={(e) => {
                          setRecipe(
                            recipe.map((section, _idx) => {
                              if (_idx === sectionIndex) {
                                return {
                                  sectionName: section.sectionName,
                                  ingredients: section.ingredients
                                    .map((sectionIngredients, _idx2) => {
                                      if (_idx2 === ingredientIndex) {
                                        return {
                                          qty: sectionIngredients.qty,
                                          name: e.target.value,
                                        };
                                      }
                                      return sectionIngredients;
                                    })
                                    .filter(Boolean),
                                };
                              }
                              return section;
                            })
                          );
                        }}
                      />
                    </div>
                    <FontAwesomeIcon
                      icon={faMinusSquare}
                      className="fa-lg ml-3 text-rose-300 cursor-pointer"
                      onClick={() =>
                        setRecipe(
                          recipe.map((section, _idx) => {
                            if (_idx === sectionIndex) {
                              return {
                                sectionName: section.sectionName,
                                ingredients: section.ingredients
                                  .map((sectionIngredients, _idx2) => {
                                    if (_idx2 === ingredientIndex) {
                                      return undefined;
                                    }
                                    return sectionIngredients;
                                  })
                                  .filter(Boolean),
                              };
                            }
                            return section;
                          })
                        )
                      }
                    />
                  </div>
                ))}
                <IconButton
                  icon={faPlus}
                  color="slate"
                  label="Add Ingredient"
                  onClick={() =>
                    setRecipe(
                      recipe.map((section) => ({
                        sectionName: section.sectionName,
                        ingredients:
                          section.sectionName === sectionName
                            ? [...section.ingredients, { qty: "", name: "" }]
                            : section.ingredients,
                      }))
                    )
                  }
                />
              </div>
            </div>
          ))}
          <span className="mt-5">
            <IconButton
              icon={faPlus}
              color="purple"
              label="Add New Section"
              onClick={() => {
                setRecipe([
                  ...recipe,
                  { sectionName: "New Section", ingredients: [] },
                ]);
              }}
            />
          </span>
        </div>
        <div className="ml-8 flex flex-col w-1/2 max-w-lg">
          <div className="flex flex-row justify-end">
            <IconButton
              icon={faSave}
              label="Save"
              onClick={() => {
                setIsLoading(true);
                fetch("/api/recipe/new", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: recipeName,
                    recipe: recipe,
                    notes: notes,
                  }),
                })
                  .then((resp) => resp.json())
                  .then((json) => router.push(`/recipes/${json.rid}`));
              }}
            />
            <IconButton
              className="ml-4"
              icon={faEraser}
              color="amber"
              label="Clear All Fields"
              onClick={() => {
                setRecipe([{ sectionName: "Main", ingredients: [] }]);
                setNotes("");
                setRecipeName("Edit the Recipe name ->");
              }}
            />
          </div>
          <div className="flex flex-col text-xl ml-3 mt-4 mb-2">
            <span>Notes</span>
            <hr className="border-1 border-purple-700  mb-2" />
          </div>
          <textarea
            className="ml-5 p-[4px] h-96 border-2 rounded-lg border-purple-300 focus:p-[2px] focus:outline-none focus:border-4 focus:border-purple-600"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
