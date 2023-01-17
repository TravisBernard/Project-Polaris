import { runSimulation } from "./index"

const tddTestData = [
    {
        name: "null startingConfiguration",
        startingConfiguration: null,
        speed: 1,
        expected: [""]
    },
    {
        name: "null speed === 1",
        startingConfiguration: "R",
        speed: null,
        expected: [
            "X",
            "."
        ]
    },
    {
        name: "0 speed === 1 - no infinite loops",
        startingConfiguration: "R",
        speed: 0,
        expected: [
            "X",
            "."
        ]
    },
    {
        name: "invalid characters are '.'",
        startingConfiguration: "abcd7*RxX",
        speed: 10,
        expected: [
            "......X..",
            "........."
        ]
    },
    {
        name: "empty startingConfiguration",
        startingConfiguration: "",
        speed: 1,
        expected: [""]
    },
    {
        name: "no particles (length = 1)",
        startingConfiguration: ".",
        speed: 1,
        expected: ["."]
    },
    {
        name: "no particles (length = 5)",
        startingConfiguration: ".....",
        speed: 1,
        expected: ["....."]
    },
    {
        name: "1 particle slow right",
        startingConfiguration: "R..",
        speed: 1,
        expected: [
            "X..",
            ".X.",
            "..X",
            "...",
        ]
    },
    {
        name: "1 particle slow right, offset",
        startingConfiguration: ".R.",
        speed: 1,
        expected: [
            ".X.",
            "..X",
            "...",
        ]
    },
    {
        name: "1 particle slow left",
        startingConfiguration: "..L",
        speed: 1,
        expected: [
            "..X",
            ".X.",
            "X..",
            "...",
        ]
    },
    {
        name: "1 particle medium right, offset",
        startingConfiguration: "..R....",
        speed: 3,
        expected: [
            "..X....",
            ".....X.",
            "......."
        ]
    },
    {
        name: "1 particle fast right, offset",
        startingConfiguration: "..R....",
        speed: 5,
        expected: [
            "..X....",
            "......."
        ]
    },
    {
        name: "particles pass through",
        startingConfiguration: "R...L",
        speed: 1,
        expected: [
            "X...X",
            ".X.X.",
            "..X..",
            ".X.X.",
            "X...X",
            ".....",
        ]
    },
]

const assessmentTestData = [
    {
        name: "Scenario 0",
        startingConfiguration: "..R....",
        speed: 2,
        expected: ["..X....",  "....X..", "......X", "......." ]
    },
    {
        name: "Scenario 1",
        startingConfiguration: "RR..LRL",
        speed: 3,
        expected: [ "XX..XXX",  ".X.XX..",  "X.....X", "......." ]
    },
    {
        name: "Scenario 2",
        startingConfiguration: "LRLR.LRLR",
        speed: 2,
        expected: [ "XXXX.XXXX",  "X..X.X..X",  ".X.X.X.X.",  ".X.....X.",  "........." ]
    },
    {
        name: "Scenario 3",
        startingConfiguration: "RLRLRLRLRL",
        speed: 10,
        expected: [ "XXXXXXXXXX", ".........." ]
    },
]

describe("TDD tests", () => {
    it.each(tddTestData)('$name', ({speed, startingConfiguration, expected}) => {
        expect(runSimulation(speed as number, startingConfiguration as string)).toEqual(expected)
    })
});

describe("Assessment Scenarios", () => {
    it.each(assessmentTestData)('$name', ({speed, startingConfiguration, expected}) => {
        expect(runSimulation(speed as number, startingConfiguration as string)).toEqual(expected)
    })
});