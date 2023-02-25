
import './App.css';
import IndexPage from './components/pages/IndexPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import 'antd/dist/reset.css'
// import AddPerson from './components/forms/AddPerson';
// import People from './components/lists/People';
// import AddCar from './components/forms/AddCar';
import Detail from './components/pages/Detail';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <BrowserRouter>
    <ApolloProvider client={client}>
    <div className="App">
     {/* <Title/>
     <AddPerson/>
     <AddCar/>
     <People/> */}
     <Routes>
              <Route path='/' element={<IndexPage/>} />
              <Route path='/person/:id' element={<Detail/>} />
     </Routes>
    </div>
    </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
