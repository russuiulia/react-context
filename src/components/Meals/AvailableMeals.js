import { useEffect, useState } from 'react/cjs/react.production.min';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHttpError, setHasHttpError] = useState();
  useEffect(() => {
    fetch("/meals")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setHasHttpError(err.message);
      })
      .then((meals) => setMeals(meals.map((meal) =>
        <MealItem
          key={meal._id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={parseFloat(meal.price)} />

      )));
    setIsLoading(false);
  }, []);

  return <section className={classes.meals}>
    <Card>
      {hasHttpError && <p>Failed to load</p>}
      {isLoading ? "Loading..." : meals}
    </Card>
  </section>
}

export default AvailableMeals;