

import React from 'react';

export const events = [
  {
    id: 1,
    title: "Film Festival 2024",
    date: "Dec 13-20, 2024",
    location: "Grand Cinema Hall, Trivandrum",
    description: "Experience a curated selection of award-winning films from around the world.",
    posterUrl: "/titles/9196.jpg",
    learnMoreUrl: "https://iffk.in/", // Link to IFFK website
  },
  {
    id: 2,
    title: "Premiere Night: Thudarum",
    date: "December 28, 2024",
    location: "Regal Cinemas, Kochi",
    description: "Be the first to watch this year's one of the most anticipated film of Mohanlal.",
    posterUrl: "/titles/thudarum.jpg",
    learnMoreUrl: "https://www.imdb.com/title/tt31969600/"
  },

  {
    id: 3,
    title: "Director's Talk: Lijo Jose Pellissery, Vetrimaaran",
    date: "January 6, 2025",
    location: "Cineplex Theater, Trivandrum",
    description: "Join an exclusive session with the legendary directors discussing their filmography.",
    posterUrl: "/titles/Lv.jpg",
    learnMoreUrl: "https://youtu.be/Z0jlfhuIPG8?si=r3aB6lT08c8xVcuj", // Link to IFFK website
  },
];

export const Events = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Upcoming Events</h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={event.posterUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {event.date} &middot; {event.location}
                </p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <a
                  href={event.learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded inline-block"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
