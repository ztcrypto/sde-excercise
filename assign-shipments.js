function generatePermutations(arr, r) {
    const permutations = [];
    const stack = [];
    const visited = new Array(arr.length).fill(false);
  
    function backtrack() {
      if (stack.length === r) {
        permutations.push([...stack]);
        return;
      }
  
      for (let i = 0; i < arr.length; i++) {
        if (!visited[i]) {
          stack.push(arr[i]);
          visited[i] = true;
          backtrack();
          stack.pop();
          visited[i] = false;
        }
      }
    }
  
    backtrack();
  
    return permutations;
  }
  
  function assignShipments(destinationsFile, driversFile) {
    // Read and parse the destinations and drivers files
    const destinations = parseFile(destinationsFile);
    const drivers = parseFile(driversFile);

    if(!drivers.length || !destinations.length) {
        throw Error("Drivers and destinations count must be bigger than zero!");
    }

    const isMoreDrivers = drivers.length > destinations.length;
    const maxShipmentCount = Math.min(drivers.length, destinations.length);
  
    // Generate all possible permutations of drivers or destinations
    const permutations = isMoreDrivers ? generatePermutations(drivers, maxShipmentCount)
                          :generatePermutations(destinations, maxShipmentCount);
  
    let maxTotalSuitabilityScore = -Infinity;
    let bestMatch = [];
  
    // Iterate over each driver permutation and calculate the total suitability score
    for (const permutation of permutations) {
      const assignedShipments = [];
      let totalSuitabilityScore = 0;
  
      for (let i = 0; i < maxShipmentCount; i++) {
        const destination = isMoreDrivers ? destinations[i] : permutation[i];
        const driver = isMoreDrivers ? permutation[i] : drivers[i];
        const suitabilityScore = calculateSuitabilityScore(driver, destination);
  
        assignedShipments.push({ destination, driver, suitabilityScore });
        totalSuitabilityScore += suitabilityScore;
      }
  
      if (totalSuitabilityScore > maxTotalSuitabilityScore) {
        maxTotalSuitabilityScore = totalSuitabilityScore;
        bestMatch = assignedShipments;
      }
    }
  
    return { totalSuitabilityScore: maxTotalSuitabilityScore, assignedShipments: bestMatch };
  }
  
  function parseFile(file) {
    // Read the file and parse its contents into an array
    // You can implement your own logic here to parse the file based on your file format
    // For simplicity, let's assume each line contains one entry
    return file.trim().split('\n');
  }
  
  function calculateSuitabilityScore(driver, destination) {
    const driverNameLength = driver.length;
    const destinationStreetLength = getDestinationStreetLength(destination);
  
    // Calculate the base suitability score
    let baseSuitabilityScore;
    if (destinationStreetLength % 2 === 0) {
      baseSuitabilityScore = countVowels(driver) * 1.5;
    } else {
      baseSuitabilityScore = countConsonants(driver);
    }
  
    // Check if the destination length shares any common factors with the driver name length
    const hasCommonFactors = hasCommonFactorsExcludingOne(driverNameLength, destinationStreetLength);
    if (hasCommonFactors) {
      baseSuitabilityScore *= 1.5; // Increase the suitability score by 50%
    }
  
    return baseSuitabilityScore;
  }
  
  function getDestinationStreetLength(destination) {
    // Implement the logic here to extract the street name length from the destination
    // For simplicity, let's assume the street name is the first part before a comma
    const streetName = destination.split(',')[0];
    return streetName.trim().length;
  }
  
  function countVowels(str) {
    // Count the number of vowels in a string
    return str.match(/[aeiou]/gi).length;
  }
  
  function countConsonants(str) {
    // Count the number of consonants in a string
    return str.match(/[b-df-hj-np-tv-z]/gi).length;
  }
  
  function hasCommonFactorsExcludingOne(a, b) {
    // Check if two numbers have any common factors excluding 1
    while(b) {
    	let t = b;
    	b = a % b;
    	a = t;
  	}
    return a !== 1;
  }
  
  const fs = require("fs");
  let args = process.argv.slice(2)
  try {
    const destinationsFile = fs.readFileSync(args[0], 'utf8');  
    const driversFile = fs.readFileSync(args[1], 'utf8')
    
    const {totalSuitabilityScore, assignedShipments} = assignShipments(destinationsFile, driversFile);
    console.log(`Total Suitability Score: ${totalSuitabilityScore}`);
    console.log('Shipment Assignments:');
    assignedShipments.forEach(({destination, driver, suitabilityScore}) =>  
      console.log(`- Destination: ${destination} | Driver: ${driver} | Suitability Score: ${suitabilityScore}`))
  } catch(err) {
    console.log(err)
  }