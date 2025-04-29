import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import HadithCard from "../Hadith/HadithCard";
import { ScrollArea } from "../ui/scroll-area";

interface Hadith {
  id: number;
  chapterId: number;
  bookId: number;
  arabic: string;
  english: {
    narrator: string;
    text: string;
  };
}

const HadithPage = () => {
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/Mehedi-bit/hadith-database/main/db/by_book/forties/nawawi40.json",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hadiths");
        }

        const data = await response.json();
        setHadiths(Array.isArray(data) ? data : data.hadiths || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching hadiths:", err);
        setError("Failed to load hadiths. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, []);

  return (
    <ScrollArea>
    <div className="container mx-auto px-4 py-8 overflow-auto h-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
            40 Hadiths of Imam Nawawi
          </h1>
          <p className="text-muted-foreground">
            A collection of forty hadiths compiled by Imam Yahya ibn Sharaf
            al-Nawawi
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading hadiths...</span>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md my-4">
            {error}
          </div>
        )}

        {!loading && !error && hadiths.length === 0 && (
          <div className="text-center py-10">
            <p>No hadiths found.</p>
          </div>
        )}

        
          <div className="space-y-6">
            {hadiths &&
              hadiths.length > 0 &&
              hadiths.map((hadith, index) => <HadithCard key={hadith.id} {...hadith} index={index} />)}
          </div>
        
      </div>
    </div>
    </ScrollArea>
  );
};

export default HadithPage;
