import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
}

interface SurahListProps {
  onSelect: (number: number) => void;
  selectedSurah: number | null;
}

const SurahList = ({ onSelect, selectedSurah }: SurahListProps) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(search.toLowerCase()) ||
      surah.englishNameTranslation
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      surah.number.toString().includes(search),
  );

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b sticky top-0 bg-card">
        <h2 className="text-lg font-semibold text-primary mb-4">Surah List</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading Surahs...
            </p>
          ) : (
            filteredSurahs.map((surah) => (
              <Card
                key={surah.number}
                className={`group p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${selectedSurah === surah.number ? "bg-primary/10 border-primary" : "hover:bg-secondary/50"}`}
                onClick={() => onSelect(surah.number)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-sm px-2.5 py-1 rounded-full ${selectedSurah === surah.number ? "bg-primary/20" : "bg-secondary"}`}
                  >
                    {surah.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h3
                        className={`font-semibold ${selectedSurah === surah.number ? "text-primary" : "group-hover:text-primary transition-colors"}`}
                      >
                        {surah.englishName}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {surah.numberOfAyahs} verses
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {surah.englishNameTranslation}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SurahList;
