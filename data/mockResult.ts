export const mockResult = {
  destination: "Paris, France",
  duration: "5 days",
  origin: "Miami, USA",
  budget: "Moderate",
  group_size: "1 person",
  hotels: [
    {
      hotel_name: "Hotel Saint-André des Arts",
      hotel_address: "62 Rue Saint-André des Arts, 75006 Paris, France",
      hotel_per_night: "$200/night",
      hotel_image_url: "https://source.unsplash.com/random/800x600?hotel",
      geo_coordinates: {
        latitude: 48.8539,
        longitude: 2.3389,
      },
      rating: 4.2,
      description: "Charming hotel in the heart of Saint-Germain-des-Prés.",
    },
    {
      hotel_name: "Hotel Fabric",
      hotel_address: "31 Rue de la Folie Méricourt, 75011 Paris, France",
      hotel_per_night: "$180/night",
      hotel_image_url:
        "https://source.unsplash.com/random/800x600?boutiquehotel",
      geo_coordinates: {
        latitude: 48.8658,
        longitude: 2.3699,
      },
      rating: 4.5,
      description: "Trendy hotel in a former fabric factory.",
    },
    {
      hotel_name: "Hotel Marais Bastille",
      hotel_address: "9 Rue du Pasteur Wagner, 75011 Paris, France",
      hotel_per_night: "$160/night",
      hotel_image_url: "https://source.unsplash.com/random/800x600?cityhotel",
      geo_coordinates: {
        latitude: 48.8566,
        longitude: 2.3723,
      },
      rating: 4,
      description: "Modern hotel close to the Bastille.",
    },
  ],
  itinerary: [
    {
      day: 1,
      place_name: "Eiffel Tower",
      place_details: "Visit the iconic Eiffel Tower.",
      place_image_url: "https://source.unsplash.com/random/800x600?eiffeltower",
      place_geo_coordinates: {
        latitude: 48.8584,
        longitude: 2.2945,
      },
      place_rating: 4.7,
      place_address:
        "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      place_description:
        "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
      ticket_price: "$30",
      time_travel_each_location: "30 min by metro",
      best_time_to_visit: "Morning",
    },
    {
      day: 1,
      place_name: "Louvre Museum",
      place_details: "Explore the world-renowned Louvre Museum.",
      place_image_url: "https://source.unsplash.com/random/800x600?louvre",
      place_geo_coordinates: {
        latitude: 48.8606,
        longitude: 2.3376,
      },
      place_rating: 4.6,
      place_address: "Rue de Rivoli, 75001 Paris, France",
      place_description:
        "The Louvre Museum is the world's largest art museum and a historic monument in Paris, France. It is home to some of the most famous works of art in the world, including the Mona Lisa.",
      ticket_price: "$20",
      time_travel_each_location: "20 min by metro",
      best_time_to_visit: "Afternoon",
    },
    {
      day: 2,
      place_name: "Notre-Dame Cathedral",
      place_details: "Visit the historic Notre-Dame Cathedral.",
      place_image_url: "https://source.unsplash.com/random/800x600?notredame",
      place_geo_coordinates: {
        latitude: 48.853,
        longitude: 2.3499,
      },
      place_rating: 4.5,
      place_address:
        "6 Parvis Notre-Dame - Place Jean-Paul II, 75004 Paris, France",
      place_description:
        "Notre-Dame Cathedral is a medieval Catholic cathedral on the Île de la Cité in the fourth arrondissement of Paris, France.",
      ticket_price: "Free",
      time_travel_each_location: "25 min by metro",
      best_time_to_visit: "Morning",
    },
    {
      day: 2,
      place_name: "Sainte-Chapelle",
      place_details: "Admire the stunning stained glass of Sainte-Chapelle.",
      place_image_url:
        "https://source.unsplash.com/random/800x600?saintechapelle",
      place_geo_coordinates: {
        latitude: 48.8551,
        longitude: 2.3436,
      },
      place_rating: 4.7,
      place_address: "8 Boulevard du Palais, 75001 Paris, France",
      place_description:
        "Sainte-Chapelle is a royal chapel in the Gothic style, within the medieval Palais de la Cité, the residence of the Kings of France until the 14th century, on the Île de la Cité in Paris, France.",
      ticket_price: "$12",
      time_travel_each_location: "5 min walk",
      best_time_to_visit: "Afternoon",
    },
    {
      day: 3,
      place_name: "Palace of Versailles",
      place_details: "Explore the opulent Palace of Versailles.",
      place_image_url: "https://source.unsplash.com/random/800x600?versailles",
      place_geo_coordinates: {
        latitude: 48.8048,
        longitude: 2.1202,
      },
      place_rating: 4.8,
      place_address: "Place d'Armes, 78000 Versailles, France",
      place_description:
        "The Palace of Versailles was the principal royal residence of France from 1682, under Louis XIV, until the start of the French Revolution in 1789, under Louis XVI.",
      ticket_price: "$25",
      time_travel_each_location: "1 hour by train",
      best_time_to_visit: "Morning",
    },
    {
      day: 3,
      place_name: "Gardens of Versailles",
      place_details: "Stroll through the beautiful Gardens of Versailles.",
      place_image_url:
        "https://source.unsplash.com/random/800x600?versaillesgarden",
      place_geo_coordinates: {
        latitude: 48.805,
        longitude: 2.116,
      },
      place_rating: 4.7,
      place_address: "Place d'Armes, 78000 Versailles, France",
      place_description:
        "The Gardens of Versailles occupy part of what was once the Domaine royal de Versailles, the royal French estate and seat of government located in the region of Île-de-France.",
      ticket_price: "Free",
      time_travel_each_location: "10 min walk",
      best_time_to_visit: "Afternoon",
    },
    {
      day: 4,
      place_name: "Montmartre",
      place_details: "Explore the artistic neighborhood of Montmartre.",
      place_image_url: "https://source.unsplash.com/random/800x600?montmartre",
      place_geo_coordinates: {
        latitude: 48.8867,
        longitude: 2.3333,
      },
      place_rating: 4.6,
      place_address: "Montmartre, 75018 Paris, France",
      place_description:
        "Montmartre is a large hill in Paris's 18th arrondissement. It is known for its artistic history, the white-domed Sacré-Cœur basilica on its summit, and as a nightclub district.",
      ticket_price: "Free",
      time_travel_each_location: "30 min by metro",
      best_time_to_visit: "Morning",
    },
    {
      day: 4,
      place_name: "Sacré-Cœur Basilica",
      place_details: "Visit the Sacré-Cœur Basilica.",
      place_image_url: "https://source.unsplash.com/random/800x600?sacrecoeur",
      place_geo_coordinates: {
        latitude: 48.8867,
        longitude: 2.3431,
      },
      place_rating: 4.7,
      place_address: "35 Rue du Chevalier de la Barre, 75018 Paris, France",
      place_description:
        "The Sacré-Cœur Basilica is a Roman Catholic church and minor basilica, dedicated to the Sacred Heart of Jesus, in Paris, France.",
      ticket_price: "Free",
      time_travel_each_location: "10 min walk",
      best_time_to_visit: "Afternoon",
    },
    {
      day: 5,
      place_name: "Musée d'Orsay",
      place_details: "Visit the Musée d'Orsay, home to Impressionist art.",
      place_image_url: "https://source.unsplash.com/random/800x600?museedorsay",
      place_geo_coordinates: {
        latitude: 48.8599,
        longitude: 2.3266,
      },
      place_rating: 4.7,
      place_address: "1 Rue de la Légion d'Honneur, 75007 Paris, France",
      place_description:
        "The Musée d'Orsay is a museum in Paris, France, on the left bank of the Seine. It is housed in the former Gare d'Orsay, a Beaux-Arts railway station built between 1898 and 1900.",
      ticket_price: "$18",
      time_travel_each_location: "20 min by metro",
      best_time_to_visit: "Morning",
    },
    {
      day: 5,
      place_name: "Seine River Cruise",
      place_details: "Take a relaxing cruise on the Seine River.",
      place_image_url: "https://source.unsplash.com/random/800x600?seineriver",
      place_geo_coordinates: {
        latitude: 48.8584,
        longitude: 2.2945,
      },
      place_rating: 4.4,
      place_address: "Various locations along the Seine River, Paris",
      place_description:
        "A Seine River cruise offers a unique perspective on Paris, allowing you to see many of the city's most famous landmarks from the water.",
      ticket_price: "$20",
      time_travel_each_location: "15 min by metro",
      best_time_to_visit: "Late afternoon",
    },
  ],
};
