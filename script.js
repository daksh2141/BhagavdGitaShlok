async function showShlok() {
  const today = new Date();
  const totalShloks = 700;
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const verseIndex = (dayOfYear % totalShloks) + 1;

  const chapter = Math.ceil(verseIndex / 47);
  const verse = (verseIndex % 47) || 1;

  try {
    const response = await fetch(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/verses/${verse}/`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '024c5919ddmsh274ded5e6924f7cp185f9ajsn74577891e40e',
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
      }
    });

    const data = await response.json();
    const slok = data.slok || data.text || "श्लोक लोड नहीं हो पाया";
    const hindi = data.translations?.find(t => t.language === "hindi")?.description || "हिंदी अनुवाद नहीं मिला";
    const english = data.translations?.find(t => t.language === "english")?.description || "English translation not found";

    document.getElementById("shlokText").textContent = slok;
    document.getElementById("hindiMeaning").textContent = hindi;
    document.getElementById("englishMeaning").textContent = english;
    document.getElementById("chapterInfo").textContent = `Chapter ${chapter}, Verse ${verse}`;
    document.getElementById("shlokCard").style.display = "block";

    gsap.from("#shlokCard", { duration: 1, opacity: 0, y: 30, ease: "power2.out" });

  } catch (err) {
    console.error("Failed to fetch shlok:", err);
    document.getElementById("shlokText").textContent = "❌ श्लोक लोड नहीं हो पाया। कृपया पुनः प्रयास करें।";
    document.getElementById("hindiMeaning").textContent = "";
    document.getElementById("englishMeaning").textContent = "";
    document.getElementById("chapterInfo").textContent = "";
    document.getElementById("shlokCard").style.display = "block";
  }
}

// GSAP page animation
window.onload = () => {
  gsap.from("header", { duration: 1, opacity: 0, y: -30, ease: "bounce" });
  gsap.from("main", { duration: 1.2, opacity: 0, y: 40, delay: 0.4 });
  gsap.from("footer", { duration: 1, opacity: 0, y: 20, delay: 1 });
};
