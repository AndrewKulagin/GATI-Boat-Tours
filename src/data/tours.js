import { getImageUrl } from "../services/azureStorage";

export const TOURS = [
  {
    id: 1,
    name: 'Snorkelling',
    path: '/tours/snorkelling',
    description: 'Explore the vibrant coral reefs and marine life around Magnetic Island',
    image: getImageUrl("snorkeling-hero.jpg"),
    tourInfo: {
      duration: "6-8 Hours",
      groupSize: "Up to 8 People Per Boat",
      skillLevel: "All Welcome"
    },
    sections: [
      {
        title: "Complete Island Snorkelling Adventure",
        content: "Join us for an unforgettable journey around Magnetic Island's best snorkelling spots. Starting from Nelly Bay, we'll circumnavigate the island, visiting multiple pristine locations. Our flexible schedule allows us to choose the perfect spots based on weather conditions and your group's preferences, ensuring the best possible experience.",
        image: getImageUrl("snorkeling-overview.jpg")
      },
      {
        title: "Geoffrey Bay Highlights",
        content: "Explore the shallow waters of Geoffrey Bay, perfect for beginners and experienced snorkelers alike. Discover the bay's fascinating shipwrecks and extensive coral reef system. Keep an eye out for the resident stingrays often found hiding in the sandy bottom. The bay's protected waters make it an ideal starting point for your snorkeling adventure.",
        image: getImageUrl("geoffrey-bay-snorkel.jpg")
      },
      {
        title: "Florence Bay Experience",
        content: "Continue to the crystal-clear waters of Florence Bay, featuring some of the island's best coral formations. Explore the excellent coral bommies toward the northern point and discover the rocky caverns and swim-throughs at the southern end. The bay's pristine conditions and diverse marine life make it a highlight of our tour.",
        image: getImageUrl("florence-bay-coral.jpg")
      },
      {
        title: "Arthur Bay Discovery",
        content: "Visit Arthur Bay's extensive reef system, where you can explore fascinating corals housing a variety of reef fish. The protected waters of this Marine Park zone offer excellent visibility and diverse marine life explore the corals on the right hand side of the bay, and delve into deeper water on it's l;eft for an opportunity to spot the resident turtles.",
        image: getImageUrl("arthur-bay-caves.jpg")
      },
      {
        title: "Professional Equipment & Safety",
        content: "We provide all necessary equipment including quality masks, snorkels, fins, and seasonal stinger suits. Our experienced guides offer comprehensive safety briefings and basic instruction for beginners. The boat is equipped with first aid facilities, fresh water, and dry storage for your belongings.",
        image: getImageUrl("snorkel-equipment.jpg")
      },
      {
        title: "Scenic Highlights & Wildlife",
        content: "Between snorkeling spots, cruise past the historic City of Adelaide shipwreck in Cockle Bay, visible during low tide. Navigate through the peaceful mangrove forests where you might spot ospreys, white-bellied sea-eagles, and various marine life. Our route offers perfect photo opportunities of Magnetic Island's stunning coastline and wildlife.",
        image: getImageUrl("scenic-highlights.jpg")
      }
    ]
  },
  {
    id: 2,
    name: 'Fishing',
    path: '/tours/fishing',
    description: 'Experience world-class fishing in the waters around Magnetic Island',
    image: getImageUrl("fishing-hero.jpg"),
    tourInfo: {
      duration: "4-8 Hours",
      groupSize: "Up to 8 People Per Boat",
      skillLevel: "All Welcome"
    },
    sections: [
      {
        title: "Deep Sea Fishing Experience",
        content: "Whether you're an experienced angler or trying fishing for the first time, our tours offer exciting opportunities to catch various species including mackerel, coral trout, and mangrove jack. Our early morning departures (typically 7 AM) ensure you get the best fishing conditions of the day.",
        image: getImageUrl("deep-sea-fishing.jpg")
      },
      {
        title: "Horseshoe Bay Fishing",
        content: "Experience fishing in Magnetic Island's largest bay, where you might encounter Loggerhead Turtles and Dugongs while fishing. The western end of the bay offers excellent fishing spots, and our experienced guides know exactly where to find the best catches of the season.",
        image: getImageUrl("horseshoe-bay-fishing.jpg")
      },
      {
        title: "West Point Adventures",
        content: "For those seeking a more remote experience, we'll take you to West Point, one of the island's most secluded fishing spots. This area is particularly good for sunset fishing sessions, offering both excellent catches and spectacular views. Your guide will share local knowledge about the best techniques for fishing these waters.",
        image: getImageUrl("west-point-fishing.jpg")
      },
      {
        title: "Complete Fishing Setup",
        content: "We provide all fishing equipment including quality rods, reels, tackle, bait, hooks, lines, sinkers, lures, and gaff. Our boat is equipped with fish-finding technology, and we'll provide you with fishing charts showing catch regulations. We also supply an esky to keep your catch fresh.",
        image: getImageUrl("fishing-equipment.jpg")
      }
    ]
  },
  {
    id: 3,
    name: 'Sunset',
    path: '/tours/sunset',
    description: 'Experience breathtaking Magnetic Island sunsets from the water',
    image: getImageUrl("sunset-cruise-hero.jpg"),
    tourInfo: {
      duration: "2-3 Hours",
      groupSize: "Up to 8 People Per Boat",
      skillLevel: "All Welcome"
    },
    sections: [
      {
        title: "West Point Sunset Experience",
        content: "Journey to the remote West Point beach, offering uninterrupted views of the setting sun over the water. This secluded location provides the perfect vantage point for experiencing Magnetic Island's famous color-filled skies. Watch as the sun paints the sky in deep reds, auburns, oranges, or sometimes surprising purples and magentas.",
        image: getImageUrl("west-point-sunset.jpg")
      },
      {
        title: "Horseshoe Bay Alternative",
        content: "When conditions favor it, we'll cruise to Horseshoe Bay, the island's largest bay, for a different but equally spectacular sunset view. The bay's wide expanse offers stunning photo opportunities as the sun sets behind the headland, with the possibility of spotting dugongs and turtles in the golden hour light.",
        image: getImageUrl("horseshoe-sunset.jpg")
      },
      {
        title: "Relaxed Evening Atmosphere",
        content: "Bring your own drinks and nibbles to enjoy as nature's light show unfolds. Our comfortable boat provides the perfect platform for viewing and photography, with plenty of space to move around for the best angles. Our experienced captain will position the vessel for optimal viewing while ensuring your comfort and safety.",
        image: getImageUrl("sunset-comfort.jpg")
      },
      {
        title: "Wildlife Encounters",
        content: "The calm evening waters often bring out local wildlife. Keep your camera ready for possible sightings of dolphins, dugongs, and sea birds returning to their roosting spots. The peaceful evening atmosphere creates perfect conditions for wildlife observation.",
        image: getImageUrl("sunset-wildlife.jpg")
      }
    ]
  },
  {
    id: 4,
    name: 'Private Charter',
    path: '/tours/privatecharter',
    description: 'Create your own perfect day on the water around Magnetic Island',
    image: getImageUrl("private-charter-hero.jpg"),
    tourInfo: {
      duration: "Flexible (2-8 Hours)",
      groupSize: "Up to 8 People Per Boat",
      skillLevel: "All Welcome"
    },
    sections: [
      {
        title: "Customized Itinerary",
        content: "Design your perfect day on the water with our private charter option. From snorkeling at Florence Bay to fishing at West Point, or simply exploring secluded beaches, the choice is yours. Our experienced captain will help you plan the ideal itinerary based on your interests, weather conditions, and local knowledge.",
        image: getImageUrl("charter-planning.jpg")
      },
      {
        title: "Secluded Beach Access",
        content: "Visit harder-to-reach locations like Radical Bay and Balding Bay, known for their pristine beaches and clear waters. Explore Arthur Bay's caves or the tranquil waters of Lover's Bay. Our local knowledge ensures you'll discover the island's hidden gems while avoiding the busier tourist spots.",
        image: getImageUrl("secluded-beaches.jpg")
      },
      {
        title: "Historical Sites & Nature",
        content: "Explore the historic City of Adelaide shipwreck in Cockle Bay, cruise through the mangrove forests to spot eagles and ospreys, or visit the old quarantine station site at West Point. We can incorporate these fascinating historical and natural attractions into your day.",
        image: getImageUrl("historical-sites.jpg")
      },
      {
        title: "Complete Equipment Access",
        content: "Your charter includes access to all our equipment - fishing gear, snorkeling equipment, and safety gear. We provide esky storage for your food and drinks, comfortable seating, and shade coverage. Our boat is wheelchair accessible and equipped with all necessary safety equipment.",
        image: getImageUrl("charter-equipment.jpg")
      },
      {
        title: "Flexible Activities",
        content: "Combine multiple activities in one day - start with morning fishing, enjoy afternoon snorkeling, and finish with a sunset cruise. Stop for beach picnics, photography sessions, or wildlife watching. We're happy to adjust the schedule based on your group's interests and energy levels.",
        image: getImageUrl("charter-activities.jpg")
      }
    ]
  }
];