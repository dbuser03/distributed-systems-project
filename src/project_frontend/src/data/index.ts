import {
  ISICSectionsType,
  Story,
  StoryStatus,
  EncryptionMetadata,
  CountriesType,
} from "../types";

export const ISICSections: ISICSectionsType = {
  A: "Agriculture & Fishing",
  B: "Mining & Quarrying",
  C: "Manufacturing",
  D: "Electricity & Gas Supply",
  E: "Water & Waste Management",
  F: "Construction",
  G: "Wholesale & Retail Trade",
  H: "Transportation & Storage",
  I: "Accommodation & Food Services",
  J: "Information & Communication",
  K: "Financial & Insurance",
  L: "Real Estate",
  M: "Professional & Technical Services",
  N: "Administrative & Support Services",
  O: "Public Administration & Defence",
  P: "Education",
  Q: "Health & Social Work",
  R: "Arts & Entertainment",
  S: "Other Services",
  T: "Household Activities",
  U: "Extraterritorial Organizations",
};

export const Countries: CountriesType = {
  US: "United States",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  BE: "Belgium",
  CH: "Switzerland",
  AT: "Austria",
  AU: "Australia",
  CA: "Canada",
  JP: "Japan",
  CN: "China",
  IN: "India",
  BR: "Brazil",
  MX: "Mexico",
  ZA: "South Africa",
  NG: "Nigeria",
  OTHER: "Other",
};

const dateToBigInt = (dateStr: string | null): BigInt | null => {
  if (!dateStr) return null;
  return BigInt(new Date(dateStr).getTime());
};

const getCreatedAt = (publishedAt: string | null): BigInt => {
  if (publishedAt) {
    const published = new Date(publishedAt).getTime();
    const created = published - 7 * 24 * 60 * 60 * 1000; // 7 days earlier
    return BigInt(created);
  }
  return BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000);
};

const defaultEncryption: EncryptionMetadata = {
  isEncrypted: false,
  algorithm: "NONE",
};

export const mockStories: Story[] = [
  {
    id: "1",
    title: "Corporate Fraud Exposed at Agritech Ltd.",
    preview:
      "A former finance analyst details a scheme to misreport profits and siphon investor funds in a top agricultural firm.",
    content:
      "After several months working at Agritech Ltd., I began noticing unusual patterns in the bookkeeping. Claims for supplies and machinery appeared inflated, with invoices fabricated to mask the siphoning of millions out of R&D funding. Repeated attempts to warn management were ignored. Following dismissal, I provided documented evidence to regulators. Investigations are now underway. The company has issued blanket denials despite mounting pressure from the press and shareholders.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-01-16"),
    publishedAt: dateToBigInt("2025-01-16"),
    industryTags: ["A", "M"],
    country: "US",
    publisherId: "501",
    files: [
      {
        fileName: "financial_records_agritech.pdf",
        fileData:
          "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA1OTUgODQyXS9Db250ZW50cyA0IDAgUj4+CmVuZG9iago0IDAgb2JqCjw8L0xlbmd0aCA0ND4+CnN0cmVhbQpCVAovRjEgMTIgVGYKNzIgNzIwIFRkCihBZ3JpdGVjaCBMdGQuIC0gRmluYW5jaWFsIERpc2NyZXBhbmNpZXMpIFRqCjAgLTI0IFRkCihEb2N1bWVudGVkIEV2aWRlbmNlIG9mIEZyYXVkdWxlbnQgQWN0aXZpdGllcykgVGoKMCAtNDggVGQKKFRoaXMgZG9jdW1lbnQgY29udGFpbnMgZXZpZGVuY2Ugb2YgZmluYW5jaWFsIG1pc3JlcG9ydGluZy4pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMzU4IDAwMDAwIG4NCjAwMDAwMDA0MDcgMDAwMDAgbg0KMDAwMDAwMDAxNSAwMDAwMCBuDQowMDAwMDAwMTA0IDAwMDAwIG4NCjAwMDAwMDA0NjYgMDAwMDAgbg0KdHJhaWxlcgo8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo1MzUKJSVFT0Y=",
      },
      {
        fileName: "audit_report_2024.docx",
        fileData:
          "UEsDBBQABgAIAAAAIQDfpNJsWgEAACAFAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAIooAAC",
      },
    ],
    upvotes: 342,
    downvotes: 23,
  },
  // Removed duplicate story 1b, merged its file into story 1's files array above
  {
    id: "2",
    title: "Unlawful Data Collection in the Telecom Industry",
    preview:
      "A telecommunications engineer exposes illegal data mining from personal mobile phones by a multinational.",
    content:
      "While employed in the IT division, I discovered backdoor software installed on client devices. Sensitive data—including call logs, location, and private messages—was silently uploaded to off-shore servers nightly. Internal emails revealed knowledge of these practices reaching as far as executive leadership. My reports to the compliance office were dismissed, so I have turned over code samples and logs to journalists and privacy rights groups.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-02-05"),
    publishedAt: dateToBigInt("2025-02-05"),
    industryTags: ["J", "D"],
    country: "GB",
    publisherId: "377",
    upvotes: 891,
    downvotes: 45,
  },
  {
    id: "3",
    title: "Unsafe Building Practices Covered Up",
    preview:
      "A construction inspector reveals safety code violations and bribery in large city projects.",
    content:
      "During city inspections, I repeatedly found substandard materials and falsified safety certificates at numerous major construction sites. When I refused to sign off, my supervisor instructed me to look the other way and subsequently reassigned me. The construction firm provided undisclosed gifts to several building officials, as evidenced by wire transfers. I am releasing structural reports and internal memos, and have sent everything to the city authorities.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-02-21"),
    publishedAt: dateToBigInt("2025-02-21"),
    industryTags: ["F", "N"],
    country: "DE",
    publisherId: "612",
    upvotes: 567,
    downvotes: 34,
  },
  {
    id: "4",
    title: "Chemical Plant Falsifies Pollution Records",
    preview:
      "A technician blows the whistle on falsified environmental test data and regulatory evasion.",
    content:
      "Our chemical plant regularly discharged waste beyond legal limits, which I and my colleagues documented. However, our lab chief ordered us to manipulate reporting data before sending them to state regulators. I have kept original test results and have shared them with an environmental NGO. The plant has quietly increased emissions even as it promotes a public image of sustainability.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-03-12"),
    publishedAt: dateToBigInt("2025-03-12"),
    industryTags: ["C", "E", "O"],
    country: "IT",
    publisherId: "825",
    files: [
      {
        fileName: "pollution_test_results.xlsx",
        fileData:
          "UEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAAAAIAAAAbWltZXR5cGVhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldFBLAwQUAAAACAAAAAAAAAAAAAAAAAAAAAAAABMAAAB4bC93b3Jrc2hlZXRzL3NoZWV0MS54bWyNkMFqwzAMhu95h6B7Y2cdg9GlZTDYZbttt+YBYluJR2wZWR6lb786S+lhXLpTJP3f96lRFj/GgXWg0UpR4CyJMYNGSaeaAn8+v94eMAZLhZQaZCgwA8NleXmRU+VVBxZOjvFRAm1oLHBrrU8JMbIFiswjesikRBN0GVkfQsNtSz6TpFunb+RFKNBuiNV8n+1wHK3nQVKBb14GTdH6EQ5VWD8OV+S7+cBN5FpYMMGTfq7w/Pj+kj0nq/R6PqWb7ZalpsvNT0tJNf8DTVRPAVv/+iL/AFBLAwQUAAAACAAAAAAAAAAAAAAAAAAAAAAAABMAAAB4bC93b3Jrc2hlZXRzL3NoZWV0Mi54bWyNkMtqwzAQRfd9iqF7M3ahhVCnLgRCKd2mWzUfYGmsgx5GI6fk71NbgSzdJqtBM/fcc2eh+LbuZPcNXgilcxxlYYSBN1J5tS/x5/b16QnDGEhq0kgNJT6Dxet8cpOT67RheGSdO4oeGqpzXBPRJKWUbECT3cqBoZVKGk2Whns5SK8PJE+TVCnqfsgL73snQ6Jy/Kl5o7m2Xg6lq38c7sxu8wV31ikYoYMn/Vzh+f7jJYuz2exxbpObbNOtpsvJT0sxFf8DUUiPAdv4+hL/A1BLAwQUAAAACAAAAAAAAAAAAAAAAAAAAAAAAA4AAAB4bC93b3JrYm9vay54bWyNkMtqwzAQRfd9iqF7Y7dQQqhTFwKllG7TbZUPsKSxLPRApST/fmUrELJ0m9Wgufec0Qzr19iJLxhCGl3hPE0xSKOUHXuFv7aP90sMIZI2pFcGFP4BwrfN+mqNLtwQvIOISiFwjiciosw5R0FqljoaPXe0skGTDFqNdlQ7Gk7Ej0kiyZTv2pxzT71wQqVwfGtkMN7YoIfKrz4Pt26/+wo761WcIKInfS/w/HD/mJblfrl9SKN6tc033qabfx8spON/IAnpOaLG/36JfwFQSwMEFAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAZAAAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHOtksFqwzAMhu99iqF74yRjjNGlbTDYpe023QNYUW0HWTKSs+TtZ7eE0V62w44+JP37tNjsTh/B91BIJ0JAtloD8UbiNEXw82t19wBUiuXCC2kI4Akq7K7XKy+laQmhFkEqYyGoHAIxBdZKUy1BsRt0qzmWBaK0pnPcf0tHl/OM0jlRH0h7TfwklVLSh/6U5Nn5GE6ldP1veNdsN59xkFZHCSy4l88fwsPj0+th01jTuTxJ6vm8/eGp5OK/IZvpKeLG/35J/gBQSwECPwAUAAAACAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAbWltZXR5cGVQSwECPwAUAAAACAAAAAAAAAAAAAAAAAAAAAAAABMAAAAAAAAAAAAAAABIAAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sUEsBAj8AFAAAAAgAAAAAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAAAAAAA9wAAAHhsL3dvcmtzaGVldHMvc2hlZXQyLnhtbFBLAQI/ABQAAAAIAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAKYBAAB4bC93b3JrYm9vay54bWxQSwECPwAUAAAACAAAAAAAAAAAAAAAAAAAAAAAABkAAAAAAAAAAAAAAAA6AgAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHNQSwUGAAAAAAUABQBFAQAA0QIAAAAA",
      },
    ],
    upvotes: 1203,
    downvotes: 89,
  },
  {
    id: "5",
    title: "Hidden COVID-19 Outbreak in Care Facility",
    preview:
      "A healthcare administrator reveals the intentional underreporting of coronavirus cases and deaths at a private care home.",
    content:
      "During the winter surge, our facility intentionally undercounted cases to avoid scrutiny and fines. Staff were pressured to treat patients off the books. I have medical records and internal directives showing the cover-up and have filed them with a government ombudsman. Management has threatened legal action in response.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-03-28"),
    publishedAt: dateToBigInt("2025-03-28"),
    industryTags: ["Q", "L"],
    country: "FR",
    publisherId: "701",
    upvotes: 2456,
    downvotes: 167,
  },
  {
    id: "6",
    title: "Bribery Uncovered in University Research Grants",
    preview:
      "A junior academic exposes a network of kickbacks and favoritism in allocating public research funding.",
    content:
      "I discovered that certain professors at the university secured research grants for unqualified projects by offering bribes to administrators. Email chains and bank statements support the existence of a multi-year scheme. When I raised suspicions, my contract was not renewed. I have decided to publish the documents anonymously.",
    encryption: defaultEncryption,
    status: "SUBMITTED",
    createdAt: getCreatedAt(null),
    publishedAt: null,
    industryTags: ["P", "K"],
    country: "AU",
    publisherId: "443",
    upvotes: 78,
    downvotes: 12,
  },
  {
    id: "7",
    title: "Mining Giant Ignores Worker Safety",
    preview:
      "A line manager describes systemic neglect of worker safety protocols in a major mining operation.",
    content:
      "After witnessing three preventable accidents in two months, I realized the company consistently ignored required safety training to maintain output quotas. Incident logs and safety reports were routinely shredded or lost. I am submitting evidence to both the labor board and union representatives.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-01-31"),
    publishedAt: dateToBigInt("2025-01-31"),
    industryTags: ["B", "N"],
    country: "ZA",
    publisherId: "504",
    upvotes: 445,
    downvotes: 28,
  },
  {
    id: "8",
    title: "Major Airline Falsifies Maintenance Logs",
    preview:
      "A mechanic at a large airline reveals the alteration of aircraft maintenance records to reduce costs.",
    content:
      "Technicians were required to sign off on incomplete work or risk termination. I saved images and copies of unfinished repairs alongside the tampered logs. Upper management explicitly told us to 'do what it takes' to keep planes flying, regardless of safety risk.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-02-17"),
    publishedAt: dateToBigInt("2025-02-17"),
    industryTags: ["H", "G"],
    country: "US",
    publisherId: "394",
    files: [
      {
        fileName: "maintenance_photo_evidence.png",
        fileData:
          "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAP0QDjWgjxx9AAAAAElFTkSuQmCC",
      },
    ],
    upvotes: 1567,
    downvotes: 203,
  },
  {
    id: "9",
    title: "Bank Fined for Money Laundering",
    preview:
      "A compliance officer discloses internal investigations into the laundering of international funds.",
    content:
      "Suspicious transactions flagged by software were routinely cleared by certain managers despite failing checks. When I cross-referenced activity between branches, I uncovered millions flowing through shell companies in known tax havens. Consequences have been limited to minor fines due to behind-the-scenes deals with enforcement officials.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-02-26"),
    publishedAt: dateToBigInt("2025-02-26"),
    industryTags: ["K", "O"],
    country: "CH",
    publisherId: "678",
    upvotes: 934,
    downvotes: 56,
  },
  {
    id: "10",
    title: "Art Museum Illicit Sales Scandal",
    preview:
      "A curator reveals that rare artifacts were sold illegally from museum stores to overseas buyers.",
    content:
      "Artifacts disappearing from collections were marked as 'loaned' but never returned. Further investigation showed executive complicity in the illegal art dealing network. I've submitted inventory records and correspondence to legal authorities.",
    encryption: defaultEncryption,
    status: "PUBLISHED",
    createdAt: getCreatedAt("2025-03-05"),
    publishedAt: dateToBigInt("2025-03-05"),
    industryTags: ["R", "S"],
    country: "GB",
    publisherId: "187",
    upvotes: 289,
    downvotes: 41,
  },
];
