import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import { Alert, Container } from '@mui/material';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(()=> {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-51244-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  },[]);

  if(isLoading){
    return (
      <Container maxWidth='sm'>
        <Alert severity='info'>Loading....</Alert>
      </Container>
    );
  }
  if(httpError){
    return (
    <Container maxWidth='sm'>
      <Alert severity='error'>{httpError}</Alert>
      {/* <p></p> */}
    </Container>
    );
  }
    const mealsList = meals.map(meal => <MealItem
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        key={meal.id}/>);
    return <section className={classes.meals}>
        <Card>  
            <ul>{mealsList}</ul>
        </Card>
    </section>
}

export default AvailableMeals;