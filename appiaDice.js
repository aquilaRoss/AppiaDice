// JavaScript Document

let numberOfDiceOptions = { "minimum":1, "maximum":10, "default":8 };
let targetNumberOptions = { "minimum":4, "maximum":20, "default":7  };
let autoSuccessesOptions = { "minimum":-5, "maximum":15, "default":0  };
let desiredResultOptions = { "minimum":1, "maximum":20, "default":4  };

let defaultOptions = [
	{
		"description": "Dodge",
		"dice": 10,
		"tn": 6,
		"as": 3
	},
	{
		"description": "Second Dodge",
		"dice": 10,
		"tn": 6,
		"as": 3
	},
	{
		"description": "Third Dodge",
		"dice": 10,
		"tn": 8,
		"as": 3
	},
	{
		"description": "Physical Soak",
		"dice": 10,
		"tn": 8,
		"as": 3
	},
	{
		"description": "Falling Damage Soak",
		"dice": 10,
		"tn": 7,
		"as": 3
	},
	{
		"description": "Magical Soak",
		"dice": 4,
		"tn": 7,
		"as": 0
	},
	{
		"description": "Elemental Soak",
		"dice": 4,
		"tn": 10,
		"as": 0
	},
	{
		"description": "Willpower",
		"dice": 8,
		"tn": 6,
		"as": 1
	}
]

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

function factorialize(num) {
  if (num < 0) 
        return -1;
  else if (num == 0) 
      return 1;
  else {
      return (num * factorialize(num - 1));
  }
}

function countingWays(numberOfDice, numberOfSuccesses)
{
  // n!/(k!*(n-k)! where k is sucesses and n us number of times.
  var top = factorialize(numberOfDice);
  var bottomLeft = factorialize(numberOfSuccesses);
  var bottomRight = factorialize(numberOfDice-numberOfSuccesses);
  var bottom = bottomLeft * bottomRight;
  var retrunValue = top / bottom;
  
  //console.log("countingWays:");
  //console.log("numberOfDice = " + numberOfDice);
  //console.log("numberOfSuccesses = " + numberOfSuccesses);
  //console.log("top = " + top);
  //console.log("bottomLeft = " + bottomLeft);
  //console.log("bottomRight = " + bottomRight);
  //console.log("bottom = " + bottom);
  //console.log("retrunValue = " + retrunValue);
  //console.log("");
  
  return retrunValue;
}

function probabilityOfExactlyX(numberOfDice, X, probability)
{
  // P (X=k) = nCk * pk * (1-p)n-k
  // n: number of trials
  // k: number of successes
  // p: probability of success on a given trial
  // nCk: the number of ways to obtain k successes in n trials
  var waysToGetX = countingWays(numberOfDice, X);
  var left = waysToGetX;
  var middle = Math.pow(probability, X);
  var right = Math.pow(1-probability, numberOfDice-X);
  var returnValue = left * middle * right;
  
  //console.log("probabilityOfExactlyX:");
  //console.log("numberOfDice = " + numberOfDice);
  //console.log("X = " + X);
  //console.log("probability = " + probability);
  //console.log("waysToGetX = " + waysToGetX);
  //console.log("left = " + left);
  //console.log("middle = " + middle);
  //console.log("right = " + right);
  //console.log("returnValue = " + returnValue);
  //console.log("");
  
  return returnValue;
}

function probabilityOfAtLeastX(numberOfDice, X, probability)
{
  var returnValue = 1;
  for (let exactlyX = 0; exactlyX < X; exactlyX++) {
    returnValue -= probabilityOfExactlyX(numberOfDice, exactlyX, probability);
  }
  return returnValue;
}

function testOne()
{
  var odds = 0.25;
  var totalNumberOf = 5;
  var numberofAtLeast = 2;
  
  var exactly_0 = probabilityOfExactlyX(totalNumberOf, 0, odds);
  var exactly_1 = probabilityOfExactlyX(totalNumberOf, 1, odds);
  var atLeast_2 = 1 - exactly_0 - exactly_1;
  
  //console.log("FreeThrowExample:");
  //console.log("exactly_0 0.2337 = " + exactly_0);
  //console.log("exactly_1 0.3955 = " + exactly_1);
  //console.log("Should be 0.3673 = " + atLeast_2);
  //console.log("Should be 0.3673 = " + probabilityOfAtLeastX(totalNumberOf, numberofAtLeast, odds));
}

function getData()
{
  this.dice = parseInt(document.getElementById("numberOfDice").value, 10);
  this.tn = parseInt(document.getElementById("targetNumber").value, 10);
  this.as = parseInt(document.getElementById("automaticSucessess").value, 10);
  this.desired = parseInt(document.getElementById("desiredResult").value, 10);
  
  this.odds = getOdds(this.tn);
  //console.log("TN " + this.tn + " produces odds of " + this.odds);
  
  this.averageResultJustDice = this.dice * this.odds;
  //console.log("From the Dice, this gives you " + this.averageResultJustDice);
  
  this.averageResultRaw = this.averageResultJustDice + this.as;
  //console.log("Adding the AS makes it " + this.averageResultRaw);
  
  this.averageResult = Number(this.averageResultRaw.toFixed(2));
  //console.log("Rounding makes it " + this.averageResult);
  
  this.rollText = this.dice + "D10 TN" + this.tn + " ";
  if (this.as < 0) { this.rollText += " " + this.as + "AS"; }
  else if (this.as > 0) { this.rollText += " +" + this.as + "AS";}
  
  //console.log("We want to get at least " + this.desired + " Succsesses");
  this.neededFromDice = this.desired - this.as;
  //console.log("So we need at least " + this.neededFromDice + " from the dice because of the AS");
  
  this.percentageChanceOfAtLeastN_raw = probabilityOfAtLeastX(this.dice, this.neededFromDice, this.odds);
  //console.log("which is " +  this.percentageChanceOfAtLeastN_raw);
  
  this.percentageChanceOfAtLeastN_scaled = this.percentageChanceOfAtLeastN_raw * 100;
  //console.log("which is " +  this.percentageChanceOfAtLeastN_scaled + " After being scaled from 0-1 to 0-100.");
  
  this.percentageChanceOfAtLeastN = Number(this.percentageChanceOfAtLeastN_scaled.toFixed(2));
  //console.log("and cleaned up is " +  this.percentageChanceOfAtLeastN);
}

function populateResults()
{
  var rawData = new getData();
  
  document.getElementById("diceRollded").innerHTML = rawData.rollText;
  document.getElementById("averageResult").innerHTML = rawData.averageResult;
  document.getElementById("percentageChance").innerHTML = rawData.percentageChanceOfAtLeastN;
}

function setupDefaultSelections()
{
	var defaultSelectBox = document.getElementById("defaultSelectID");	
	for (let currentOption = 0; currentOption < defaultOptions.length; currentOption++)
	{
		var newOption = new Option(defaultOptions[currentOption].description, currentOption);
		defaultSelectBox.add(newOption, undefined);
	}
	defaultSelectBox.value = -1;
	
	var diceSelectBox = document.getElementById("numberOfDice");	
	for (let currentValue = numberOfDiceOptions.minimum; currentValue <= numberOfDiceOptions.maximum; currentValue++)
	{
		var newOption = new Option(currentValue, currentValue);
		diceSelectBox.add(newOption, undefined);
	}
	diceSelectBox.value = numberOfDiceOptions.default;
	
	var targetNumberSelectBox = document.getElementById("targetNumber");	
	for (let currentValue = targetNumberOptions.minimum; currentValue <= targetNumberOptions.maximum; currentValue++)
	{
		var newOption = new Option(currentValue, currentValue);
		targetNumberSelectBox.add(newOption, undefined);
	}
	targetNumberSelectBox.value = targetNumberOptions.default;
	
	var autoSuccessesSelectBox = document.getElementById("automaticSucessess");	
	for (let currentValue = autoSuccessesOptions.minimum; currentValue <= autoSuccessesOptions.maximum; currentValue++)
	{
		var newOption = new Option(currentValue, currentValue);
		autoSuccessesSelectBox.add(newOption, undefined);
	}
	autoSuccessesSelectBox.value = autoSuccessesOptions.default;
	
	var desiredResultSelectBox = document.getElementById("desiredResult");	
	for (let currentValue = desiredResultOptions.minimum; currentValue <= desiredResultOptions.maximum; currentValue++)
	{
		var newOption = new Option(currentValue, currentValue);
		desiredResultSelectBox.add(newOption, undefined);
	}
	desiredResultSelectBox.value = desiredResultOptions.default;
}

function applyDefaults()
{
	var selectedRow = parseInt(document.getElementById("defaultSelectID").value, 10);
	
	if (selectedRow < defaultOptions.length)
	{
		document.getElementById("numberOfDice").value = defaultOptions[selectedRow].dice;
		document.getElementById("targetNumber").value = defaultOptions[selectedRow].tn;
		document.getElementById("automaticSucessess").value = defaultOptions[selectedRow].as;
		populateResults();
	
	}
	else
	{
		console.log("Error, Value from Select box out of range of array!");
	}
}

function bodyLoad()
{
	setupDefaultSelections();
	
	populateResults();
}