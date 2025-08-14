import { TripPlan } from "@/types/trip_details";

export const mockResult: TripPlan = {
  destination: "France",
  duration: "5",
  origin: "Miami",
  budget: "Moderate",
  group_size: "1",
  hotels: [
    {
      hotel_name: "Hotel Saint-André des Arts",
      hotel_address: "27 Rue Saint-André des Arts, 75006 Paris, France",
      hotel_per_night: "$250/night",
      hotel_image_url: "https://example.com/hotel_saint_andre.jpg",
      geo_coordinates: {
        latitude: 48.8543,
        longitude: 2.3387,
      },
      rating: 4.2,
      description:
        "Charming hotel in the heart of the Latin Quarter, steps from the Seine.",
    },
    {
      hotel_name: "Hotel Fabric",
      hotel_address: "31 Rue de la Folie Méricourt, 75011 Paris, France",
      hotel_per_night: "$220/night",
      hotel_image_url: "https://example.com/hotel_fabric.jpg",
      geo_coordinates: {
        latitude: 48.8657,
        longitude: 2.3698,
      },
      rating: 4.5,
      description:
        "Modern hotel in a former fabric factory, offering stylish rooms and a relaxed atmosphere.",
    },
    {
      hotel_name: "Hotel Jardin Le Brea",
      hotel_address: "5 Rue du Jardin, 75006 Paris, France",
      hotel_per_night: "$190/night",
      hotel_image_url: "https://example.com/hotel_jardin_brea.jpg",
      geo_coordinates: {
        latitude: 48.8433,
        longitude: 2.3304,
      },
      rating: 4,
      description:
        "Cozy hotel near the Luxembourg Gardens, perfect for a peaceful stay.",
    },
  ],
  itinerary: [
    {
      day: 1,
      activities: [
        {
          time_of_day: "Afternoon",
          place_name: "Eiffel Tower",
          place_details: "Visit the iconic Eiffel Tower.",
          place_image_url: "https://example.com/eiffel_tower.jpg",
          place_rating: 4.7,
          place_address:
            "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
          place_description:
            "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
          ticket_price: "$30",
          time_travel_each_location: "45 min by metro",
          best_time_to_visit: "Afternoon",
          place_geo_coordinates: {
            latitude: 48.8584,
            longitude: 2.2945,
          },
        },
        {
          time_of_day: "Evening",
          place_name: "Seine River Cruise",
          place_details: "Enjoy a relaxing cruise on the Seine River.",
          place_image_url: "https://example.com/seine_river_cruise.jpg",
          place_rating: 4.5,
          place_address: "Various departure points along the Seine, Paris",
          place_description:
            "A Seine River cruise offers a unique perspective of Paris's landmarks.",
          ticket_price: "$25",
          time_travel_each_location: "15 min walk from Eiffel Tower",
          best_time_to_visit: "Evening",
          place_geo_coordinates: {
            latitude: 48.8584,
            longitude: 2.2945,
          },
        },
      ],
    },
    {
      day: 2,
      activities: [
        {
          time_of_day: "Morning",
          place_name: "Louvre Museum",
          place_details: "Explore the world-renowned Louvre Museum.",
          place_image_url: "https://example.com/louvre_museum.jpg",
          place_rating: 4.8,
          place_address: "Rue de Rivoli, 75001 Paris, France",
          place_description:
            "The Louvre Museum is the world's largest art museum and a historic monument in Paris, France.",
          ticket_price: "$22",
          time_travel_each_location: "30 min by metro",
          best_time_to_visit: "Morning",
          place_geo_coordinates: {
            latitude: 48.8606,
            longitude: 2.3376,
          },
        },
        {
          time_of_day: "Afternoon",
          place_name: "Notre-Dame Cathedral",
          place_details:
            "Visit the historic Notre-Dame Cathedral (exterior view).",
          place_image_url: "https://example.com/notre_dame.jpg",
          place_rating: 4.6,
          place_address:
            "6 Parvis Notre-Dame - Place Jean-Paul II, 75004 Paris, France",
          place_description:
            "Notre-Dame Cathedral is a medieval Catholic cathedral in Paris, France.",
          ticket_price: "Free (exterior view)",
          time_travel_each_location: "20 min walk from Louvre",
          best_time_to_visit: "Afternoon",
          place_geo_coordinates: {
            latitude: 48.853,
            longitude: 2.3499,
          },
        },
      ],
    },
    {
      day: 3,
      activities: [
        {
          time_of_day: "Morning",
          place_name: "Versailles Palace",
          place_details: "Take a day trip to the Palace of Versailles.",
          place_image_url: "https://example.com/versailles_palace.jpg",
          place_rating: 4.7,
          place_address: "Place d'Armes, 78000 Versailles, France",
          place_description:
            "The Palace of Versailles was the principal royal residence of France from 1682, under Louis XIV, until the start of the French Revolution in 1789, under Louis XVI.",
          ticket_price: "$35",
          time_travel_each_location: "1 hour by train",
          best_time_to_visit: "Morning",
          place_geo_coordinates: {
            latitude: 48.8048,
            longitude: 2.1202,
          },
        },
        {
          time_of_day: "Afternoon",
          place_name: "Gardens of Versailles",
          place_details: "Explore the beautiful Gardens of Versailles.",
          place_image_url: "https://example.com/versailles_gardens.jpg",
          place_rating: 4.8,
          place_address: "Place d'Armes, 78000 Versailles, France",
          place_description:
            "The Gardens of Versailles are one of the largest and most beautiful gardens in the world.",
          ticket_price: "Free (with palace ticket)",
          time_travel_each_location: "Within Versailles Palace grounds",
          best_time_to_visit: "Afternoon",
          place_geo_coordinates: {
            latitude: 48.8048,
            longitude: 2.1202,
          },
        },
      ],
    },
    {
      day: 4,
      activities: [
        {
          time_of_day: "Morning",
          place_name: "Montmartre",
          place_details: "Wander through the charming streets of Montmartre.",
          place_image_url: "https://example.com/montmartre.jpg",
          place_rating: 4.6,
          place_address: "Montmartre, 75018 Paris, France",
          place_description:
            "Montmartre is a large hill in Paris's 18th arrondissement. It is known for the Sacré-Cœur Basilica, and for being an artistic center.",
          ticket_price: "Free",
          time_travel_each_location: "40 min by metro",
          best_time_to_visit: "Morning",
          place_geo_coordinates: {
            latitude: 48.8864,
            longitude: 2.343,
          },
        },
        {
          time_of_day: "Afternoon",
          place_name: "Sacré-Cœur Basilica",
          place_details: "Visit the Sacré-Cœur Basilica in Montmartre.",
          place_image_url: "https://example.com/sacre_coeur.jpg",
          place_rating: 4.7,
          place_address: "35 Rue du Chevalier de la Barre, 75018 Paris, France",
          place_description:
            "The Sacré-Cœur Basilica is a Roman Catholic church and minor basilica, dedicated to the Sacred Heart of Jesus, in Paris, France.",
          ticket_price: "Free",
          time_travel_each_location: "10 min walk in Montmartre",
          best_time_to_visit: "Afternoon",
          place_geo_coordinates: {
            latitude: 48.8867,
            longitude: 2.3431,
          },
        },
        {
          time_of_day: "Evening",
          place_name: "Dinner in Montmartre",
          place_details: "Enjoy a traditional French dinner in Montmartre.",
          place_image_url: "https://example.com/montmartre_dinner.jpg",
          place_rating: 4.3,
          place_address: "Various restaurants in Montmartre, Paris",
          place_description:
            "Montmartre offers a variety of traditional French restaurants.",
          ticket_price: "$40",
          time_travel_each_location: "Walking distance in Montmartre",
          best_time_to_visit: "Evening",
          place_geo_coordinates: {
            latitude: 48.8864,
            longitude: 2.343,
          },
        },
      ],
    },
    {
      day: 5,
      activities: [
        {
          time_of_day: "Morning",
          place_name: "Musée d'Orsay",
          place_details:
            "Visit the Musée d'Orsay, housed in a former railway station.",
          place_image_url: "https://example.com/musee_orsay.jpg",
          place_rating: 4.7,
          place_address: "1 Rue de la Légion d'Honneur, 75007 Paris, France",
          place_description:
            "The Musée d'Orsay is a museum in Paris, France, on the left bank of the Seine. It is housed in the former Gare d'Orsay, a Beaux-Arts railway station built between 1898 and 1900.",
          ticket_price: "$20",
          time_travel_each_location: "30 min by metro",
          best_time_to_visit: "Morning",
          place_geo_coordinates: {
            latitude: 48.8599,
            longitude: 2.3265,
          },
        },
        {
          time_of_day: "Afternoon",
          place_name: "Saint-Germain-des-Prés",
          place_details: "Explore the Saint-Germain-des-Prés neighborhood.",
          place_image_url: "https://example.com/saint_germain.jpg",
          place_rating: 4.5,
          place_address: "Saint-Germain-des-Prés, 75006 Paris, France",
          place_description:
            "Saint-Germain-des-Prés is a stylish district known for its cafes, art galleries, and fashion boutiques.",
          ticket_price: "Free (window shopping)",
          time_travel_each_location: "15 min by metro",
          best_time_to_visit: "Afternoon",
          place_geo_coordinates: {
            latitude: 48.8543,
            longitude: 2.3387,
          },
        },
      ],
    },
  ],
};
