// JavaScript Document

function randomIntFromInterval(min, max)
{
  this.minimum  = min;
  this.maximum  = max;
  this.randomInRange = Math.floor(Math.random()*(max-min+1)+min);
  console.log("Random Number in Range " + min + " to " + max + " of " + this.randomInRange);
}

function createDangerLevel()
{
  var x = new randomIntFromInterval(1,3)
  this.number = x.randomInRange
  
  switch (x.randomInRange)
  {
    case 1:
      console.log("Danger Level Low");
      this.text = "Low";
      break;
    case 2:
      console.log("Danger Level Medium");
      this.text = "Medium";
      break;
    case 3:
      console.log("Danger Level High");
      this.text = "High";
      break;
  }
}

function createEncounterDanger_1()
{
  var x = new randomIntFromInterval(1,100)
  this.number = x.randomInRange
  
  if (this.number <= 40) {this.text = "People"; console.log("Event Type People");}
  else if (this.number <= 50) {this.text = "Ambush"; console.log("Event Type Ambush");}
  else if (this.number <= 60) {this.text = "Dangerous_Animal"; console.log("Event Type Dangerous_Animal");}
  else if (this.number <= 70) {this.text = "Hazard"; console.log("Event Type Hazard");}
  else if (this.number <= 80) {this.text = "Of_Value"; console.log("Event Type Of_Value");}
  else {this.text = "Benign"; console.log("Event Type Benign");}
}

function createEncounterDanger_2()
{
  var x = new randomIntFromInterval(1,100)
  this.number = x.randomInRange
  
  if (this.number <= 35) {this.text = "People"; console.log("Event Type People");}
  else if (this.number <= 50) {this.text = "Ambush"; console.log("Event Type Ambush");}
  else if (this.number <= 65) {this.text = "Dangerous_Animal"; console.log("Event Type Dangerous_Animal");}
  else if (this.number <= 75) {this.text = "Hazard"; console.log("Event Type Hazard");}
  else if (this.number <= 90) {this.text = "Of_Value"; console.log("Event Type Of_Value");}
  else {this.text = "Benign"; console.log("Event Type Benign");}
}

function createEncounterDanger_3()
{
  var x = new randomIntFromInterval(1,100)
  this.number = x.randomInRange
  
  if (this.number <= 25) {this.text = "People"; console.log("Event Type People");}
  else if (this.number <= 50) {this.text = "Ambush"; console.log("Event Type Ambush");}
  else if (this.number <= 69) {this.text = "Dangerous_Animal"; console.log("Event Type Dangerous_Animal");}
  else if (this.number <= 79) {this.text = "Hazard"; console.log("Event Type Hazard");}
  else if (this.number <= 99) {this.text = "Of_Value"; console.log("Event Type Of_Value");}
  else {this.text = "Benign"; console.log("Event Type Benign");}
}

function createPeople()
{
  this.description = "People Event Description";
}

function createAmbush()
{
  this.description = "Ambush Event Description";
}

function createDangerous_AnimalSize(dangerLevel)
{
  var x = new randomIntFromInterval(1,20)
  this.number = x.randomInRange  
  this.text = ""
  
  if (dangerLevel == 1 && this.number >= 18) {this.text = "Dire ";}
  else if (dangerLevel == 2 && this.number >= 14) {this.text = "Dire ";}  
  else if (dangerLevel == 3 && this.number >= 10) {this.text = "Dire ";}
  
  console.log("Animal Size of " + this.text);
}

function createDangerous_AnimalType()
{
  var x = new randomIntFromInterval(1,800)
  this.number = x.randomInRange
  
  if (this.number <= 100) {this.text = "Alligator";}
  else if (this.number <= 200) {this.text = "Badger";}
  else if (this.number <= 300) {this.text = "Banana Spider";}
  else if (this.number <= 400) {this.text = "Giant Rat";}
  else if (this.number <= 500) {this.text = "Scorpion";}
  else if (this.number <= 600) {this.text = "Venomous Snake";}
  else if (this.number <= 700) {this.text = "Wild Dog";}
  else {this.text = "Wolf";} 
  
  console.log("Animal Type of " + this.text);
}

function createDangerous_Animal(dangerLevel)
{     
  var animalSize = new createDangerous_AnimalSize(dangerLevel)
  var animalType = new createDangerous_AnimalType()
  this.description = animalSize.text + animalType.text;   
  
  console.log("Animal Event of " + this.description);
}

function createHazard()
{
  var x = new randomIntFromInterval(1,100)
  this.number = x.randomInRange
  
  if (this.number <= 30) {this.description = "Trap";}
  else if (this.number <= 45) {this.description = "Bad Water";}
  else if (this.number <= 60) {this.description = "Terrible Storm";}
  else if (this.number <= 75) {this.description = "Heatwave";}
  else if (this.number <= 90) {this.description = "Rockfall";}
  else if (this.number <= 95) {this.description = "Earthquake";}
  else {this.description = "Poisonous Fumes";}
}

function createOf_Value()
{
  var x = new randomIntFromInterval(1,100)
  this.number = x.randomInRange
  
  if (this.number <= 25) {this.description = "Food";}
  else if (this.number <= 43) {this.description = "Dead Person";}
  else if (this.number <= 58) {this.description = "Standard Loot";}
  else if (this.number <= 73) {this.description = "Clue/Pointer";}
  else if (this.number <= 88) {this.description = "Coin Purse";}
  else if (this.number <= 93) {this.description = "Deadly Poisonous Animal";}
  else if (this.number <= 98) {this.description = "Dungeon";}
  else if (this.number <= 99) {this.description = "Just what you need";}
  else {this.description = "Fancy Loot";}
}

function createBenign()
{
  this.description = "Benign Event Description";
}

function createEncounter()
{
  this.dangerLevel = new createDangerLevel()
  
  if (this.dangerLevel.number == 1)
  {
    var x = new createEncounterDanger_1()
    this.encounterType = x.text;
    this.encounterNumber = x.number;    
  }
  else if  (this.dangerLevel.number == 2)
  {
    var x = new createEncounterDanger_2()
    this.encounterType = x.text;
    this.encounterNumber = x.number;    
  }
  else
  {
    var x = new createEncounterDanger_3()
    this.encounterType = x.text;
    this.encounterNumber = x.number;    
  }
  
  switch (this.encounterType)
  {
    case "People":
      var x = new createPeople()
      this.encounterDescription = x.description;
      break;
    case "Ambush":
      var x = new createAmbush()
      this.encounterDescription = x.description;
      break;
    case "Dangerous_Animal":
      var x = new createDangerous_Animal(this.dangerLevel.number)
      this.encounterDescription = x.description;
      break;
    case "Hazard":
      var x = new createHazard()
      this.encounterDescription = x.description;
      break;
    case "Of_Value":
      var x = new createOf_Value()
      this.encounterDescription = x.description;
      break; 
    case "Benign":
      var x = new createBenign()
      this.encounterDescription = x.description;
      break;
  }
}

var myEncounter = new createEncounter()
document.getElementById("appiaDice").innerHTML = 
  "<b>Random Urban Encounter.</b> Rough." + "<br>" + 
  "Danger Level of " + myEncounter.dangerLevel.text + " (" + myEncounter.dangerLevel.number + ")" + "<br>" +
  "Encounter Type of " + myEncounter.encounterType + " (" + myEncounter.encounterNumber + ")" + "<br>" +
  "Encounter description of " + myEncounter.encounterDescription;