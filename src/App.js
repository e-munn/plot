/* src/App.js */
import React, { useEffect, useState } from 'react'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import awsExports from "./aws-exports";
// import { withAuthenticator } from '@aws-amplify/ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/home.js';
import PageMaster from './components/pageMaster.js';
import recipe_master from './media/recipes/recipe_master.json';
import ScrollToTop from './components/scrolltotop.js';
import dim from './media/theme/dim.json';


import Amplify, { DataStore, Predicates, API, graphqlOperation } from "aws-amplify";
import { RECIPE } from "./models";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);



function onCreate() {
  DataStore.save(
    new RECIPE({
      recipe: JSON.stringify(recipe_master[3])
    })
  );
}

function onDeleteAll() {
  DataStore.delete(RECIPE, Predicates.ALL);
}

async function onQuery() {
  const posts = await DataStore.query(RECIPE, (c) => c);

  console.log(posts);
}

const App = () => {



    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        setError(false);
        setLoading(true);

        try {
          var response = await DataStore.query(RECIPE)
          response = JSON.stringify(response, null, 2)
          response = JSON.parse(response)
          response = response.map(d => JSON.parse(d.recipe))
          setData(response);
        } catch (error) {
          setError(true);
        }
        setLoading(false);
      };
      fetchData()
    }, []);




  const tempWidth = window.innerWidth

  const mobile = (tempWidth < dim.m.cutoff) ? 1 : 0;

  const [aWidth, setaWidth] = useState([mobile, tempWidth])

  return (
  <>
    <div>
       <input type="button" value="NEW" onClick={onCreate} />
       <input type="button" value="DELETE ALL" onClick={onDeleteAll} />
       <input type="button" value="QUERY" onClick={onQuery} />
     </div>
     {isLoading ? (<div>Loading ...</div>) : (
       <Router>
         <ScrollToTop />
           <Switch>
             <Route exact path={'/'}>
               <Home/>
             </Route>
               {data.map(d => (
                 <Route path={ '/' + d.path}>
                   <PageMaster
                     recipe={d}
                   />
                 </Route>
                 ))
               }

             </Switch>
         </Router>
         )
       }
    </>
  )
}


export default App
