import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type ThreadSeed = {
        title : Text;
        abstract : Text;
        body : Text;
        tags : [Text];
        comments : [Text];
        likes : Nat;
        dislikes : Nat;
    };

    public let threads : [ThreadSeed] = [
        {
            title = "Pope's Orders";
            abstract = "A set of leaked Vatican documents published by WikiLeaks in January 2019 reveals internal correspondence and power struggles at the highest levels of the Catholic Church";
            body = "WikiLeaks published documents highlighting how Pope Francis asserted authority over the historically independent Sovereign Military Order of Malta. Among the materials is a private letter detailing the Pope's involvement in internal Church disputes, including the ousting of Matthew Festing as Grand Master and the reinstatement of Grand Chancellor Albrecht von Boeselager, which critics describe as a significant shift in the Order's sovereignty. The documents fueled debate over internal Church politics, doctrinal disputes, and the extent of papal power.";
            tags = ["O", "U", "IT", "GB", "OTHER"];
            comments = [
                "The leak suggests major tension within one of the oldest Catholic institutions, possibly shifting how observers understand the balance between tradition and papal authority.",
                "Publishing confidential religious correspondence raises ethical questions about public interest versus institutional privacy.",
            ];
            likes = 124;
            dislikes = 37;
        },
        {
            title = "Amazon Atlas";
            abstract = "A confidential internal Amazon file";
            body = "Amazon Atlas is a 2015 internal document from Amazon Web Services that enumerates the physical locations and operational characteristics of Amazon data centers globally. The leak reveals Amazon's efforts to conceal its physical footprint through subsidiaries and pseudonyms and highlights the role AWS plays in supporting U.S. intelligence community infrastructure. The dataset includes facilities across the United States, the United Kingdom, Germany, France, Japan, China, Brazil, and other regions.";
            tags = ["J", "C", "US", "GB", "DE", "FR", "JP", "CN", "BR", "OTHER"];
            comments = [
                "Revealing these infrastructure locations raises valid security and commercial-sensitivity concerns.",
                "At the same time, greater transparency might help regulators better understand the power concentration in global cloud services.",
            ];
            likes = 198;
            dislikes = 52;
        },
        {
            title = "Dealmaker= Al Yousef";
            abstract = "This leak includes an ICC arbitration document";
            body = "The arbitration papers outline a conflict between French state-owned GIAT Industries (now Nexter Systems) and a UAE intermediary who facilitated the sale of Leclerc tanks and armoured vehicles. GIAT argued that certain commission payments became illegal under French anti-corruption reforms, while the intermediary challenged that interpretation. The tribunal highlighted the complexity of applying evolving national laws to international defence contracts.";
            tags = ["O", "U", "FR", "OTHER"];
            comments = [
                "The leak exposes the financial and legal ambiguities surrounding international defence procurement.",
                "It also illustrates how anti-corruption reforms can clash with longstanding industry practices.",
            ];
            likes = 143;
            dislikes = 65;
        },
    ];

};
