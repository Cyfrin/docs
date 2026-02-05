# Findings Severity

## Overview

Cyfrin categorizes vulnerability findings into three severity levels to help stakeholders prioritize remediation efforts. Auditors who identify higher-severity vulnerabilities improve their contest rankings and earn higher payouts.

## Severity Categories

The framework uses three tiers:
- **High**
- **Medium**
- **Low severity**

## Evaluation Framework

Severity classification depends on three factors:

1. **Impact on the protocol** — potential damage if exploited
2. **Likelihood of exploitation** — probability an attacker could succeed
3. **Judge/protocol subjectivity** — discretionary assessment

### Impact vs. Likelihood Matrix

| | High Impact | Medium Impact | Low Impact |
|---|---|---|---|
| **High Likelihood** | H | M | M |
| **Medium Likelihood** | M | M | L |
| **Low Likelihood** | M | L | L |

## Impact Definitions

**High Impact:** "Funds are directly or nearly directly at risk" or severe protocol disruption occurs.

**Medium Impact:** Indirect fund risk or moderate functionality disruption.

**Low Impact:** "Funds are not at risk" but functions may be incorrect or state handling inadequate.

## Likelihood Definitions

**High:** Easily exploitable (direct function calls extracting funds)

**Medium:** Requires specific conditions (unusual token parameters)

**Low:** Unlikely scenarios (hard-to-change variables at specific blocks)

*Note:* Claims of "computationally infeasible" attacks require proof of feasibility.

## Finding Examples

**High severity** features straightforward attack paths with direct fund impact.

**Medium severity** involves indirect impact requiring specific conditions.

**Low severity** shows minimal real-world damage potential with improbable exploitation paths.

## Non-Acceptable Submissions

As of August 18, 2023, CodeHawks rejects "Gas, QA, or Informational" severity submissions—focus on vulnerabilities directly impacting protocols, not optimization insights.
