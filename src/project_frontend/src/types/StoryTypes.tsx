export type Story = {
  id: string;
  title: string;
  preview: string;
  text: string;
  publishedAt: string | null;
  publisherId: string;
  //   SIC or GICS codes ??? https://www.naics.com/search/
  tags?: string[];
};
