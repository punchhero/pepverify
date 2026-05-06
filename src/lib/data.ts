export interface Supplier {
  id: string;
  name: string;
  trustScore: number;
  verified: boolean;
  website: string;
  shipsTo: string[];
  compoundsSupported: string[];
  attestationCount: number;
  description: string;
}

export interface Compound {
  id: string;
  name: string;
  sequence: string;
  casNumber: string;
  description: string;
}

export interface Report {
  id: string;
  supplierId: string;
  compoundId: string;
  batchNumber: string;
  purityPercentage: number;
  testMethod: string;
  labName: string;
  reportDate: string;
  ipfsCid: string;
  uploaderWallet: string;
}

export interface Attestation {
  id: string;
  reportId: string;
  sasAttestationId: string;
  signerWallet: string;
  timestamp: string;
  status: "verified" | "flagged" | "disputed";
}

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "sup-001",
    name: "Peptide Sciences",
    trustScore: 98,
    verified: true,
    website: "https://peptidesciences.com",
    shipsTo: ["Global"],
    compoundsSupported: ["BPC-157", "TB-500", "GHK-Cu", "CJC-1295", "Ipamorelin"],
    attestationCount: 142,
    description: "Industry leader in high-purity research peptides. Extensive independent third-party testing.",
  },
  {
    id: "sup-002",
    name: "Core Peptides",
    trustScore: 92,
    verified: true,
    website: "https://corepeptides.com",
    shipsTo: ["US", "Canada", "UK"],
    compoundsSupported: ["BPC-157", "TB-500", "GHK-Cu", "Selank"],
    attestationCount: 85,
    description: "Premium US-based supplier prioritizing transparent supply chains and comprehensive HPLC reporting.",
  },
  {
    id: "sup-003",
    name: "Limitless Biotech",
    trustScore: 88,
    verified: true,
    website: "https://limitlessbiotech.com",
    shipsTo: ["Global"],
    compoundsSupported: ["BPC-157", "Epitalon", "MOTS-c", "AOD-9604"],
    attestationCount: 56,
    description: "Specializing in longevity and metabolic research compounds with rigorous QA processes.",
  },
  {
    id: "sup-004",
    name: "Swiss Chems",
    trustScore: 85,
    verified: true,
    website: "https://swisschems.is",
    shipsTo: ["Global"],
    compoundsSupported: ["BPC-157", "PT-141", "PEG-MGF"],
    attestationCount: 42,
    description: "Broad spectrum research chemical supplier. Consistent verified COAs but occasionally delayed reporting.",
  },
  {
    id: "sup-005",
    name: "Science.bio",
    trustScore: 95,
    verified: true,
    website: "https://science.bio",
    shipsTo: ["US", "EU"],
    compoundsSupported: ["Semax", "Selank", "CJC-1295", "Ipamorelin"],
    attestationCount: 210,
    description: "Gold standard reference materials. Highly trusted by institutional researchers with flawless verification history.",
  }
];

export const MOCK_COMPOUNDS: Compound[] = [
  {
    id: "cmp-001",
    name: "BPC-157",
    sequence: "L-Val-L-Pro-L-Pro-L-Pro-L-Pro-L-Gly-L-Lys-L-Pro-L-Pro-L-Asp",
    casNumber: "137525-51-0",
    description: "Body Protection Compound-157. A pentadecapeptide discovered in human gastric juice.",
  },
  {
    id: "cmp-002",
    name: "TB-500",
    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser",
    casNumber: "77591-33-4",
    description: "Synthetic fraction of the protein thymosin beta-4, utilized for tissue repair research.",
  },
  {
    id: "cmp-003",
    name: "GHK-Cu",
    sequence: "Gly-His-Lys(Cu2+)",
    casNumber: "49557-75-7",
    description: "Naturally occurring copper complex of the glycyl-L-histidyl-L-lysine peptide.",
  }
];

export const MOCK_REPORTS: Report[] = [
  {
    id: "rep-001",
    supplierId: "sup-001",
    compoundId: "cmp-001",
    batchNumber: "BPC-24-001",
    purityPercentage: 99.4,
    testMethod: "HPLC-UV",
    labName: "Janoshik Analytical",
    reportDate: "2024-04-15",
    ipfsCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    uploaderWallet: "8Xb...3Fz",
  },
  {
    id: "rep-002",
    supplierId: "sup-002",
    compoundId: "cmp-002",
    batchNumber: "TB-23-112",
    purityPercentage: 98.8,
    testMethod: "LC-MS",
    labName: "MZ Biolabs",
    reportDate: "2024-03-22",
    ipfsCid: "bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku",
    uploaderWallet: "9Aa...4Gb",
  },
  {
    id: "rep-003",
    supplierId: "sup-001",
    compoundId: "cmp-003",
    batchNumber: "GHK-24-045",
    purityPercentage: 99.1,
    testMethod: "HPLC-UV",
    labName: "Janoshik Analytical",
    reportDate: "2024-05-01",
    ipfsCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    uploaderWallet: "8Xb...3Fz",
  }
];

export const MOCK_ATTESTATIONS: Attestation[] = [
  {
    id: "att-001",
    reportId: "rep-001",
    sasAttestationId: "SAS-8f72...b91c",
    signerWallet: "8Xb...3Fz",
    timestamp: "2024-04-16T10:23:00Z",
    status: "verified",
  },
  {
    id: "att-002",
    reportId: "rep-002",
    sasAttestationId: "SAS-4e21...a83d",
    signerWallet: "9Aa...4Gb",
    timestamp: "2024-03-25T14:45:00Z",
    status: "verified",
  },
  {
    id: "att-003",
    reportId: "rep-003",
    sasAttestationId: "SAS-9c54...f21e",
    signerWallet: "8Xb...3Fz",
    timestamp: "2024-05-02T09:12:00Z",
    status: "verified",
  }
];
