import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Story {
  id: string;
  title: string;
  content: string;
  genre: string;
  imageUrl: string;
}

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white">
      <div className="relative h-48 overflow-hidden">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            {story.genre}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {story.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {story.content}
        </p>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
