import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Music, Cake, Star, Flower2 } from "lucide-react";
import confetti from "canvas-confetti";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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

  useEffect(() => {
    if (currentSlide === 2) {
      setTimeout(() => setShowNextButton(true), 2000);
    }
  }, [currentSlide]);

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

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <div className="relative z-10 flex flex-col items-center">
              <img 
                src={helloKittyEnvelope} 
                alt="Hello Kitty Envelope" 
                className="w-72 h-72 object-contain mb-8 animate-float-slow"
              />
              <p className="text-xl text-pink-600 mb-6 font-light animate-pulse">
                Something special awaits you...
              </p>
              <Button
                onClick={() => setCurrentSlide(2)}
                size="lg"
                className="rounded-full w-24 h-24 heart-pulse shadow-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 border-2 border-white/30"
              >
                <Heart className="w-12 h-12" fill="white" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-fade-in relative overflow-hidden">
            <FloatingHearts />
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <Star className="w-12 h-12 text-yellow-400 absolute -top-4 -left-4 animate-spin-slow" />
                <Flower2 className="w-10 h-10 text-pink-400 absolute -bottom-2 -right-4 animate-bounce" />
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-4">
                  It's Your Special Day! ✨
                </h1>
              </div>
              <p className="text-xl text-gray-600 font-light max-w-md mx-auto">
                A day to celebrate the wonderful person you are
              </p>
            </div>
            {showNextButton && (
              <Button
                onClick={() => setCurrentSlide(3)}
                size="lg"
                className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg animate-bounce"
              >
                Continue the Magic 💫
              </Button>
            )}
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-orange-100 animate-fade-in">
            <div className="text-center space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 text-transparent bg-clip-text">
                For Someone as Special as You 🌸
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                Every beautiful soul deserves to be celebrated in the most beautiful way
              </p>
              <div className="flex gap-6 pt-4">
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 animate-fade-in">
            <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-emerald-800 mb-4">
                A Garden of Wishes 🌼
              </h2>
              <p className="text-lg text-emerald-700 font-light leading-relaxed">
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 animate-fade-in">
            <div className="relative group">
              <img 
                src={sunflowers} 
                alt="Sunflowers" 
                className="w-96 h-96 object-cover rounded-3xl shadow-2xl mb-8 transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-xl font-semibold">
                Sunflowers of Joy 🌻
              </div>
            </div>
            <p className="text-lg text-amber-700 max-w-md text-center mb-6">
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 animate-fade-in">
            <div className="relative group">
              <img 
                src={pinkFlowers} 
                alt="Pink Flowers" 
                className="w-96 h-96 object-cover rounded-3xl shadow-2xl mb-8 transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-xl font-semibold">
                Blossoms of Grace 🌸
              </div>
            </div>
            <p className="text-lg text-pink-700 max-w-md text-center mb-6">
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 animate-fade-in">
            <div className="relative group">
              <img 
                src={bougainvillea} 
                alt="Bougainvillea" 
                className="w-96 h-96 object-cover rounded-3xl shadow-2xl mb-8 transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-xl font-semibold">
                Vines of Resilience 🌺
              </div>
            </div>
            <p className="text-lg text-purple-700 max-w-md text-center mb-6">
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 animate-fade-in">
            <div className="relative group">
              <img 
                src={carnations} 
                alt="Carnations Bouquet" 
                className="w-96 h-96 object-cover rounded-3xl shadow-2xl mb-8 transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-6 text-white text-xl font-semibold">
                Bouquet of Love 💐
              </div>
            </div>
            <p className="text-lg text-rose-700 max-w-md text-center mb-6">
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100 animate-fade-in">
            <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
              <div className="relative">
                <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-sparkle" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-transparent bg-clip-text">
                  A Magical Creation ✨
                </h2>
              </div>
              <p className="text-xl text-blue-700 font-light leading-relaxed">
                I've created something special to celebrate the amazing person you are. 
                Would you like to see the magic unfold?
              </p>
              <div className="flex gap-6 justify-center pt-6">
                <Button
                  onClick={() => setCurrentSlide(10)}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-12 py-6 text-lg shadow-2xl"
                >
                  Yes, Show Me! 🌟
                </Button>
                <Button
                  onClick={() => setShowNoDialog(true)}
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 px-12 py-6 text-lg"
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
            } animate-fade-in relative overflow-hidden`}
          >
            {!isLightOn && (
              <div className="text-center space-y-6">
                <Sparkles className="w-20 h-20 text-white/60 mx-auto mb-4 animate-pulse" />
                <p className="text-white/70 text-lg font-light">Ready for some magic?</p>
              </div>
            )}
            <Button
              onClick={handleLightsOn}
              size="lg"
              className={`px-12 py-6 text-lg mt-8 transition-all duration-1000 ${
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-400 to-purple-600 animate-fade-in">
            <div className="text-center space-y-8">
              <div className="relative">
                <Music className="w-28 h-28 text-white mb-8 animate-bounce-slow mx-auto" />
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <p className="text-white text-xl font-light max-w-md">
                Every beautiful moment deserves its own soundtrack
              </p>
              <Button
                onClick={handlePlayMusic}
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 px-12 py-6 text-lg shadow-2xl transform hover:scale-105 transition-transform"
              >
                Play Your Melody 🎶
              </Button>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-rose-500 animate-fade-in relative">
            <div className="text-center space-y-8">
              <Sparkles className="w-28 h-28 text-white mb-8 animate-sparkle mx-auto" />
              <p className="text-white text-xl font-light">
                Let's make this space as beautiful as your spirit
              </p>
              <Button
                onClick={handleDecorate}
                size="lg"
                className="bg-white text-rose-600 hover:bg-white/90 px-12 py-6 text-lg shadow-2xl backdrop-blur-sm"
              >
                Create Magic 🎀
              </Button>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 animate-fade-in relative overflow-hidden">
            <div className="text-center space-y-12">
              <div className="text-7xl font-bold bg-gradient-to-r from-white to-yellow-100 text-transparent bg-clip-text mb-8">
                🎉 Happy Birthday! 🎉
              </div>
              <p className="text-white/90 text-xl font-light max-w-md">
                Today the world celebrates you, and so do I!
              </p>
            </div>
            {showBalloons && (
              <>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-balloon-rise text-5xl"
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
              className="mt-12 bg-white text-cyan-600 hover:bg-white/90 px-12 py-6 text-lg shadow-2xl z-10 transform hover:scale-105 transition-transform"
            >
              Release the Joy! 🎈
            </Button>
          </div>
        );

      case 14:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-amber-500 animate-fade-in">
            <div className="text-center space-y-12">
              <div className="text-6xl font-bold bg-gradient-to-r from-white to-amber-100 text-transparent bg-clip-text">
                Make a Wish! 🌠
              </div>
              
              {showCake && (
                <div className="mb-8 relative transform hover:scale-105 transition-transform duration-300">
                  <div className="text-9xl filter drop-shadow-2xl">🎂</div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`text-5xl transition-all duration-700 transform ${
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
                </div>
              )}
              <p className="text-white/90 text-lg font-light max-w-sm">
                {!showCake 
                  ? "Every candle holds a wish, every wish holds a dream..." 
                  : "Make your secret wish and blow out the candles!"}
              </p>
            </div>
            <Button
              onClick={handleCakeTime}
              size="lg"
              className="mt-8 bg-white text-amber-600 hover:bg-white/90 px-8 py-6 text-lg shadow-2xl"
              disabled={showCake}
            >
              {showCake ? 'Making Magic... ✨' : 'Light the Candles 🎂'}
            </Button>
          </div>
        );

      case 15:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-pink-100 animate-fade-in p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            
            {!showLetter ? (
              <div className="text-center space-y-8 relative z-10">
                <div 
                  className="cursor-pointer transform hover:scale-110 transition-transform duration-500"
                  onClick={() => setShowLetter(true)}
                >
                  <img 
                    src={helloKittyEnvelope} 
                    alt="Hello Kitty Envelope" 
                    className="w-60 h-60 object-contain mx-auto mb-6 animate-float-slow"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-2xl font-semibold text-pink-600 animate-pulse">
                    ✨ A Special Message Awaits ✨
                  </p>
                  <p className="text-gray-600 font-light">
                    Click the envelope to open your heartwarming surprise
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-2xl w-full animate-fade-in relative z-10 border-2 border-pink-200/50">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full animate-ping"></div>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 text-transparent bg-clip-text mb-2">
                    To Someone Extraordinary 💖
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
                </div>
                
                <Textarea
                  value={letterMessage}
                  onChange={(e) => setLetterMessage(e.target.value)}
                  className="min-h-80 text-lg leading-relaxed border-2 border-pink-100 focus:border-pink-300 resize-none bg-white/50 backdrop-blur shadow-inner text-gray-700 font-light"
                  placeholder={`My Dearest Friend,

On this beautiful day that marks your arrival in this world, I want you to know how truly special you are.

Your presence in this world makes it a better place. The way you care for others, the kindness in your heart, and the light you bring wherever you go - these are gifts that make you incredibly precious.

You have this amazing ability to make people feel seen and valued. Your laughter is contagious, your wisdom beyond your years, and your spirit shines with a genuine goodness that inspires everyone around you.

Today, I hope you feel as loved and appreciated as you make others feel every day. May this year bring you endless opportunities to shine, dreams that take flight, and moments that fill your heart with pure joy.

Remember that you are capable of amazing things, worthy of wonderful experiences, and deserving of all the happiness life has to offer.

Happy Birthday to someone who makes the world more beautiful just by being in it.

With warmest wishes and admiration,
Someone who believes in you 🌟`}
                />
                
                <div className="flex justify-center mt-6 space-x-2">
                  {['🌺', '✨', '💫', '🌸', '🌟'].map((emoji, i) => (
                    <div key={i} className="text-2xl animate-bounce" style={{animationDelay: `${i * 0.2}s`}}>
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