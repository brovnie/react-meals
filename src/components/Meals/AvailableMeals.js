import style from "./AvailableMeals.module.css";
import { useEffect, useState } from 'react';

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://meals-exercise-react-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
         {  method: 'GET', 
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'same-origin', 
          headers: {
          'Content-Type': 'application/json'
          },
  }
        );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();    
      const loadedMeals = [];
      for(const key in responseData) {
        console.log(responseData[key]);
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].desccription,
          price: responseData[key].price,
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if (isLoading) {
    return (
      <section className={style.meals}>
      <Card>
              Loading...
      </Card>
      </section>
    );
  }

    if (httpError) {
      console.log('error happend');
    return (
      <section className={style.meals}>
      <Card>
              <p>{httpError}</p>
      </Card>
      </section>
    );
  }

    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={style.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;

