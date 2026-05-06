"use server";

import { PinataSDK } from "pinata-web3";

// Note: Ensure PINATA_JWT is configured in .env.local
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export async function uploadToIPFS(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // In a real production scenario, you would probably want to validate file type (e.g. only PDFs) and size here.
    
    // Upload the file directly to IPFS using Pinata
    const upload = await pinata.upload.file(file);
    
    return { 
      success: true, 
      cid: upload.IpfsHash,
      url: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${upload.IpfsHash}`
    };
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return { success: false, error: "Failed to upload file to decentralized storage." };
  }
}
