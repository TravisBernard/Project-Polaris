# Unused letters

## Spec
Given a string of English letters, write a function that returns all the letters of the alphabet that are unused. For example the string “A slow yellow fox crawls under the proactive dog" would return "bjkmqz" since none of those letters are used. The string “A quick brown fox jumps over the lazy dog”  would return “” since all of the English letters are in that sentence.

## Running

```sh
cd ./unused-letters
npm test
```

# Particle Chamber 

## Spec
We are writing a simulation of a particle chamber where individual particles are leaving the chamber at a constant speed. You must implement this method

function animate(initialPosition: string, speed: number): string[]; 

The initial position will look like something like this “..RR..LL.";

A dot . means there is no particle in that position.
An “R” means that there is a particle traveling to the right in that position. 
An “L” means that there is a particle traveling to the left in that position. 

Speed is the number of positions that each particle travels in a given step. You must return an array of strings that represent the journey of the particles at each step until all the particles have exited the chamber The last string will have all of the particles out of the chamber. Each particle in the output must be represented by the letter X.


See examples below: 

 0)  speed = 2,  initialPosition =  "..R...."
    Returns:    ["..X....",  "....X..", "......X", "......." ]

//    The single particle starts at the 3rd position, moves to the 5th, then
//    7th, and then out of the chamber.

1)   3,  "RR..LRL"
 Returns: [ "XX..XXX",  ".X.XX..",  "X.....X", "......." ]

//    At step 1, there are actually 4 particles in the chamber, but two are

//    passing through each other at the 4th position

2)  2,  "LRLR.LRLR"
    Returns:    [ "XXXX.XXXX",  "X..X.X..X",  ".X.X.X.X.",  ".X.....X.",  "........." ]

//    At step 0 there are 8 particles. At step 1, there are still 6 particles,

//    but only 4 positions are occupied since particles are passing through

//    each other.

3)  10,  "RLRLRLRLRL"
   Returns: [ "XXXXXXXXXX", ".........." ]

//    These particles are moving so fast that they all exit the chamber by

//    step 1.

## Running

```sh
cd ./particle-chamber
npm test
```