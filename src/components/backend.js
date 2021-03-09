import React, { useEffect, useState } from 'react'


import recipe_master from '../media/recipes/recipe_master.json';

import Amplify, { DataStore, Predicates, API, graphqlOperation } from "aws-amplify";
import { RECIPE } from "../models";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);


function onCreate() {

  for (const i in recipe_master){
    DataStore.save(
      new RECIPE({
        recipe: JSON.stringify(recipe_master[i])
      })
    );
  }

}



function onDeleteAll() {
  DataStore.delete(RECIPE, Predicates.ALL);
}

async function onQuery() {
  const posts = await DataStore.query(RECIPE, (c) => c);

  console.log(posts);
}



const Backend = () => {


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




  return (
    <>
      <div>
       <input type="button" value="NEW" onClick={onCreate} />
       <input type="button" value="DELETE ALL" onClick={onDeleteAll} />
       <input type="button" value="QUERY" onClick={onQuery} />
     </div>
    </>

  )
}

export default Backend
