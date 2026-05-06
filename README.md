# PepVerify
*On-chain transparency and scientific verification for the research peptide ecosystem.*

![PepVerify Platform](https://img.shields.io/badge/Status-Beta-emerald.svg)
![Solana](https://img.shields.io/badge/Built_on-Solana-14F195?logo=solana&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## 🧬 Overview

**PepVerify** is a decentralized, enterprise-grade scientific transparency hub designed specifically for the research peptide ecosystem. It serves as an immutable ledger and verification layer where third-party lab reports (COAs, HPLC, LC-MS) are permanently stored, timestamped, and cryptographically signed.

By shifting trust from opaque supplier claims to verifiable on-chain evidence, PepVerify functions as the definitive "Bloomberg Terminal" for peptide research intelligence.

---

## 🛑 The Problem

The current research peptide ecosystem suffers from a severe lack of trust:
- **Fraudulent Documentation:** Certificates of Analysis (COAs) and High-Performance Liquid Chromatography (HPLC) reports are frequently forged, manipulated, or reused across completely different batches.
- **Ephemeral Evidence:** Legitimate testing reports are often hosted on temporary links or centralized servers that can be deleted or altered after the fact.
- **Subjective Reputation:** Supplier reputation is based on subjective, easily manipulated forum reviews rather than objective scientific data.

## 💡 The Solution

We introduce cryptographic provenance to scientific evidence. When a lab report is generated, it is uploaded to decentralized storage (IPFS) and anchored to the Solana blockchain via a cryptographic signature using the **Solana Attestation Service (SAS)**.

This guarantees:
1. **Immutable Evidence:** Reports cannot be secretly altered or deleted.
2. **Public Provenance:** Anyone can trace the exact wallet that verified a specific batch.
3. **Algorithmic Reputation:** Supplier Trust Scores are derived directly from the volume, recency, and quality of their verifiable on-chain attestations.

---

## 🏗️ How It Works

1. **Upload:** A user or supplier uploads a new 3rd-party lab report (PDF) to the platform.
2. **IPFS Pinning:** The PDF is pinned to the InterPlanetary File System, generating a unique Content Identifier (CID).
3. **Metadata Structuring:** Key data (Batch Number, Purity %, Testing Lab) is extracted.
4. **On-Chain Signature:** The metadata and IPFS CID are bundled into a payload. The user signs this payload using their Solana wallet.
5. **SAS Record:** The Solana Attestation Service records the hash on-chain, forever proving *who* uploaded the document and *when*.

---

## 💻 Tech Stack & Resources Used

PepVerify is built with a highly performant, production-grade modern stack. 

### Core Technologies & Open Source Repositories
We stand on the shoulders of giants. This platform was built utilizing the following incredible open-source projects:

* **[Next.js 15 (App Router)](https://github.com/vercel/next.js):** React framework for server-side rendering and static generation.
* **[Tailwind CSS v4](https://github.com/tailwindlabs/tailwindcss):** Utility-first CSS framework for rapid UI development.
* **[shadcn/ui](https://github.com/shadcn-ui/ui) & [Radix UI](https://github.com/radix-ui/primitives):** Accessible, unstyled React components for the enterprise-grade dark-mode design system.
* **[Solana Web3.js](https://github.com/solana-labs/solana-web3.js):** Solana JavaScript API for interacting with the blockchain.
* **[Solana Wallet Adapter](https://github.com/anza-xyz/wallet-adapter):** Modular wallet adapters for Solana applications.
* **[Solana Attestation Service (SAS)](https://github.com/solana-foundation/solana-attestation-service):** The core primitive for recording immutable evidence and claims on-chain.
* **[Zustand](https://github.com/pmndrs/zustand):** Small, fast, and scalable bearbones state-management.
* **[Lucide Icons](https://github.com/lucide-icons/lucide):** Beautiful & consistent icon toolkit.

### External Resources & Inspiration
- Domain logic modeled after transparency hubs like [Janoshik Analytical](https://janoshik.com) and [PubMed](https://pubmed.ncbi.nlm.nih.gov/).
- UX and UI philosophy inspired by modern compliance and fintech platforms (e.g., Stripe, Linear, Vercel).

---

## 🚀 Local Setup & Installation

To run the platform locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/punchhero/pepverify.git
   cd pepverify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚖️ License

This project is licensed under the **MIT License**.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
