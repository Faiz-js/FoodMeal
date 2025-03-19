import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* types for food */
interface Food {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface FoodCardProps {
  id: string;
  name: string;
  image: string;
}

/* Main Food Component */
export default function Foods() {
  const [food, setFood] = useState<Food[]>([]);

  useEffect(() => {
    getFoods();
  }, []);

  async function getFoods() {
    try {
      const res = await axios.get("/api/json/v1/1/search.php?f=b");
      setFood(res.data.meals);
      console.log(res.data.meals);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {food.map((f) => (
        <FoodCard
          key={f.idMeal}
          id={f.idMeal}
          name={f.strMeal}
          image={f.strMealThumb}
        />
      ))}
    </div>
  );
}

/* Food Card Component */
const FoodCard = ({ id, name, image }: FoodCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-300 p-4 flex-shrink-0 w-60 h-auto"
      onClick={() => navigate(`/foodDetails/${id}`)}
    >
      <img
        src={image}
        alt={`Image of ${name}`}
        className="rounded-lg w-full h-auto object-cover"
      />
      <h1 className="text-center font-semibold break-words">{name}</h1>
    </div>
  );
};
