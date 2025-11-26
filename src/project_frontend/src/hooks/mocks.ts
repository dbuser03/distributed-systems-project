import { Story } from "../types";

// Mock whistleblower stories data - replace with actual data from backend later
export const mockStories: Story[] = [
  {
    id: "1",
    title: "Corporate Fraud Exposed",
    preview: "A former employee reveals financial misconduct...",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    publishedAt: "2025-01-01",
    publisherId: "1",
    tags: ["Corporate Fraud", "Financial Misconduct"],
  },
  {
    id: "2",
    title: "Government Surveillance Program",
    preview: "Whistleblower discloses secret monitoring operations...",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    publishedAt: "2025-01-02",
    publisherId: "2",
    tags: ["Government Surveillance", "Privacy Violations"],
  },
  {
    id: "3",
    title: "Healthcare Industry Cover-up",
    preview: "Internal documents reveal safety violations...",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    publishedAt: "2025-01-03",
    publisherId: "3",
    tags: ["Healthcare Industry", "Safety Violations"],
  },
  {
    id: "4",
    title: "Environmental Violations",
    preview: "Company employee exposes illegal waste disposal...",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    publishedAt: "2025-01-04",
    publisherId: "4",
    tags: ["Environmental Violations", "Waste Disposal"],
  },
  {
    id: "5",
    title: "Military Contract Corruption",
    preview: "Defense contractor insider reveals kickback scheme...",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    publishedAt: "2025-01-05",
    publisherId: "5",
    tags: ["Military Contract Corruption", "Kickback Scheme"],
  },
  {
    id: "6",
    title: "Tech Company Data Breach",
    preview: "Former engineer discloses massive privacy breach...",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    publishedAt: null,
    publisherId: "6",
    tags: ["Tech Company Data Breach", "Privacy Breach"],
  },
];
