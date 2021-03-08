/* src/App.js */
import React, { useEffect, useState } from 'react'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import awsExports from "./aws-exports";
// import { withAuthenticator } from '@aws-amplify/ui-react'

import Amplify, { DataStore, Predicates, API, graphqlOperation } from "aws-amplify";
import { RECIPE } from "./models";

//Use next two lines only if syncing with the cloud
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function onCreate() {
  DataStore.save(
    new RECIPE({
      recipe:'mic check'
    })
  );
}

async function onQuery() {
  const posts = await DataStore.query(RECIPE, (c) => c);

  console.log(posts);
}

const App = () => {


  return (
    <div>
       <input type="button" value="NEW" onClick={onCreate} />
       <input type="button" value="QUERY" onClick={onQuery} />
     </div>
  )
}


export default App
