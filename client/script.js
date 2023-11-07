let search = document.getElementById("superHeroSearchBar");

let resultCount = document.getElementById("resultCount");

let searchName = document.getElementById("searchName");
let searchRace = document.getElementById("searchRace");
let searchPublisher = document.getElementById("searchPublisher");
let searchPower = document.getElementById("searchPower");

searchName.addEventListener('click', searchByName);
searchRace.addEventListener('click', searchByRace);
searchPublisher.addEventListener('click', searchByPublisher);
searchPower.addEventListener('click', searchByPower);

let listSearchBar = document.getElementById("listSearchBar");

let findList = document.getElementById("findList");
let editList = document.getElementById("editList");
let deleteList = document.getElementById("deleteList");
let createList = document.getElementById("createList");

findList.addEventListener('click', search_list);
editList.addEventListener('click', edit_list);
deleteList.addEventListener('click', delete_list);
createList.addEventListener('click', create_list);

let resultActions = document.getElementById("resultActions");
let resultsSection = document.getElementById("results");

let sortName = document.getElementById("sortByName");
let sortRace = document.getElementById("sortByRace");
let sortPublisher = document.getElementById("sortByPublisher");
let sortPower = document.getElementById("sortByPower");

sortName.addEventListener('click', sortByName);
sortRace.addEventListener('click', sortByRace);
sortPublisher.addEventListener('click', sortByPublisher);
sortPower.addEventListener('click', sortByPower);


let selected = []
let lastResults = []

function searchByName(){
    clearResults();
    console.log("Searching for Name")
    fetch(`/api/getSuperheroByName/${search.value}`)
    .then(res => res.json()
    .then(data => {
        console.log(data)
        lastResults = data
        generateResults(lastResults)
    }))
}

function searchByRace(){
    clearResults()
    console.log("Searching for Race")
    fetch(`/api/getSuperheroByRace/${search.value}`)
    .then(res => res.json()
    .then(data => {
        console.log(data)
        lastResults = data
        generateResults(lastResults)
    }))
}

function searchByPublisher(){
    clearResults()
    console.log("Searching for Publisher")
    fetch(`/api/getSuperheroByPublisher/${search.value}`)
    .then(res => res.json()
    .then(data => {
        console.log(data)
        lastResults = data
        generateResults(lastResults)
    }))
}

function searchByPower(){
    clearResults()
    console.log("Searching for Name")
    fetch(`/api/getSuperheroByPower/${search.value}`)
    .then(res => res.json()
    .then(data => {
        console.log(data)
        lastResults = data
        generateResults(lastResults)
    }))
}



function addSelected(e){
    let heroId = e.target.dataset.heroId;
    if(e.target.checked){
        selected.push(heroId);
    } else {
        selected = selected.filter(id => id !== heroId);
    }
    console.log(`Hero ID: ${heroId}`);
    console.log(`Selected Heroes: ${selected}`);
}



function clearResults() {
    while (resultsSection.firstChild) {
      resultsSection.removeChild(resultsSection.firstChild);
    }
}
  


function search_list() {
    let listName = document.getElementById('listSearchBar').value;
    if (!listName) {
      alert('Please enter a list name to search.');
      return;
    }
  
    // Fetch the list by name
    fetch(`/api/list/${listName}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        return res.json(); // Expect the API to return JSON data
      })
      .then(listResults => {
        if (listResults.length === 0) {
          alert('No superheroes found in this list.');
        } else {
          // Directly display the JSON data for the superheroes in the list
          displaySuperheroes(listResults);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.message);
      });
}
  
function displaySuperheroes(superheroes) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = ''; // Clear previous results
  

    if (!Array.isArray(superheroes)) {
        console.error('Expected superheroes to be an array but received:', superheroes);
        return; // Exit the function if superheroes is not an array.
    }


    // Create and append a preformatted text element for each superhero's JSON data
    superheroes.forEach(hero => {
      let preElement = document.createElement('pre'); 
      preElement.textContent = JSON.stringify(hero, null, 2); 
      resultsElement.appendChild(preElement);
    });
}
  


function edit_list() {
    // Get the max number of results to use for editing the list from the resultCount input field
    let maxResults = parseInt(document.getElementById('resultCount').value, 10);
    maxResults = !isNaN(maxResults) ? maxResults : lastResults.length;
    maxResults = maxResults <= lastResults.length ? maxResults : lastResults.length;

    // Use slice to get only up to the maxResults of lastResults for editing
    let resultsToEdit = lastResults.slice(0, maxResults);

    if (resultsToEdit.length === 0) {
      console.log("No results to edit in the list.");
      return;
    }

    // Edit an existing list with the new results
    fetch(`/api/list/${document.getElementById('listSearchBar').value}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(resultsToEdit)
    })
    .then(res => {
        if (!res.ok) { 
          throw new Error(`HTTP status ${res.status}`);
        }
        return res.json(); 
    })
    .then(data => {
        console.log('List updated with response:', data);
        alert('List updated successfully!');
    })
    .catch(error => {
        console.error('Error:', error); 
        alert('An error occurred while editing the list.'); 
    });
}

function delete_list(){
    let listName = document.getElementById('listSearchBar').value; // Get the list name from the input field

    if (!listName.trim()) {
        alert('Please enter a list name to delete.');
        return; 
    }

    fetch(`/api/list/${listName}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP status ${res.status}`);
        }
        return res.text(); 
    })
    .then(text => {
        console.log(`List ${listName} deleted:`, text);
        alert('List deleted successfully!'); // Alert the user that the list has been deleted
        clearResults();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the list.'); // Alert the user about the error
    });
}





function create_list() {
    // Get the max number of results to use for creating the list from the resultCount input field
    let maxResults = parseInt(resultCount.value, 10);
    maxResults = !isNaN(maxResults) ? maxResults : lastResults.length;
    maxResults = maxResults <= lastResults.length ? maxResults : lastResults.length;

    // Use slice to get only up to the maxResults of lastResults
    let resultsToSave = lastResults.slice(0, maxResults);

    if (resultsToSave.length === 0) {
      console.log("No results to add to the list.");
      return; // Exit the function if there are no results to save.
    }

    // Create a list with only the shown results
    fetch(`/api/list/${listSearchBar.value}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(resultsToSave) // Sending the slice of lastResults that represents the shown results
    })
    .then(res => {
        if (!res.ok) { // Check if the response is not OK, then throw an error.
          throw new Error(`HTTP status ${res.status}`);
        }
        return res.text();
      })
    .then(text => {
        console.log(text); 
        alert('List created successfully!'); // Alert the user that the list has been created successfully
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors during fetch
        alert('An error occurred while creating the list.'); // Alert the user about the error
    });
}




function sortByName(){
    lastResults.sort(function(a,b){return a.name.localeCompare(b.name)})
    clearResults()
    generateResults(lastResults)
}

function sortByPower(){
    lastResults.sort(function(a, b){
        let aPowerCount = Object.values(a.powers).filter(value => value === "True").length;
        let bPowerCount = Object.values(b.powers).filter(value => value === "True").length;

        return bPowerCount - aPowerCount;
    });
    clearResults();
    generateResults(lastResults);
}

function sortByPublisher(){
    lastResults.sort(function(a,b){return a.Publisher.localeCompare(b.Publisher)})
    clearResults()
    generateResults(lastResults)
}

function sortByRace(){
    console.log(lastResults[0])
    lastResults.sort(function(a,b){return a.Race.localeCompare(b.Race)})
    clearResults()
    generateResults(lastResults)
}



function generateResults(data) {
    clearResults(); // Clears the current results

    let maxResults = parseInt(resultCount.value, 10);
    maxResults = !isNaN(maxResults) ? maxResults : data.length;
    maxResults = maxResults <= data.length ? maxResults : data.length;

    for (let i = 0; i < maxResults; i++) {
        // Start by creating a new object that only contains the powers with 'True' values
        let filteredPowers = {};
        for (let power in data[i].powers) {
            if (data[i].powers[power] === "True") {
                filteredPowers[power] = data[i].powers[power];
            }
        }
        
        // Create a new object to store the superhero information along with the filtered powers
        let heroWithFilteredPowers = {
            ...data[i], // spread the existing data
            powers: filteredPowers, // replace the powers with the filtered powers
        };

        let pre = document.createElement("pre");
        pre.textContent = JSON.stringify(heroWithFilteredPowers, null, 2);
        resultsSection.appendChild(pre);
    }

    resultCount.value = maxResults; // Update the input field to show the number of displayed results
}

