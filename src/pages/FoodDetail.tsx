import Details from "@/components/Details";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface FoodDetail {
  idMeal: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
}

export default function FoodDetail() {
  const [foodDetail, setFoodDetail] = useState<FoodDetail[]>([]);
  const { idMeal } = useParams();

  useEffect(() => {
    getFoodetailsById();
  }, []);

  async function getFoodetailsById() {
    try {
      const res = await axios.get(`/api/json/v1/1/lookup.php?i=${idMeal}`);
      setFoodDetail(res.data.meals);
      console.log(res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  function getIngridients(food: FoodDetail) {
    const ingridients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = food[`strIngredient${i}` as keyof FoodDetail];
      const measure = food[`strMeasure${i}` as keyof FoodDetail];

      if (ingredient && ingredient?.trim() !== "") {
        ingridients.push({ ingredient, measure });
      }
    }
    return ingridients;
  }

  return (
    <div className="px-4 md:px-20 lg:px-80">
      {foodDetail.map((f) => (
        <div key={f.idMeal} className="flex flex-col items-center gap-10 my-10">
          <h1 className="text-3xl font-bold">Food recipe for {f.strMeal}</h1>
          <img
            src={f.strMealThumb}
            alt={`Image of ${f.strMeal}`}
            className="rounded-lg w-60 h-60 object-cover"
          />
          <Details left="Name of the dish" right={f.strMeal} />
          <Details left="Category of the dish" right={f.strCategory} />
          <Details left="Nationality of the dish" right={f.strArea} />
          <Details left="Instructions" right={f.strInstructions} />
          <h2 className="text-center font-semibold break-words">Ingredients</h2>
          <ul>
            {getIngridients(f).map((ing, index) => (
              <li key={index}>
                <Details left={ing.ingredient} right={ing.measure} />
              </li>
            ))}
          </ul>
          <a
            href={f.strYoutube}
            className="text-center font-semibold break-words text-white bg-black rounded-md p-3"
          >
            Watch on Youtube
          </a>
        </div>
      ))}
    </div>
  );
}