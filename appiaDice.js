// JavaScript Document

function randomIntFromInterval(min, max)
{
  this.minimum  = min;
  this.maximum  = max;
  this.randomInRange = Math.floor(Math.random()*(max-min+1)+min);
  console.log("Random Number in Range " + min + " to " + max + " of " + this.randomInRange);
}

function getData()
{
  this.dice = document.getElementById("numberOfDice").value;
  this.tn = document.getElementById("targetNumber").value;
  this.as = document.getElementById("automaticSucessess").value;
  this.desired = document.getElementById("desiredResult").value;
  
  this.rollText = this.dice + "D10 TN" + this.tn + " ";
  if (this.as < 0) { this.rollText += " " + this.as + "AS"; }
  else if (this.as > 0) { this.rollText += " +" + this.as + "AS";}
}

function populateResults()
{
  var rawData = new getData();
  
  document.getElementById("diceRollded").innerHTML = rawData.rollText;
  document.getElementById("averageResult").innerHTML = "3.7";
  document.getElementById("percentageChance").innerHTML = "15";
}
