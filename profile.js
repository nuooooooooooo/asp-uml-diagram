import { loadPick } from './helpers.js'

export let user = '';

export let cat = {};

export function resetCat() {
  //function to resset the cat's profile
    cat.name = '';
    cat.weight = 0;
    cat.age = 0;
    cat.neutered = 'Intact';
    cat.activity = 'Indoor'
    cat.bodyCondition = 'Ideal';
    cat.lifeStage = 'Adult'
}

export function loadCat() {
  /*Function to load up and decrypt the cat's profile. Using .then as the loadpick function is asynchronised. 
  We need to wait first to finish the loadPick, to asign it's value to something else*/

let tempName = loadPick('Name').then ((tempName) =>{
   cat.name=tempName;
});

let tempWeight = loadPick('Weight').then ((tempWeight) =>{
  cat.weight=tempWeight;
});

let tempAge = loadPick('Age').then ((tempAge) =>{
  cat.age=tempAge;
});

let tempNeu = loadPick('Neutered').then ((tempNeu) =>{
  cat.neutered=tempNeu;
});

let tempActivity = loadPick('Activity').then ((tempActivity) =>{
  cat.activity=tempActivity;
});

let tempBodyCondition = loadPick('BodyCondition').then ((tempBodyCondition) =>{
  cat.bodyCondition=tempBodyCondition;
});

let tempLifeStage = loadPick('LifeStage').then ((tempLifeStage) =>{
  cat.lifeStage=tempLifeStage;
});

}
