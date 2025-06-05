import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StoryGeneratorProps {
  onGenerateStories: (genres: string[], childName?: string) => void;
  isGenerating: boolean;
  hasPhoto: boolean;
}

const genres = [
  "Приключения",
  "Сказка",
  "Фантастика",
  "Детектив",
  "Дружба",
  "Семья",
  "Животные",
  "Космос",
  "Природа",
  "Магия",
];

const StoryGenerator: React.FC<StoryGeneratorProps> = ({
  onGenerateStories,
  isGenerating,
  hasPhoto,
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [childName, setChildName] = useState("");

  const toggleGenre = (genre: string) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre)
          : [...prev, genre].slice(0, 5), // Максимум 5 жанров
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Создать персональные истории
        </h2>
        <p className="text-gray-600">
          Ваш ребенок станет главным героем каждой истории
        </p>
      </div>

      {/* Имя ребенка */}
      <div className="space-y-2">
        <Label
          htmlFor="childName"
          className="text-sm font-medium text-gray-700"
        >
          Имя ребенка (необязательно)
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="childName"
            type="text"
            placeholder="Как зовут вашего героя?"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Выберите жанры (до 5):
        </h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenres.includes(genre) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedGenres.includes(genre)
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "hover:bg-primary/10"
              }`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        onClick={() => onGenerateStories(selectedGenres, childName)}
        disabled={!hasPhoto || isGenerating || selectedGenres.length === 0}
        className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Создаю персональные истории...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Создать истории с моим героем
          </>
        )}
      </Button>

      {!hasPhoto && (
        <p className="text-sm text-amber-600 text-center bg-amber-50 p-3 rounded-lg">
          Сначала загрузите фото ребенка для персонализации
        </p>
      )}

      {hasPhoto && (
        <div className="text-sm text-green-600 text-center bg-green-50 p-3 rounded-lg">
          ✨ Фото загружено! Готов создать истории с вашим героем
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
