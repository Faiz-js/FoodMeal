import Details from "@/components/Details";
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

export default function SearchedFood() {
  const [foodDetail, setFoodDetail] = useState<FoodDetail | null>(null);
  const { query } = useParams();

  useEffect(() => {
    searchFood();
  }, []);

  async function searchFood() {
    try {
      const apiUrl = import.meta.env.MODE === 'production' 
        ? import.meta.env.VITE_API_BASE_URL
        : '/api';
      
      const res = await fetch(`${apiUrl}/search.php?s=${query}`);
      const data = await res.json();
      setFoodDetail(data.meals?.[0] || null);
    } catch (error) {
      console.log("Error", error);
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
      {foodDetail ? (
        <div
          key={foodDetail.idMeal}
          className="flex flex-col items-center gap-10 my-10"
        >
          <h1 className="text-3xl font-bold">
            Food recipe for {foodDetail.strMeal}
          </h1>
          <img
            src={foodDetail.strMealThumb}
            alt={`Image of ${foodDetail.strMeal}`}
            className="rounded-lg w-60 h-60 object-cover"
          />
          <Details left="Name of the dish" right={foodDetail.strMeal} />
          <Details left="Category of the dish" right={foodDetail.strCategory} />
          <Details left="Nationality of the dish" right={foodDetail.strArea} />
          <Details left="Instructions" right={foodDetail.strInstructions} />
          <h2 className="text-center font-semibold break-words">Ingredients</h2>
          <ul>
            {getIngridients(foodDetail).map((ing, index) => (
              <li key={index}>
                <Details left={ing.ingredient} right={ing.measure} />
              </li>
            ))}
          </ul>
          <a
            href={foodDetail.strYoutube}
            className="text-center font-semibold break-words text-white bg-black rounded-md p-3"
          >
            Watch on Youtube
          </a>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center text-2xl md:text-5xl mt-10">
            No recipe found
          </div>
        </div>
      )}
    </div>
  );
}
