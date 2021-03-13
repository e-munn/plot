import React, { useState } from "react";
import { max, min, sum, hierarchy } from 'd3';

export default function plotizeMobile(recipe, format){

  var root = hierarchy(recipe.recipe[0]);
  root.each(
    function(d, i){
        if (d.depth == 0){
      }
      else if ('vessel' in d.data){
        d.actions = d.children.filter(a => ("action" in a.data)).map(b => b.data.action_amt)
        d.numIng = d.children.filter(a => ("ingredient" in a.data)).length
        d.numShove = d.parent.children.filter(a => ("vessel" in a.data)).filter(a => (d.data.vorder > a.data.vorder)).length
      }
    }
  )

  var pY = 0
  var pH = 0
  var pYMax = 0
  root.each(
    function(d){
      if ('vessel' in d.data) {
        if (d.depth == 0) {
          pY += pH
          d.data.pH = pH
          d.data.pY = pY
        } else {
          pH = format.vessel.padding1 + format.vessel.padding2
          pH += (sum(d.actions) * format.action.amtScale) + ((d.numIng + d.actions.length) * format.ingredient.height)
          pY = d.parent.data.pY + format.vessel.gap
          pY += pH
          d.data.pY = pY
          d.data.pH = pH
          if ((pY) > pYMax){
            pYMax = pY
          }
        }
      }
    }
  )

  pY = 0
  pH = 0
  var taskCount = 0
  root.each(
    function(d, i){
      if ('vessel' in d.data) {
        if (d.depth == 0) {
          pY = pYMax
          pY -= pH
          d.data.pH = pH
          d.data.pY = pYMax
        } else {

          pH = format.vessel.padding1 + format.vessel.padding2
          pH += (sum(d.actions) * format.action.amtScale) + ((d.numIng + d.actions.length) * format.ingredient.height)
          pY = d.parent.data.pY - format.vessel.gap
          pY -= pH
          d.data.pY = pY
          d.data.pH = pH

        }
      }
    }
  )

  pY = 0
  pH = 0
  var taskCount = 0
  root.eachAfter(
    function(d, i){
      if ('vessel' in d.data) {
        taskCount = 0
       }
      else if ('action' in d.data) {
        d.data.stepOrder=i
        taskCount += format.ingredient.height
        pY = d.parent.data.pY + format.vessel.padding1
        d.data.pY = pY + taskCount
        taskCount += d.data.action_amt * format.action.amtScale
      } else if ('ingredient' in d.data) {
        d.data.stepOrder=i
        pY = d.parent.data.pY + format.vessel.padding1
        taskCount += format.ingredient.height
        d.data.pY = pY + taskCount
      }
    }
  )

  const getLeafY = (a) => {
    var leaves = a.leaves()
    leaves = leaves.map(b => b.data.pY)
    return min(leaves)
  }

  var preheat = null

  var pX = format.main.margin.left
  root.each(
    function(d, i){
      if ('vessel' in d.data) {
        if (d.depth == 0) {
          d.data.pX = pX
        } else {
          d.data.stepOrder=i
          pX = d.parent.data.pX
          var vesselSibs = d.parent.children.filter(a => ("vessel" in a.data))
          var numLess = vesselSibs.filter(b => (getLeafY(b) < getLeafY(d)) ).length
          d.data.vesselSibs = vesselSibs.length
          d.data.branch = max([numLess, d.parent.data.branch])
          pX += numLess * format.vessel.shove
          d.data.pX = pX
        }
      } else {
        if ('action' in d.data){
          pX = d.parent.data.pX
          d.data.pX = pX
          if(d.data.action == 'bake'){
            preheat = d.data.temp
          }
        } else if ('ingredient' in d.data){
          pX = d.parent.data.pX
          d.data.pX = pX
        }
      }
    })

    return [root, pYMax, preheat]

};
