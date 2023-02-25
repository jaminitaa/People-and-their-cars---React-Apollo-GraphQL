import { GET_PEOPLE_WITH_CARS } from '../../queries'
import CarCard from "../listItems/CarCard";
import { Link, useParams } from 'react-router-dom';
import { List, Card } from 'antd'
import { useQuery } from '@apollo/client'

const getStyles = () => ({
  card: {
    width: '800px'
  }
})

const Detail  = props  => {
  const { id } = useParams();

  const styles = getStyles()
    
  const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CARS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


    return (
      <div>
        <Card
        style={styles.card}>
        <h1>Person Details</h1>
        <h2>{[data.personWithCars[id].firstName + ' ' + data.personWithCars[id].lastName]}</h2>
        <List
          grid={{ gutter: 20, column: 1 }}
          style={styles.list}
        >
          {data.personWithCars[id].cars.map(({id, year, make, model,price, personId, }) => (
              <List.Item key={id} style ={{textAlign: 'center'}}>
                <CarCard
                  key={id}
                  id={id}
                  year={year}
                  make={make}
                  model={model}
                  price={price}
                  personId={personId}
                />
              </List.Item>
            )
          )}
        </List>

        <div style={{ marginTop: '20px' }}>
        <Link to='/'>Go Back To Records Page</Link>
      </div>
      </Card>
      </div>
    );
  };
  
  export default Detail;