<div align="center">
  <img src="https://img.shields.io/badge/DeSci-Infrastructure-14F195?style=for-the-badge&logo=solana&logoColor=white" alt="DeSci Infrastructure" />
  <img src="https://img.shields.io/badge/Status-Beta-emerald?style=for-the-badge" alt="Status Beta" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License MIT" />
  <br />
  <br />
  <h1>PepTrace</h1>
  <p><strong>Decentralized Cryptographic Provenance for Peptide Research</strong></p>
  <p>A DeSci (Decentralized Science) protocol leveraging the Solana Attestation Service (SAS) and IPFS to create an immutable, censorship-resistant layer of scientific evidence and transparency.</p>
</div>

<br />

## 📑 Table of Contents
- [Abstract & Rationale](#-abstract--rationale)
- [Protocol Architecture](#-protocol-architecture)
- [Core Features](#-core-features)
- [Technical Specifications](#-technical-specifications)
- [Open Source Foundations](#-open-source-foundations)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔬 Abstract & Rationale

### The Crisis of Trust in Research Peptides
The distribution and sourcing of research peptides suffer from a systemic reproducibility and trust crisis. Suppliers operate in opaque environments where analytical testing results—such as Certificates of Analysis (COAs), High-Performance Liquid Chromatography (HPLC), and Mass Spectrometry (MS) reports—are frequently manipulated, reused across disparate batches, or quietly deleted. 

Without a decentralized source of truth, independent researchers are forced to rely on subjective, easily manipulated community forums for supplier validation, leading to compromised research integrity and potential safety hazards.

### The PepTrace Solution
**PepTrace** introduces cryptographic provenance to the scientific supply chain. By anchoring analytical lab reports to decentralized storage (IPFS) and binding them to cryptographic signatures on the Solana blockchain, we shift the ecosystem from "trust-based" to "verification-based." 

PepTrace acts as a public good: a highly dense, unalterable "Bloomberg Terminal" for scientific transparency, where reputation is algorithmically derived from immutable on-chain evidence rather than marketing claims.

---

## 🏛️ Protocol Architecture

The PepTrace protocol operates through a deterministic verification pipeline:

1. **Evidence Ingestion:** A researcher or supplier submits a 3rd-party analytical report (PDF).
2. **Decentralized Storage (IPFS):** The document is pinned to the InterPlanetary File System, generating a permanent, tamper-proof Content Identifier (CID).
3. **Metadata Extraction:** Critical structural data is parsed, including:
   - Compound Sequence / Identifier
   - Batch Number
   - Analytical Purity Percentage
   - Testing Methodology (e.g., LC-MS, HPLC-UV)
   - Analytical Laboratory Identity
4. **Cryptographic Anchoring (Solana SAS):** The extracted metadata and the IPFS CID are bundled into a JSON payload. The verifying party signs this payload using their Solana wallet. The Solana Attestation Service (SAS) records the hash of this payload on-chain.
5. **Immutable Provenance:** The resulting on-chain record permanently proves *who* uploaded the document, *when* it was attested, and mathematically guarantees the document has not been altered since the attestation.

---

## ✨ Core Features

- **Zero-Trust Verification:** Mathematical proof of document authenticity and timeline.
- **Algorithmic Trust Scoring:** Supplier reputation is dynamically calculated based on the volume, recency, and verified purity of their on-chain attestations.
- **Evidence Vault:** A decentralized, searchable repository of all historical lab reports linked to specific batches.
- **DAO Governance:** Community-driven dispute resolution for conflicting reports and decentralized curation of verified suppliers.
  Powered by $CAO: 5LdiAnXVcizAe2newmPe2zyrvu3Sb12St9XxM1bTpump
- **Enterprise-Grade UI/UX:** A high-density, document-centric interface built for researchers, avoiding the "crypto-casino" aesthetics typical of early Web3 projects.

---

## 💻 Technical Specifications

PepTrace is engineered for high performance, utilizing a modern, production-ready stack designed for rapid data retrieval and seamless Web3 interaction.

### Frontend Client
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 + native `oklch` color spaces for an academic, deep-navy aesthetic.
- **State Management:** Zustand for localized client states; TanStack Query for asynchronous data caching.

### Web3 & Infrastructure Layer
- **Blockchain:** Solana (Devnet/Mainnet) chosen for high throughput and micro-attestation economic viability.
- **Wallet Integration:** `@solana/wallet-adapter-react` supporting Phantom, Solflare, and Backpack.
- **Attestation Primitive:** `@solana/attestation-service` for standardized on-chain claims.
- **Storage:** IPFS integration via `nft.storage` / `web3.storage`.

---

## 📚 Open Source Foundations

This platform is a composite of extraordinary open-source technologies. We acknowledge and utilize the following foundational repositories:

| Technology | Purpose | Repository |
|:---|:---|:---|
| **Next.js** | Core React SSR Framework | [vercel/next.js](https://github.com/vercel/next.js) |
| **Tailwind CSS** | Utility-first CSS architecture | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) |
| **shadcn/ui** | Accessible UI primitives | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) |
| **Radix UI** | Unstyled accessible components | [radix-ui/primitives](https://github.com/radix-ui/primitives) |
| **Solana Web3** | Core blockchain interaction RPC | [solana-labs/solana-web3.js](https://github.com/solana-labs/solana-web3.js) |
| **Wallet Adapter** | Multi-wallet Solana connections | [anza-xyz/wallet-adapter](https://github.com/anza-xyz/wallet-adapter) |
| **SAS** | Solana Attestation Service | [solana-foundation/solana-attestation-service](https://github.com/solana-foundation/solana-attestation-service) |
| **Zustand** | Bearbones state management | [pmndrs/zustand](https://github.com/pmndrs/zustand) |
| **Lucide** | Minimalist vector iconography | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) |
| **Recharts** | Composable charting library | [recharts/recharts](https://github.com/recharts/recharts) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.17.0 or higher)
- npm or yarn
- A Solana Wallet browser extension (e.g., Phantom)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/punchhero/PepTrace.git
   cd PepTrace
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Duplicate the `.env.example` file and rename it to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase, Pinata (IPFS), and Solana RPC credentials in the `.env.local` file.

4. **Initialize the Database:**
   Navigate to the `supabase/migrations/` directory. Copy the contents of `0000_initial_schema.sql` and execute it in your Supabase project's SQL Editor to instantly provision your tables, Row Level Security (RLS) policies, and mock data.

5. **Launch the development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your preferred browser.

---

## 🤝 Contributing

We welcome contributions from researchers, scientists, and developers passionate about Decentralized Science. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to the existing TypeScript strict guidelines and ESLint configurations.

---

## ⚖️ License

Distributed under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
