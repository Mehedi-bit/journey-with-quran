import { useState, useEffect } from "react";

interface SurahViewProps {
  surahNumber: number;
  translation: "en" | "bn";
}

interface Verse {
  number: number;
  text: string;
  translation: string;
}

const SurahView = ({ surahNumber, translation }: SurahViewProps) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Get Arabic text
    const arabicPromise = fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}`,
    ).then((res) => res.json());

    // Get translation
    const translationEdition = translation === "bn" ? "bn.bengali" : "en.asad";
    const translationPromise = fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/${translationEdition}`,
    ).then((res) => res.json());

    Promise.all([arabicPromise, translationPromise])
      .then(([arabicData, translationData]) => {
        const combinedVerses = arabicData.data.ayahs.map(
          (ayah: any, index: number) => ({
            number: ayah.numberInSurah,
            text: ayah.text,
            translation: translationData.data.ayahs[index].text,
          }),
        );
        setVerses(combinedVerses);
      })
      .catch((err) => {
        setError("Failed to load Surah. Please try again.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [surahNumber, translation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading Surah...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {verses.map((verse) => (
        <div
          key={verse.number}
          className="space-y-4 p-4 rounded-lg hover:bg-secondary/20 transition-colors"
        >
          <div className="flex items-start gap-4">
            <span className="font-mono text-sm text-muted-foreground">
              {verse.number}
            </span>
            <p className="text-xl text-right w-full" dir="rtl" style={{ fontFamily: "Amiri, serif", wordSpacing: '3px' }}>
              {verse.text}
            </p>
          </div>
          <p
            className={`text-card-foreground pl-10 ${translation === "bn" ? "bangla-text-lg" : ""}`}
          >
            {verse.translation}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SurahView;
