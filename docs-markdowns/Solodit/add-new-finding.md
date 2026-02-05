# Add New Finding

**Updated over a year ago**

## Overview

Solodit welcomes contributions from auditors and auditing firms. The process involves forking a GitHub repository, preparing assets, formatting reports, and submitting a pull request.

## Step 1: Fork the Repository

Navigate to the [Solodit Content GitHub repository](https://github.com/solodit/solodit_content/tree/main) and click the fork button in the top right corner. Clone your fork locally:

```
git clone https://github.com/your-user-name/solodit_content.git
```

Within the cloned repository's reports folder, create a new subfolder named after your audit firm or auditor profile.

## Step 2: Prepare Logo Assets

Include two PNG logo files:

**logo_256_256.png**
- Appears in search results and finding detail pages
- Specifications: 256px × 256px, transparent background

**logo_450_225.png**
- Displays on the Solodit landing page
- Specifications: 450px × 225px
- Brand name positioned on the right side
- Colors: background #292634, logo #BBBABD, text #BBBABD

## Step 3: Format Your Reports

Name report files using this pattern: `{Date}-{Protocol}.md`

Structure each report with:
- **Auditor details** at the beginning
- **#Findings** header marking the start of findings
- **Severity classifications**: High Risk, Medium Risk, Low Risk, Gas Optimizations, Informational
- **Finding titles and content** organized under severity headings

Use this template structure:
```
**Auditors** [Name](twitter-link)

# Findings

## High Risk
### Finding Title
[Content]

## Medium Risk
[Continue pattern...]
```

## Step 4: Submit Your Contribution

Push your completed folder to your fork and [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). A Solodit team member will review and provide guidance if needed.
