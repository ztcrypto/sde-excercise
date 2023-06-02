# Platform Science Code Exercise

## Description

This code exercise aims to solve the problem of assigning shipment destinations to drivers in a way that maximizes the total suitability score (SS) over the set of drivers. The exercise provides a specific algorithm for determining the suitability score based on various conditions related to the length of the destination's street name and the driver's name.

## Algorithm

The top-secret algorithm for calculating the suitability score (SS) is as follows:

- If the length of the shipment's destination street name is even, the base SS is calculated by multiplying the number of vowels in the driver's name by 1.5.
- If the length of the shipment's destination street name is odd, the base SS is calculated by multiplying the number of consonants in the driver's name by 1.
- If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver's name, the SS is increased by 50% above the base SS.

## Solution

According to top-secret algorithm, We need to find all possible pairs to be matched between driver and destination.

All possible shipment matches count will be permutation P(n, r)

According to drivers and destinations count, n and r value can be different.

## Requirements

- Node.js 16 or above should be installed on your system.

## Usage

To run the script, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal or command prompt and navigate to the project directory.
3. Make sure you have two newline separated files:
   - The first file contains the street addresses of the shipment destinations.
   - The second file contains the names of the drivers.
4. Run the following command:

```bash
node assign-shipments.js <destinations-file> <drivers-file>
```

Make sure to replace `<destinations-file>` and `<drivers-file>` with the actual file paths or names.

For example:

```bash
node assign-shipments.js destinations.txt drivers.txt
```

5. The script will execute and provide the total suitability score and the matching between shipment destinations and drivers as the output.

## Example Input Files

The input files should follow the following format:

**destinations.txt**:

```
44 Fake Dr., San Diego, CA 92122
123 Main St., New York, NY 10001
```

**drivers.txt**:

```
Daniel Davidson
Alice Johnson
```

## Output

The output will include the total suitability score and the matching between shipment destinations and drivers. For example:

```
Total Suitability Score: 20.5
Shipment Assignments:
- Destination: 123 Main St., New York, NY 10001 | Driver: Daniel Davidson | Suitability Score: 13.5
- Destination: 44 Fake Dr., San Diego, CA 92122 | Driver: Alice Johnson | Suitability Score: 7
```
