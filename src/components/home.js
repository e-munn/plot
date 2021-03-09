import React, { useState, useEffect } from "react";

import {
 BrowserRouter as Router,
 Link
} from "react-router-dom";
import recipe_master from '../media/recipes/recipe_master.json';
import Card from './card.js';
import '../css/cards.css';

import span from '../media/logo/span.svg'


import Amplify, { DataStore, Predicates } from "aws-amplify";
import { RECIPE } from "../models";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

const Home = () => {


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
    <img src={span}
      style={{
        width:'94vw',
        padding:'8px 3vw'
      }}
    />
      <div
        className={'cardbox'}
        >
          { isLoading ? (<div>Loading ...</div>) : (
            data.map((d, i) =>
              <Link
                to={'/' + d.path}
                >
                <Card
                  d={d}
                  i={i}
                />
              </Link>
            )
          )
        }
      </div>
    </>

  )
}

export default Home
