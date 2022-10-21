// JavaScript Document

function randomIntFromInterval(min, max)
{
  this.minimum  = min;
  this.maximum  = max;
  this.randomInRange = Math.floor(Math.random()*(max-min+1)+min);
  console.log("Random Number in Range " + min + " to " + max + " of " + this.randomInRange);
}

function getOdds(targetNumber)
{
  if (targetNumber <= 10)
  {
	return (11 - targetNumber) / 10;
  }
  else
  {
	return getOdds(10) * getOdds(targetNumber - 10);
  }
}

function getData()
{
  this.dice = parseInt(document.getElementById("numberOfDice").value, 10);
  this.tn = parseInt(document.getElementById("targetNumber").value, 10);
  this.as = parseInt(document.getElementById("automaticSucessess").value, 10);
  this.desired = parseInt(document.getElementById("desiredResult").value, 10);
  
  this.odds = getOdds(this.tn);
  console.log("TN " + this.tn + " produces odds of " + this.odds);
  
  this.averageResultJustDice = this.dice * this.odds;
  console.log("From the Dice, this gives you " + this.averageResultJustDice);
  
  this.averageResultRaw = this.averageResultJustDice + this.as;
  console.log("Adding the AS makes it " + this.averageResultRaw);
  
  this.averageResult = Number(this.averageResultRaw.toFixed(2));
  console.log("Rounding makes it " + this.averageResult);
  
  this.rollText = this.dice + "D10 TN" + this.tn + " ";
  if (this.as < 0) { this.rollText += " " + this.as + "AS"; }
  else if (this.as > 0) { this.rollText += " +" + this.as + "AS";}
}

function populateResults()
{
  var rawData = new getData();
  
  document.getElementById("diceRollded").innerHTML = rawData.rollText;
  document.getElementById("averageResult").innerHTML = rawData.averageResult;
  document.getElementById("percentageChance").innerHTML = "NYI";
}
