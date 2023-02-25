
import Title from "../layout/Title";
import AddPerson from '../forms/AddPerson';
import People from '..//lists/People';
import AddCar from '../forms/AddCar';

const IndexPage = () => {

  return (
    <div>
     <Title/>
     <AddPerson/>
     <AddCar/>
     <People/>
    </div>
  )
}

export default IndexPage;