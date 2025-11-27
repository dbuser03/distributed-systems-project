import { ISICSectionsType, Story } from "../types";

export const ISICSections: ISICSectionsType = {
  A: "Agriculture, Forestry and Fishing",
  B: "Mining and Quarrying",
  C: "Manufacturing",
  D: "Electricity, Gas, Steam and Air Conditioning Supply",
  E: "Water Supply; Sewerage, Waste Management and Remediation Activities",
  F: "Construction",
  G: "Wholesale and Retail Trade; Repair of Motor Vehicles and Motorcycles",
  H: "Transportation and Storage",
  I: "Accommodation and Food Service Activities",
  J: "Information and Communication",
  K: "Financial and Insurance Activities",
  L: "Real Estate Activities",
  M: "Professional, Scientific and Technical Activities",
  N: "Administrative and Support Service Activities",
  O: "Public Administration and Defence; Compulsory Social Security",
  P: "Education",
  Q: "Human Health and Social Work Activities",
  R: "Arts, Entertainment and Recreation",
  S: "Other Service Activities",
  T: "Activities of Households as Employers; Undifferentiated Goods- and Services-Producing Activities of Households for Own Use",
  U: "Activities of Extraterritorial Organizations and Bodies",
};

// Improved mock whistleblower stories data
export const mockStories: Story[] = [
  {
    id: "1",
    title: "Corporate Fraud Exposed at Agritech Ltd.",
    preview:
      "A former finance analyst details a scheme to misreport profits and siphon investor funds in a top agricultural firm.",
    text: "After several months working at Agritech Ltd., I began noticing unusual patterns in the bookkeeping. Claims for supplies and machinery appeared inflated, with invoices fabricated to mask the siphoning of millions out of R&D funding. Repeated attempts to warn management were ignored. Following dismissal, I provided documented evidence to regulators. Investigations are now underway. The company has issued blanket denials despite mounting pressure from the press and shareholders.",
    publishedAt: "2025-01-16",
    publisherId: "501",
    tags: ["A", "M"],
  },
  {
    id: "2",
    title: "Unlawful Data Collection in the Telecom Industry",
    preview:
      "A telecommunications engineer exposes illegal data mining from personal mobile phones by a multinational.",
    text: "While employed in the IT division, I discovered backdoor software installed on client devices. Sensitive data—including call logs, location, and private messages—was silently uploaded to off-shore servers nightly. Internal emails revealed knowledge of these practices reaching as far as executive leadership. My reports to the compliance office were dismissed, so I have turned over code samples and logs to journalists and privacy rights groups.",
    publishedAt: "2025-02-05",
    publisherId: "377",
    tags: ["J", "D"],
  },
  {
    id: "3",
    title: "Unsafe Building Practices Covered Up",
    preview:
      "A construction inspector reveals safety code violations and bribery in large city projects.",
    text: "During city inspections, I repeatedly found substandard materials and falsified safety certificates at numerous major construction sites. When I refused to sign off, my supervisor instructed me to look the other way and subsequently reassigned me. The construction firm provided undisclosed gifts to several building officials, as evidenced by wire transfers. I am releasing structural reports and internal memos, and have sent everything to the city authorities.",
    publishedAt: "2025-02-21",
    publisherId: "612",
    tags: ["F", "N"],
  },
  {
    id: "4",
    title: "Chemical Plant Falsifies Pollution Records",
    preview:
      "A technician blows the whistle on falsified environmental test data and regulatory evasion.",
    text: "Our chemical plant regularly discharged waste beyond legal limits, which I and my colleagues documented. However, our lab chief ordered us to manipulate reporting data before sending them to state regulators. I have kept original test results and have shared them with an environmental NGO. The plant has quietly increased emissions even as it promotes a public image of sustainability.",
    publishedAt: "2025-03-12",
    publisherId: "825",
    tags: ["C", "E", "O"],
  },
  {
    id: "5",
    title: "Hidden COVID-19 Outbreak in Care Facility",
    preview:
      "A healthcare administrator reveals the intentional underreporting of coronavirus cases and deaths at a private care home.",
    text: "During the winter surge, our facility intentionally undercounted cases to avoid scrutiny and fines. Staff were pressured to treat patients off the books. I have medical records and internal directives showing the cover-up and have filed them with a government ombudsman. Management has threatened legal action in response.",
    publishedAt: "2025-03-28",
    publisherId: "701",
    tags: ["Q", "L"],
  },
  {
    id: "6",
    title: "Bribery Uncovered in University Research Grants",
    preview:
      "A junior academic exposes a network of kickbacks and favoritism in allocating public research funding.",
    text: "I discovered that certain professors at the university secured research grants for unqualified projects by offering bribes to administrators. Email chains and bank statements support the existence of a multi-year scheme. When I raised suspicions, my contract was not renewed. I have decided to publish the documents anonymously.",
    publishedAt: null,
    publisherId: "443",
    tags: ["P", "K"],
  },
  {
    id: "7",
    title: "Mining Giant Ignores Worker Safety",
    preview:
      "A line manager describes systemic neglect of worker safety protocols in a major mining operation.",
    text: "After witnessing three preventable accidents in two months, I realized the company consistently ignored required safety training to maintain output quotas. Incident logs and safety reports were routinely shredded or lost. I am submitting evidence to both the labor board and union representatives.",
    publishedAt: "2025-01-31",
    publisherId: "504",
    tags: ["B", "N"],
  },
  {
    id: "8",
    title: "Major Airline Falsifies Maintenance Logs",
    preview:
      "A mechanic at a large airline reveals the alteration of aircraft maintenance records to reduce costs.",
    text: "Technicians were required to sign off on incomplete work or risk termination. I saved images and copies of unfinished repairs alongside the tampered logs. Upper management explicitly told us to 'do what it takes' to keep planes flying, regardless of safety risk.",
    publishedAt: "2025-02-17",
    publisherId: "394",
    tags: ["H", "G"],
  },
  {
    id: "9",
    title: "Bank Fined for Money Laundering",
    preview:
      "A compliance officer discloses internal investigations into the laundering of international funds.",
    text: "Suspicious transactions flagged by software were routinely cleared by certain managers despite failing checks. When I cross-referenced activity between branches, I uncovered millions flowing through shell companies in known tax havens. Consequences have been limited to minor fines due to behind-the-scenes deals with enforcement officials.",
    publishedAt: "2025-02-26",
    publisherId: "678",
    tags: ["K", "O"],
  },
  {
    id: "10",
    title: "Art Museum Illicit Sales Scandal",
    preview:
      "A curator reveals that rare artifacts were sold illegally from museum stores to overseas buyers.",
    text: "Artifacts disappearing from collections were marked as 'loaned' but never returned. Further investigation showed executive complicity in the illegal art dealing network. I've submitted inventory records and correspondence to legal authorities.",
    publishedAt: "2025-03-05",
    publisherId: "187",
    tags: ["R", "S"],
  },
];
