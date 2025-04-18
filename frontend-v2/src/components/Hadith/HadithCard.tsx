
import { Card, CardContent } from "@/components/ui/card";

interface HadithProps {
  id: number;
  chapterId: number;
  bookId: number;
  arabic: string;
  english: {
    narrator: string;
    text: string;
  };
}

const HadithCard = ({ id, arabic, english, index }: HadithProps & { index: number }) => {
  return (
    <Card className="mb-6 overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
              {index+1}
            </span>
            <span className="text-sm text-muted-foreground">Hadith #{index+1}</span>
          </div>

          {/* Arabic Text */}
          <div className="mt-2">
            <p
              className="text-xl md:text-2xl leading-relaxed text-right font-arabic"
              dir="rtl"
              style={{fontFamily: "Amiri, serif"}}
            >
              {arabic}
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Narrator */}
          <div className="italic text-sm text-muted-foreground">
            {english.narrator}
          </div>

          {/* English Text */}
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p>{english.text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HadithCard;
