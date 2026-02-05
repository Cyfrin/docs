# Write a Proof of Concept (PoC)

## Overview

A Proof of Concept (PoC) demonstrates a concept's feasibility. In smart contract auditing contexts, it illustrates a vulnerability or flaw within a smart contract. Properly constructed PoCs help developers understand issues and their impacts, facilitating resolutions.

## Key Components

### 1. Working Test Case
"This is the most direct way to demonstrate a vulnerability. It should be executable and should clearly show the flaw in action." The test case should be runnable and visibly expose the problem.

### 2. Line-by-Line Comments
Each line requires accompanying explanatory comments detailing its purpose, helping readers understand the PoC's flow and reasoning.

### 3. Clear Separation of Actors
Define distinct roles involved:
- **Attacker**: The entity exploiting the vulnerability
- **Victim**: The entity affected by the exploit
- **Protocol**: The system or platform housing the smart contract

### 4. Detailed Exploit Scenario
When test cases are impractical, provide step-by-step scenarios including:
- **Initial State**: System's starting condition
- **Step 1, 2, etc.**: Sequential attacker actions
- **Outcome**: Exploit results
- **Implications**: Potential consequences

## Recommendations

1. Suggest fixes addressing the vulnerability
2. Link to vulnerable code and relevant resources

## PoC Template

```
## Proof of Concept for [Vulnerability Name]
### Overview: Briefly describe the vulnerability.
### Actors:
- **Attacker**: Description of the attacker's role.
- **Victim**: Description of the victim's role.
- **Protocol**: Description of the protocol's role.
### Working Test Case (if applicable):
```solidity
// Solidity code demonstrating the vulnerability
// Line 1: Explanation
// Line 2: Explanation
```
