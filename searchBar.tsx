import { useState, useRef } from "react";
import { Search, Mic, Camera, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationChange?: (location: string) => void;
}

export default function SearchBar({ onSearch, onLocationChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("جميع المدن");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const recognitionRef = useRef<any>(null);

  const locations = ["جميع المدن", "الرياض", "جدة", "الدمام", "الخبر", "الكويت", "أبو ظبي", "دبي"];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("المتصفح لا يدعم البحث الصوتي");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "ar-SA";

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setSearchQuery(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const handleCameraSearch = () => {
    alert("ميزة البحث بالكاميرا قيد التطوير");
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
    onLocationChange?.(location);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="ابحث عن المنتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <Button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          بحث
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={handleVoiceSearch}
          disabled={isListening}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          <Mic size={18} />
          {isListening ? "جاري الاستماع..." : "بحث صوتي"}
        </Button>

        <Button
          onClick={handleCameraSearch}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          <Camera size={18} />
          بحث بالكاميرا
        </Button>

        <div className="relative">
          <Button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            <MapPin size={18} />
            {selectedLocation}
          </Button>

          {showLocationDropdown && (
            <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  className="block w-full text-right px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
