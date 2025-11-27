export type Story = {
  id: string;
  title: string;
  preview: string;
  text: string;
  publishedAt: string | null;
  publisherId: string;
  // ISIC sections - industries
  tags: ISICSectionKey[];
};

type ISICSectionKey =
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
