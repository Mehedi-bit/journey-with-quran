import { useState, useEffect } from "react";

// Function to handle retries for the API call
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i < retries - 1) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
      } else {
        throw new Error("Max retries reached, unable to fetch data.");
      }
    }
  }
};

const TafsirView = ({ surahNumber, translation }) => {
  const [tafsir, setTafsir] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTafsir = async () => {
      try {
        let url = "";

        if (translation === "bn") {
          url = `https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/bn-tafseer-ibn-e-kaseer/${surahNumber}.json`;
        } else {
          url = `https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/en-tafisr-ibn-kathir/${surahNumber}.json`;
        }

        console.log("Fetching URL: ", url);

        const data = await fetchWithRetry(url); // Use retry function

        if (data && data.ayahs) {
          setTafsir(data.ayahs);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err) {
        console.error("Error loading tafsir", err);
        setError(true);
      }
    };

    fetchTafsir();
  }, [surahNumber, translation]);

  if (error) {
    return (
      <div className="text-gray-400 font-semibold text-center">
        Error loading Tafsir, please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen ">
      <h2 style={{ fontFamily: "Amiri, serif" }} className="text-2xl mb-6 text-center">
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </h2>

      {tafsir.length === 0 ? (
        <p className="text-center ">Loading Tafsir...</p>
      ) : (
        tafsir.map((entry, index) => (
          <div
            key={index}
            className="mb-8 p-6  rounded-lg shadow-lg border "
          >
            <div className="font-semibold text-xl mb-3 ">
                <span className="text-2xl" style={{ fontFamily: "Amiri, serif" }}>
                ﴾
                </span>
                <span className="text-2xl" style={{ fontFamily: "Amiri, serif" }}>
                {entry.ayah}
                </span>
                <span className="text-2xl" style={{ fontFamily: "Amiri, serif" }}>
                ﴿
                </span>
            </div>

            <div
              className={
                translation === "bn"
                  ? "font-bangla text-sm text-justify leading-relaxed space-y-3"
                  : "text-sm text-justify leading-relaxed space-y-3"
              }
            >
              {entry.text.split("\n").map((line, i) => (
                <pre key={i} className="leading-relaxed bangla-text whitespace-pre-wrap text-neutral-200">{line}</pre>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TafsirView;
