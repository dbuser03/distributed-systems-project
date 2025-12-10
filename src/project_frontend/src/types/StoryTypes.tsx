export type StoryStatus =
  | "DRAFT" // User is writing, not submitted
  | "SUBMITTED" // Sent to validators/journalists
  | "UNDER_REVIEW" // Being fact-checked
  | "VERIFIED" // Truth established
  | "PUBLISHED" // Live for public
  | "REJECTED"; // Spam or unverifiable

export type EncryptionMetadata = {
  isEncrypted: boolean;
  algorithm: "AES-GCM" | "RSA" | "NONE";
  // If encrypted, the content field contains ciphertext, not plain text
  // The key might be shared via off-chain channels or encrypted with the journalist's public key
};

export type StoryFile = {
  fileName: string;
  fileData: string; // base64 encoded
};

export type Story = {
  // Public fields
  id: string;
  title: string;
  preview: string;

  // Private fields
  content: string;
  // encryption: EncryptionMetadata;

  status: StoryStatus;

  createdAt: BigInt;
  publishedAt: BigInt | null;
  // ISIC sections - industries
  industryTags: ISICSectionKey[];
  country: CountryCode;

  publisherId: string;

  // File attachments (optional, can be empty or multiple)
  files?: StoryFile[];

  // Voting
  upvotes: number;
  downvotes: number;
};

export type VoteType = "up" | "down" | null;

export type ISICSectionKey =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U";

export type ISICSectionsType = {
  [key in ISICSectionKey]: string;
};

export type CountryCode =
  | "US"
  | "GB"
  | "DE"
  | "FR"
  | "IT"
  | "ES"
  | "NL"
  | "BE"
  | "CH"
  | "AT"
  | "AU"
  | "CA"
  | "JP"
  | "CN"
  | "IN"
  | "BR"
  | "MX"
  | "ZA"
  | "NG"
  | "OTHER";

export type CountriesType = {
  [key in CountryCode]: string;
};
