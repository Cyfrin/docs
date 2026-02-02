---
title: "How Payouts Work"
---


## Overview

Auditor compensation is determined by shares of the prize pool based on finding severity and quantity submitted during smart contract auditing competitions.

## High/Medium Findings Calculation

**Formula:**
- Medium-Risk Shares: `1 * (0.9^(findingCount - 1)) / findingCount`
- High-Risk Shares: `5 * (0.9^(findingCount - 1)) / findingCount`

**Worked Example:**

With a $30,000 H/M prize pool containing 3 highs and 2 mediums:

| Finding | Count | Shares |
|---------|-------|--------|
| Medium A | 3 | 0.27 |
| Medium B | 2 | 0.45 |
| Medium C | 1 | 1.00 |
| High A | 3 | 1.35 |
| High B | 1 | 5.00 |
| High C | 1 | 5.00 |

**Results:**
- Auditor A (6.62 total shares): 39.5% = $11,850
- Auditor B (7.07 total shares): 42.2% = $12,660
- Auditor C (3.07 total shares): 18.3% = $5,490

## Low Findings

Uses formula: `1 * (0.9^(findingCount - 1)) / findingCount` with considerably smaller prize pools.

## Payment Details

- **Currency:** USDC
- **Network:** ZKsync chain
- **Requirement:** ZKsync wallet connection to user profile
- **Tolerance:** ±0.0001 USDC margin of error

## Discontinued Categories

As of August 18, 2023, gas optimization, QA, and informational submissions are no longer accepted.

## Duplicate Issues

Duplicates share identical root causes, regardless of severity differences. Different root causes constitute separate findings.
