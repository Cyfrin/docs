---
title: "Findings Validity"
---


## Overview

To qualify as valid, findings must satisfy all listed properties:

- **Timing**: Submissions occur during official contest duration only
- **Legitimacy**: Identify genuine vulnerabilities in the codebase
- **Severity**: Gas/QA/Informational issues ineligible for rewards regardless of accuracy
- **Documentation**: Provide substantial details and proof; submissions "relying solely or primarily on AI responses" face invalidation

## Contest-Specific Guidelines

Two criteria determine finding validity:

1. Official contest specification on CodeHawks platform
2. In-scope code

Sponsors receive a 48-hour kick-off period to clarify ambiguities via Discord. Post-deadline, the updated specification becomes definitive. Sponsors cannot retroactively invalidate submissions through "moving the goalposts" tactics—only when submissions fail predefined criteria.

## Vague Generalities

Vague claims receive automatic rejection. Examples include asserting potential reentrancy without demonstrating actual vulnerability or suggesting hash collision risks without proof.

Auditors must create a proof-of-concept (PoC) proving significant system damage or denial-of-service impact. Only auditors submitting actual exploits with PoCs receive rewards for proving vague submissions valid.

## Typically Invalid Categories

Issues commonly rejected include:

- Gas optimizations
- Zero-address validation
- Admin input mistakes
- Front-runner initializer attacks (if redeployment possible)
- UX/design preferences
- User self-harm through blacklisting
- EIP non-compliance without external integrations
- Accidental token transfers
- Reward loss outside protocol design
- View function errors (unless causing fund loss)
- Mock contract problems
- Slippage (unless showing definite loss)
- Out-of-gas scenarios

**Note**: This table provides guidance only; judges retain discretion on final determinations.
