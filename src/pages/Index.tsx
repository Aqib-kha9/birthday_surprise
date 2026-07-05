import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Music, Cake, Star, Flower2, User, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import helloKittyEnvelope from "@/assets/hello-kitty-envelope.png";
import sunflowers from "@/assets/sunflowers.jpg";
import pinkFlowers from "@/assets/pink-flowers.jpg";
import bougainvillea from "@/assets/bougainvillea.jpg";
import carnations from "@/assets/carnations.jpg";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [candlesLit, setCandlesLit] = useState(0);
  const [showNoDialog, setShowNoDialog] = useState(false);
  const [letterMessage, setLetterMessage] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [glitterEffect, setGlitterEffect] = useState(false);

  // Personalized states
  const [inputName, setInputName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [nameError, setNameError] = useState("");
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [imageSrc, setImageSrc] = useState("/priyanshi.jpg");
  const [isFlipped, setIsFlipped] = useState(false);

  // Custom date selection states
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Spelling game states
  const [scrambledLetters, setScrambledLetters] = useState<{ id: number; char: string; clicked: boolean }[]>([]);
  const [currentSpell, setCurrentSpell] = useState<string[]>([]);

  useEffect(() => {
    if (showLockScreen) {
      const nameChars = "PRIYANSHI".split("").map((char, idx) => ({
        id: idx,
        char,
        clicked: false,
      }));
      const shuffled = [...nameChars].sort(() => Math.random() - 0.5);
      setScrambledLetters(shuffled);
      setCurrentSpell([]);
      setSelectedDay(null);
      setSelectedMonth(null);
      setSelectedYear(null);
      setBirthDate("");
    }
  }, [showLockScreen]);

  const getAgeStats = () => {
    if (!birthDate) return { years: 0, months: 0, days: 0 };
    const dob = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  useEffect(() => {
    if (currentSlide === 2) {
      setTimeout(() => setShowNextButton(true), 2000);
    }
  }, [currentSlide]);

  const fullLetterText = `Dear Priyanshi,

On this beautiful day that marks your arrival in this world, I want to wish my dearest friend a very Happy Birthday! You are truly a special friend to me.

Your presence makes this world a better place. The way you care for others, the kindness in your heart, and the light you bring wherever you go - these are qualities that make you an incredibly precious friend.

You have this amazing ability to make people feel seen and valued. Your laughter is contagious, and your genuine goodness inspires everyone around you.

Today, I hope you feel as appreciated as you make your friends feel every day. May this year bring you endless opportunities to shine, dreams that take flight, and moments of pure joy.

Remember that you are capable of amazing things, and deserving of all the happiness life has to offer.

Happy Birthday to a wonderful friend who makes the world brighter just by being in it!

With warmest wishes,
A friend who always believes in you 🌟`;

  useEffect(() => {
    if (showLetter) {
      let currentText = "";
      let index = 0;
      setLetterMessage("");
      const interval = setInterval(() => {
        if (index < fullLetterText.length) {
          currentText += fullLetterText[index];
          setLetterMessage(currentText);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [showLetter]);

  const triggerGlitter = () => {
    setGlitterEffect(true);
    setTimeout(() => setGlitterEffect(false), 1000);
  };

  const handleLightsOn = () => {
    setIsLightOn(true);
    triggerGlitter();
    setTimeout(() => {
      setCurrentSlide(11);
    }, 1500);
  };

  const handlePlayMusic = () => {
    setIsMusicPlaying(true);
    const audio = new Audio("/music.mp3");
    audio.play();
    triggerGlitter();
    setTimeout(() => setCurrentSlide(12), 1000);
  };

  const handleDecorate = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FF69B4', '#FF1493', '#DB7093'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFB6C1', '#FF69B4', '#FF1493', '#DB7093'],
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFB6C1', '#FF69B4', '#FF1493', '#DB7093'],
      });
    }, 300);
    triggerGlitter();
    setTimeout(() => setCurrentSlide(13), 1500);
  };

  const handleBalloons = () => {
    setShowBalloons(true);
    triggerGlitter();
    setTimeout(() => setCurrentSlide(14), 3000);
  };

  const handleCakeTime = () => {
    setShowCake(true);
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentSlide(15);
            triggerGlitter();
          }, 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 500);
  };

  const handleLetterClick = (letterObj: { id: number; char: string; clicked: boolean }) => {
    if (letterObj.clicked) return;
    const targetName = "PRIYANSHI";
    const expectedChar = targetName[currentSpell.length];

    if (letterObj.char === expectedChar) {
      const updatedSpell = [...currentSpell, letterObj.char];
      setCurrentSpell(updatedSpell);
      setScrambledLetters((prevScrambled) =>
        prevScrambled.map((item) => (item.id === letterObj.id ? { ...item, clicked: true } : item))
      );
      triggerGlitter();
      setNameError("");

      // If completed spelling
      if (updatedSpell.length === targetName.length) {
        if (selectedDay !== 7 || selectedMonth !== 6) {
          setNameError("Double check the date! Only the real Priyanshi knows her special day! 📅");
          return;
        }
        if (!selectedYear) {
          setNameError("Please select your birth year to calibrate the magic! 📅");
          return;
        }
        setTimeout(() => {
          setIsUnlocked(true);
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#FFB6C1', '#FF69B4', '#FF1493'],
          });
          setCurrentSlide(2);
        }, 500);
      }
    } else {
      setNameError("Oops! That's not the next letter. Look closely! 😉");
      setTimeout(() => setNameError(""), 2000);
    }
  };

  const updateFullDate = (d: number | null, m: number | null, y: number | null) => {
    if (d && m !== null && y) {
      const formattedMonth = String(m + 1).padStart(2, '0');
      const formattedDay = String(d).padStart(2, '0');
      const dateStr = `${y}-${formattedMonth}-${formattedDay}`;
      setBirthDate(dateStr);
      
      // If spelling is already complete AND date is correct (7th July)
      if (currentSpell.length === 9) {
        if (d === 7 && m === 6) {
          setNameError("");
          setTimeout(() => {
            setIsUnlocked(true);
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#FFB6C1', '#FF69B4', '#FF1493'],
            });
            setCurrentSlide(2);
          }, 500);
        } else {
          setNameError("Double check the date! Only the real Priyanshi knows her special day! 📅");
        }
      }
    }
  };

  const handleResetSpell = () => {
    setCurrentSpell([]);
    setScrambledLetters((prev) => prev.map((item) => ({ ...item, clicked: false })));
    setSelectedDay(null);
    setSelectedMonth(null);
    setSelectedYear(null);
    setBirthDate("");
    setNameError("");
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-fade-in relative overflow-hidden p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <div className="relative z-10 flex flex-col items-center w-full max-w-md">
              {!showLockScreen ? (
                <>
                  <img 
                    src={helloKittyEnvelope} 
                    alt="Hello Kitty Envelope" 
                    className="w-72 h-72 object-contain mb-8 animate-float-slow"
                  />
                  <p className="text-xl text-pink-600 mb-6 font-light animate-pulse">
                    Something special awaits you...
                  </p>
                  <Button
                    onClick={() => setShowLockScreen(true)}
                    size="lg"
                    className="rounded-full w-24 h-24 heart-pulse shadow-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 border-2 border-white/30"
                  >
                    <Heart className="w-12 h-12" fill="white" />
                  </Button>
                </>
              ) : (
                <div className="relative w-full max-w-md">
                  <div className="relative bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-pink-100 space-y-6 animate-scale-up">
                    <div className="text-center space-y-2 relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 justify-center">
                        <Sparkles className="w-8 h-8 text-pink-400 animate-bounce" />
                      </div>
                      <h2 className="text-3xl font-bold text-pink-600 pt-4">
                        Magical Verification 🔮
                      </h2>
                      <p className="text-sm text-pink-600/70 font-semibold">Only the birthday girl can open this envelope!</p>
                    </div>

                    <div className="space-y-5">
                      {/* Step 1: Birthdate Selector */}
                      <div className="space-y-3">
                        <Label className="text-pink-600 font-bold flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-pink-500 animate-pulse" />
                          Step 1: Set your special day 📅
                        </Label>
                        <div className="flex gap-2">
                           {/* Day Select */}
                           <select 
                             value={selectedDay || ""} 
                             onChange={(e) => {
                               const val = e.target.value ? Number(e.target.value) : null;
                               setSelectedDay(val);
                               updateFullDate(val, selectedMonth, selectedYear);
                             }}
                             className="flex-1 rounded-2xl border border-pink-200 focus:border-pink-400 bg-white/70 text-gray-700 p-3 text-sm focus:outline-none shadow-sm transition-all focus:ring-1 focus:ring-pink-300"
                           >
                             <option value="">Day</option>
                             {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                               <option key={d} value={d}>{d}</option>
                             ))}
                           </select>
                           
                           {/* Month Select */}
                           <select 
                             value={selectedMonth !== null ? selectedMonth : ""} 
                             onChange={(e) => {
                               const val = e.target.value !== "" ? Number(e.target.value) : null;
                               setSelectedMonth(val);
                               updateFullDate(selectedDay, val, selectedYear);
                             }}
                             className="flex-[1.5] rounded-2xl border border-pink-200 focus:border-pink-400 bg-white/70 text-gray-700 p-3 text-sm focus:outline-none shadow-sm transition-all focus:ring-1 focus:ring-pink-300"
                           >
                             <option value="">Month</option>
                             {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, idx) => (
                               <option key={m} value={idx}>{m}</option>
                             ))}
                           </select>

                           {/* Year Select */}
                           <select 
                             value={selectedYear || ""} 
                             onChange={(e) => {
                               const val = e.target.value ? Number(e.target.value) : null;
                               setSelectedYear(val);
                               updateFullDate(selectedDay, selectedMonth, val);
                             }}
                             className="flex-[1.2] rounded-2xl border border-pink-200 focus:border-pink-400 bg-white/70 text-gray-700 p-3 text-sm focus:outline-none shadow-sm transition-all focus:ring-1 focus:ring-pink-300"
                           >
                             <option value="">Year</option>
                             {Array.from({ length: 30 }, (_, i) => 1995 + i).map(y => (
                               <option key={y} value={y}>{y}</option>
                             ))}
                           </select>
                         </div>
                      </div>

                      {/* Step 2: Spelling game */}
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-pink-600 font-semibold text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
                            Step 2: Spell your name to unlock! 🎈
                          </span>
                          {currentSpell.length > 0 && (
                            <button 
                              onClick={handleResetSpell}
                              className="text-xs text-rose-500 hover:text-rose-600 font-bold underline decoration-dotted"
                            >
                              Reset
                            </button>
                          )}
                        </div>

                        {/* Spelling Slots */}
                        <div className="flex justify-center gap-1.5 py-3 bg-pink-50/40 rounded-2xl border border-pink-100/50">
                          {"PRIYANSHI".split("").map((char, idx) => {
                            const isFilled = idx < currentSpell.length;
                            return (
                              <div
                                key={idx}
                                className={`w-8 h-10 rounded-xl border-2 flex items-center justify-center font-bold text-md transition-all duration-300 ${
                                  isFilled
                                    ? "bg-pink-500 border-transparent text-white scale-110 shadow-md animate-scale-up"
                                    : "bg-white border-pink-200 text-transparent"
                                }`}
                              >
                                {isFilled ? currentSpell[idx] : "_"}
                              </div>
                            );
                          })}
                        </div>

                        {/* Scrambled Bubbles */}
                        <div className="grid grid-cols-5 gap-2 justify-center py-2">
                          {scrambledLetters.map((letter) => (
                            <button
                              key={letter.id}
                              onClick={() => handleLetterClick(letter)}
                              disabled={letter.clicked}
                              className={`w-11 h-11 rounded-full font-extrabold text-md flex items-center justify-center transition-all duration-300 transform ${
                                letter.clicked
                                  ? "bg-gray-50 text-gray-300 border border-gray-100 scale-90 cursor-not-allowed opacity-50"
                                  : "bg-pink-50 border border-pink-200 text-pink-600 shadow-sm hover:shadow hover:-translate-y-1 hover:scale-105 active:scale-95"
                              }`}
                            >
                              {letter.char}
                            </button>
                          ))}
                        </div>
                      </div>

                      {nameError && (
                        <p className="text-sm text-pink-600 font-semibold text-center animate-bounce pt-2">
                          {nameError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        const ageStats = getAgeStats();
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-fade-in relative overflow-hidden p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <FloatingHearts />
            <div className="text-center space-y-6 max-w-lg relative z-10">
              <div className="relative inline-block">
                <Star className="w-12 h-12 text-yellow-400 absolute -top-4 -left-4 animate-spin-slow" />
                <Flower2 className="w-10 h-10 text-pink-400 absolute -bottom-2 -right-4 animate-bounce" />
                <h1 className="text-5xl font-bold text-pink-600 mb-4">
                  It's Your Special Day, Priyanshi! ✨
                </h1>
              </div>
              <p className="text-xl text-pink-600/70 font-semibold max-w-md mx-auto">
                A day to celebrate the wonderful person you are
              </p>

              {birthDate && (
                <div className="bg-white p-6 rounded-[2rem] border border-pink-100 shadow-xl mt-6 transform hover:scale-105 transition-transform duration-300">
                  <p className="text-pink-600 font-extrabold text-lg mb-2">🎉 Spreading Smiles Stats 🎉</p>
                  <p className="text-pink-600/70 text-md font-semibold">
                    You have been spreading joy and lighting up lives for:
                  </p>
                  <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                    <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                      <span className="block text-4xl font-extrabold text-pink-600 animate-pulse">{ageStats.years}</span>
                      <span className="text-xs uppercase tracking-wider text-pink-500 font-bold">Years</span>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                      <span className="block text-4xl font-extrabold text-pink-600 animate-pulse">{ageStats.months}</span>
                      <span className="text-xs uppercase tracking-wider text-pink-500 font-bold">Months</span>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                      <span className="block text-4xl font-extrabold text-pink-600 animate-pulse">{ageStats.days}</span>
                      <span className="text-xs uppercase tracking-wider text-pink-500 font-bold">Days</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {showNextButton && (
              <Button
                onClick={() => setCurrentSlide(3)}
                size="lg"
                className="mt-8 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-lg shadow-[0_10px_20px_rgba(244,63,94,0.2)] hover:shadow-[0_12px_25px_rgba(244,63,94,0.4)] transform hover:scale-105 active:scale-95 transition-all duration-300 relative z-10 animate-bounce"
              >
                Continue the Magic 💫
              </Button>
            )}
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-orange-100 animate-fade-in p-4 text-center">
            <div className="space-y-8 max-w-md mx-auto">
              <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 text-transparent bg-clip-text leading-tight">
                For Someone as Special as You 🌸
              </h2>
              <p className="text-md sm:text-lg text-gray-600">
                Every beautiful soul deserves to be celebrated in the most beautiful way
              </p>
              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => setCurrentSlide(4)}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-8 py-6 text-lg shadow-xl"
                >
                  Let's Begin 🎀
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 animate-fade-in p-4 text-center">
            <div className="space-y-8 max-w-xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4">
                A Garden of Wishes 🌼
              </h2>
              <p className="text-base sm:text-lg text-emerald-700 font-light leading-relaxed">
                Just like each flower has its unique beauty, you have qualities that make you incredibly special. 
                Your kindness blooms wherever you go, and your spirit brightens every room you enter.
              </p>
              <Button
                onClick={() => setCurrentSlide(5)}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-8 py-6 text-lg mt-6"
              >
                Bloom With Me 🌺
              </Button>
            </div>
          </div>
        );

      // Flower slides 5-8 remain similar but with enhanced styling
      case 5:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 animate-fade-in p-4 text-center">
            <div className="relative group w-72 h-72 sm:w-96 sm:h-96 max-w-[90vw] aspect-square mb-8">
              <img 
                src={sunflowers} 
                alt="Sunflowers" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-lg sm:text-xl font-semibold">
                Sunflowers of Joy 🌻
              </div>
            </div>
            <p className="text-base sm:text-lg text-amber-700 max-w-xs sm:max-w-md mb-6">
              That always find the light, just like you find the good in everything
            </p>
            <Button
              onClick={() => setCurrentSlide(6)}
              className="bg-amber-500 hover:bg-amber-600 shadow-lg"
            >
              Continue Your Journey ✨
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 animate-fade-in p-4 text-center">
            <div className="relative group w-72 h-72 sm:w-96 sm:h-96 max-w-[90vw] aspect-square mb-8">
              <img 
                src={pinkFlowers} 
                alt="Pink Flowers" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-lg sm:text-xl font-semibold">
                Blossoms of Grace 🌸
              </div>
            </div>
            <p className="text-base sm:text-lg text-pink-700 max-w-xs sm:max-w-md mb-6">
              Delicate yet strong, bringing beauty to every moment
            </p>
            <Button
              onClick={() => setCurrentSlide(7)}
              className="bg-pink-500 hover:bg-pink-600 shadow-lg"
            >
              More Beauty Awaits 💫
            </Button>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 animate-fade-in p-4 text-center">
            <div className="relative group w-72 h-72 sm:w-96 sm:h-96 max-w-[90vw] aspect-square mb-8">
              <img 
                src={bougainvillea} 
                alt="Bougainvillea" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-lg sm:text-xl font-semibold">
                Vines of Resilience 🌺
              </div>
            </div>
            <p className="text-base sm:text-lg text-purple-700 max-w-xs sm:max-w-md mb-6">
              Thriving and spreading color wherever they grow
            </p>
            <Button
              onClick={() => setCurrentSlide(8)}
              className="bg-purple-500 hover:bg-purple-600 shadow-lg"
            >
              Continue Growing 🌱
            </Button>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 animate-fade-in p-4 text-center">
            <div className="relative group w-72 h-72 sm:w-96 sm:h-96 max-w-[90vw] aspect-square mb-8">
              <img 
                src={carnations} 
                alt="Carnations Bouquet" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-lg sm:text-xl font-semibold">
                Bouquet of Love 💐
              </div>
            </div>
            <p className="text-base sm:text-lg text-rose-700 max-w-xs sm:max-w-md mb-6">
              Each petal represents the love and admiration everyone has for you
            </p>
            <Button
              onClick={() => setCurrentSlide(9)}
              className="bg-rose-500 hover:bg-rose-600 shadow-lg"
            >
              See Your Surprise 🎁
            </Button>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100 animate-fade-in p-4 text-center">
            <div className="space-y-8 max-w-2xl mx-auto">
              <div className="relative">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-4 animate-sparkle" />
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-transparent bg-clip-text">
                  A Magical Creation ✨
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-blue-700 font-light leading-relaxed max-w-md mx-auto">
                I've created something special to celebrate the amazing person you are. 
                Would you like to see the magic unfold?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 w-full max-w-xs sm:max-w-md mx-auto">
                <Button
                  onClick={() => setCurrentSlide(10)}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-5 text-base sm:text-lg shadow-xl"
                >
                  Yes, Show Me! 🌟
                </Button>
                <Button
                  onClick={() => setShowNoDialog(true)}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-blue-400 text-blue-600 hover:bg-blue-50 px-8 py-5 text-base sm:text-lg"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div 
            className={`flex flex-col items-center justify-center min-h-screen transition-all duration-1500 ${
              isLightOn ? 'bg-gradient-to-br from-indigo-400 to-purple-600' : 'bg-black'
            } animate-fade-in relative overflow-hidden p-4 text-center`}
          >
            {!isLightOn && (
              <div className="text-center space-y-6">
                <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-white/60 mx-auto mb-4 animate-pulse" />
                <p className="text-white/70 text-base sm:text-lg font-light">Ready for some magic?</p>
              </div>
            )}
            <Button
              onClick={handleLightsOn}
              size="lg"
              className={`px-8 py-5 text-base sm:text-lg mt-8 transition-all duration-1000 ${
                !isLightOn 
                  ? 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 backdrop-blur-sm' 
                  : 'bg-yellow-400 text-black hover:bg-yellow-500 shadow-2xl transform scale-110'
              }`}
            >
              {isLightOn ? 'Magic Activated! ✨' : 'Turn On the Magic 💫'}
            </Button>
          </div>
        );

      case 11:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-400 to-purple-600 animate-fade-in p-4 text-center">
            <div className="text-center space-y-8 max-w-md mx-auto">
              <div className="relative">
                <Music className="w-20 h-20 sm:w-28 sm:h-28 text-white mb-8 animate-bounce-slow mx-auto" />
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <p className="text-white text-lg sm:text-xl font-light">
                Every beautiful moment deserves its own soundtrack
              </p>
              <Button
                onClick={handlePlayMusic}
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 px-8 py-5 text-base sm:text-lg shadow-2xl transform hover:scale-105 transition-transform"
              >
                Play Your Melody 🎶
              </Button>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-rose-500 animate-fade-in relative p-4 text-center">
            <div className="text-center space-y-8 max-w-md mx-auto">
              <Sparkles className="w-20 h-20 sm:w-28 sm:h-28 text-white mb-8 animate-sparkle mx-auto" />
              <p className="text-white text-lg sm:text-xl font-light">
                Let's make this space as beautiful as your spirit
              </p>
              <Button
                onClick={handleDecorate}
                size="lg"
                className="bg-white text-rose-600 hover:bg-white/90 px-8 py-5 text-base sm:text-lg shadow-2xl backdrop-blur-sm"
              >
                Create Magic 🎀
              </Button>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 animate-fade-in relative overflow-hidden p-4 text-center">
            <div className="space-y-12 max-w-md mx-auto">
              <div className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-yellow-100 text-transparent bg-clip-text mb-8 px-4 leading-tight">
                🎉 Happy Birthday! 🎉
              </div>
              <p className="text-white/90 text-lg sm:text-xl font-light">
                Today the world celebrates you, and so do I!
              </p>
            </div>
            {showBalloons && (
              <>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-balloon-rise text-4xl sm:text-5xl"
                    style={{
                      left: `${10 + i * 8}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${6 + Math.random() * 4}s`,
                    }}
                  >
                    {i % 3 === 0 ? '🎈' : i % 3 === 1 ? '⭐' : '💫'}
                  </div>
                ))}
              </>
            )}
            <Button
              onClick={handleBalloons}
              size="lg"
              className="mt-12 bg-white text-cyan-600 hover:bg-white/90 px-8 py-5 text-base sm:text-lg shadow-2xl z-10 transform hover:scale-105 transition-transform"
            >
              Release the Joy! 🎈
            </Button>
          </div>
        );

      case 14:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-amber-500 animate-fade-in p-4 text-center">
            <div className="text-center space-y-12 max-w-md mx-auto">
              <div className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white to-amber-100 text-transparent bg-clip-text px-4 leading-tight">
                Make a Wish! 🌠
              </div>
              
              {showCake && (
                <div className="mb-8 relative transform hover:scale-105 transition-transform duration-300">
                  <div className="text-8xl sm:text-9xl filter drop-shadow-2xl select-none">🎂</div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex gap-4 sm:gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`text-4xl sm:text-5xl transition-all duration-700 transform ${
                          i < candlesLit 
                            ? 'opacity-100 animate-candle-flicker scale-110' 
                            : 'opacity-0 scale-50'
                        }`}
                        style={{ animationDelay: `${i * 0.3}s` }}
                      >
                        🕯️
                      </div>
                    ))}
                  </div>
                  <div 
                    className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-pink-600 font-black text-xl sm:text-2xl tracking-widest select-none whitespace-nowrap transform rotate-[-3deg]"
                    style={{ 
                      fontFamily: "'Pacifico', 'Brush Script MT', cursive, sans-serif",
                      textShadow: "2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff, 0px 4px 8px rgba(0,0,0,0.25)"
                    }}
                  >
                    Priyanshi
                  </div>
                </div>
              )}
              <p className="text-white/90 text-base sm:text-lg font-light">
                {!showCake 
                  ? "Every candle holds a wish, every wish holds a dream..." 
                  : "Make your secret wish and blow out the candles!"}
              </p>
            </div>
            <Button
              onClick={handleCakeTime}
              size="lg"
              className="mt-8 bg-white text-amber-600 hover:bg-white/90 px-8 py-5 text-base sm:text-lg shadow-2xl"
              disabled={showCake}
            >
              {showCake ? 'Making Magic... ✨' : 'Light the Candles 🎂'}
            </Button>
          </div>
        );

      case 15:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-pink-100 animate-fade-in p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            <FloatingHearts />
            
            {!showLetter ? (
              <div className="text-center space-y-8 relative z-10">
                <div 
                  className="cursor-pointer transform hover:scale-110 transition-transform duration-500"
                  onClick={() => setShowLetter(true)}
                >
                  <img 
                    src={helloKittyEnvelope} 
                    alt="Hello Kitty Envelope" 
                    className="w-52 h-52 sm:w-60 sm:h-60 object-contain mx-auto mb-6 animate-float-slow"
                  />
                </div>
                <div className="space-y-4 px-4">
                  <p className="text-xl sm:text-2xl font-semibold text-pink-600 animate-pulse">
                    ✨ A Special Message Awaits ✨
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 font-light">
                    Click the envelope to open your heartwarming surprise
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-8 rounded-3xl shadow-2xl max-w-2xl w-full animate-fade-in relative z-10 border-2 border-pink-200/50">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full animate-ping"></div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 text-transparent bg-clip-text mb-2 px-2">
                    To Someone Extraordinary 💖
                  </h2>
                  <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
                </div>
                
                <div className="min-h-[16rem] sm:min-h-80 max-h-[20rem] sm:max-h-[26rem] overflow-y-auto text-base sm:text-lg leading-relaxed border border-pink-100 rounded-2xl p-4 sm:p-6 bg-white/50 backdrop-blur shadow-inner text-gray-700 font-light text-left whitespace-pre-line font-serif">
                  {letterMessage}
                  {letterMessage.length < fullLetterText.length && (
                    <span className="animate-pulse font-bold text-pink-500">|</span>
                  )}
                </div>
                
                <div className="flex justify-center mt-6 space-x-2">
                  {['🌺', '✨', '💫', '🌸', '🌟'].map((emoji, i) => (
                    <div key={i} className="text-xl sm:text-2xl animate-bounce" style={{animationDelay: `${i * 0.2}s`}}>
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderSlide()}
      <Dialog open={showNoDialog} onOpenChange={setShowNoDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-2 border-pink-200 rounded-3xl">
          <DialogHeader>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🥺</span>
              </div>
              <DialogTitle className="text-xl text-pink-600">Wait!</DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                There's so much more magic to experience! Are you sure you want to miss the surprise?
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex gap-4 justify-center mt-4">
            <Button
              onClick={() => setShowNoDialog(false)}
              className="bg-pink-500 hover:bg-pink-600 flex-1"
            >
              Continue the Magic
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Glitter Effect Overlay */}
      {glitterEffect && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-glitter"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Index;