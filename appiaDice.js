// JavaScript Document

// Probably should NOT be using this. It is orders of magnitude slower.
// A single Iteration of the brute force (with size 10k), when measured with the built in javascript stuff
// on my home PC was of the order 11-14 which is comparable to 2500 iterations of the statistical output
// The problem with the statistical is that its wrong as it does not account for the exploding nature of the wild die.
let useBruteForce = true;
let sizeOfBruteForce = 10000;

let numberOfDiceOptions = { "minimum":1, "maximum":10, "default":8 };
let targetNumberOptions = { "minimum":4, "maximum":20, "default":7 };
let autoSuccessesOptions = { "minimum":-5, "maximum":15, "default":0 };
let desiredResultOptions = { "minimum":1, "maximum":20, "default":4 };

let defaultOptions = [
	{ "description": "Dodge", 						"dice": 10, "tn": 6, 	"as": 3 },
	{ "description": "Second Dodge", 				"dice": 10, "tn": 6,	"as": 3 },
	{ "description": "Third Dodge", 				"dice": 10, "tn": 8, 	"as": 3 },
	{ "description": "Parry", 						"dice": 9, 	"tn": 6, 	"as": 2 },
	{ "description": "Physical Soak", 				"dice": 9, 	"tn": 7, 	"as": 0 },
	{ "description": "Falling Damage Soak", 		"dice": 10, "tn": 7, 	"as": 3 },
	{ "description": "Magical Soak", 				"dice": 4, 	"tn": 7, 	"as": 0 },
	{ "description": "Elemental Soak", 				"dice": 4, 	"tn": 10, 	"as": 0 },
	{ "description": "Willpower (Fear)", 			"dice": 10, "tn": 6, 	"as": 1 },
	{ "description": "Willpower (Resist)", 			"dice": 10, "tn": 7, 	"as": 0 },
	{ "description": "Haste", 						"dice": 10, "tn": 7, 	"as": 1 },
	{ "description": "Haste Push Through", 			"dice": 10, "tn": 7, 	"as": 0 },
	{ "description": "Move(5) + Leap", 				"dice": 10, "tn": 6, 	"as": 8 },
	{ "description": "Throw (Atk)", 				"dice": 10, "tn": 6, 	"as": 4 },
	{ "description": "Throw (Dmg)", 				"dice": 10, "tn": 7, 	"as": 2 },
	{ "description": "Telepathic Shock (Atk)", 		"dice": 10, "tn": 7, 	"as": 3 },
	{ "description": "Telepathic Shock (Dmg)", 		"dice": 10, "tn": 8, 	"as": 1 },
	{ "description": "Telepathic Trickery (Atk)",	"dice": 10, "tn": 7, 	"as": 3 },
	{ "description": "Telepathic Trickery (Dmg)", 	"dice": 10, "tn": 7, 	"as": 1 }
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

function factorialize(num)
{
	if (num < 0)
	{
		return -1;
	}
	else if (num == 0) 
	{
		return 1;
	}
	else
	{
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

	return retrunValue;
}

function probabilityOfExactlyX(numberOfDice, X, probability)
{
	// Where P (X=k) = nCk * pk * (1-p)n-k
	// n: number of trials
	// k: number of successes
	// p: probability of success on a given trial
	// nCk: the number of ways to obtain k successes in n trials
	var waysToGetX = countingWays(numberOfDice, X);
	var left = waysToGetX;
	var middle = Math.pow(probability, X);
	var right = Math.pow(1-probability, numberOfDice-X);
	var returnValue = left * middle * right;

	return returnValue;
}

function probabilityOfAtLeastX(numberOfDice, X, probability)
{
	var returnValue = 1;
	for (let exactlyX = 0; exactlyX < X; exactlyX++)
	{
		returnValue -= probabilityOfExactlyX(numberOfDice, exactlyX, probability);
	}
	return returnValue;
}

function getData()
{
	this.dice = parseInt(document.getElementById("numberOfDice").value, 10);
	this.tn = parseInt(document.getElementById("targetNumber").value, 10);
	this.as = parseInt(document.getElementById("automaticSucessess").value, 10);
	this.desired = parseInt(document.getElementById("desiredResult").value, 10);

	this.odds = getOdds(this.tn);

	this.averageResultJustDice = this.dice * this.odds;

	this.averageResultRaw = this.averageResultJustDice + this.as;

	this.averageResult = Number(this.averageResultRaw.toFixed(1));

	this.rollText = this.dice + "D10 TN" + this.tn + " ";
	if (this.as < 0) { this.rollText += " " + this.as + "AS"; }
	else if (this.as > 0) { this.rollText += " +" + this.as + "AS";}

	this.neededFromDice = this.desired - this.as;

	this.percentageChanceOfAtLeastN_raw = probabilityOfAtLeastX(this.dice, this.neededFromDice, this.odds);

	this.percentageChanceOfAtLeastN_scaled = this.percentageChanceOfAtLeastN_raw * 100;

	this.percentageChanceOfAtLeastN = Number(this.percentageChanceOfAtLeastN_scaled.toFixed(1));
}

function getBruteForceData()
{
	this.dice = parseInt(document.getElementById("numberOfDice").value, 10);
	this.tn = parseInt(document.getElementById("targetNumber").value, 10);
	this.as = parseInt(document.getElementById("automaticSucessess").value, 10);
	this.desired = parseInt(document.getElementById("desiredResult").value, 10);

	this.rollText = this.dice + "D10 TN" + this.tn + " ";
	if (this.as < 0) { this.rollText += " " + this.as + "AS"; }
	else if (this.as > 0) { this.rollText += " +" + this.as + "AS";}

	this.averageResultJustDice = averageRoll(this.dice, this.tn); 
	this.averageResultRaw = this.averageResultJustDice + this.as;
	this.averageResult = Number(this.averageResultRaw.toFixed(1));

	this.neededFromDice = this.desired - this.as;
	this.percentageChanceOfAtLeastN_scaled = bruteForcePercentageThatSucceeded(this.dice, this.tn, this.neededFromDice);
	this.percentageChanceOfAtLeastN = Number(this.percentageChanceOfAtLeastN_scaled.toFixed(1));
}

function populateResults()
{
	var rawData = new getData();

	if (useBruteForce)
	{
		rawData = new getBruteForceData();
	}

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
 
	currentTestFunction();
}

function randomIntFromInterval(min, max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function rollBasicDie()
{
	var dieResult = randomIntFromInterval(1, 10);

	var returnValue = dieResult;

	while (dieResult == 10)
	{
		dieResult = randomIntFromInterval(1, 10);
		returnValue += dieResult;
	}

	return returnValue;
}

function rollWildDieVsTN(targetNumber)
{
	var wildDieTargetNumber = targetNumber;

	if (wildDieTargetNumber > 10) { wildDieTargetNumber = 10; }

	var dieResult = randomIntFromInterval(1, 10);

	var numberOfSuccesses = 0;

	if (dieResult >= targetNumber && dieResult < 10)
	{
		numberOfSuccesses++;
	}
	else if (dieResult == 10)
	{
		numberOfSuccesses++;

		dieResult = randomIntFromInterval(1, 10);

		if (dieResult >= targetNumber && dieResult < 10)
		{
			numberOfSuccesses++;
		}
		else if (dieResult == 10)
		{
			numberOfSuccesses++;
			dieResult = randomIntFromInterval(1, 10);

			if (dieResult >= targetNumber && dieResult < 10)
			{
				numberOfSuccesses++;
			}
			else if (dieResult == 10)
			{
				numberOfSuccesses++;
				dieResult = randomIntFromInterval(1, 10);

				if (dieResult >= targetNumber && dieResult < 10)
				{
					numberOfSuccesses++;
				}
				else if (dieResult == 10)
				{
					numberOfSuccesses++;
					dieResult = randomIntFromInterval(1, 10);

					if (dieResult >= targetNumber && dieResult < 10)
					{
						numberOfSuccesses++;
					}
					else if (dieResult == 10)
					{
						numberOfSuccesses++;
						dieResult = randomIntFromInterval(1, 10);

						if (dieResult >= targetNumber && dieResult < 10)
						{
							numberOfSuccesses++;
						}
						else if (dieResult == 10)
						{
							numberOfSuccesses++;
						}
					}
				}
			}
		}
	}

	return numberOfSuccesses;
}

function rollDieVsTN(targetNumber)
{
	var dieResult = rollBasicDie();

	if (dieResult >= targetNumber)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

function rollDice(numberOfDice, targetNumber)
{
	var wildDieResult = rollWildDieVsTN(targetNumber);

	var normalDiceResult = 0;
	if (numberOfDice > 1)
	{
		while (numberOfDice)
		{
			numberOfDice--;
			normalDiceResult += rollDieVsTN(targetNumber);
		}
	}

	return wildDieResult + normalDiceResult;
}

function averageRoll(numberOfDice, targetNumber)
{
	var totalResult = 0;

	for ( var currentDie = 0; currentDie < sizeOfBruteForce; currentDie++)
	{
		totalResult += rollDice(numberOfDice, targetNumber);
	}

	averageResult_raw = totalResult / sizeOfBruteForce;

	averageResult = Number(averageResult_raw.toFixed(1));

	return averageResult;
}

function bruteForcePercentageThatSucceeded(numberOfDice, targetNumber, atLeastSuccesses)
{
	var ammountThatSucceeded = 0;

	for ( var currentDie = 0; currentDie < sizeOfBruteForce; currentDie++)
	{
		if (rollDice(numberOfDice, targetNumber) >= atLeastSuccesses)
		{
			ammountThatSucceeded++;
		}
	}

	return (ammountThatSucceeded / sizeOfBruteForce) * 100;
}

function currentTestFunction()
{

}

