export type GroupSizeType = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people: string;
};

export const selectTravelersList: GroupSizeType[] = [
  {
    id: 1,
    title: "Just me",
    desc: "A solo travelers exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "A romantic getaway for two",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family vacation",
    icon: "🏠",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends",
    icon: "👥",
    people: "5 to 10 people",
  },
];

function GroupSizeUI({
  onSelectGroupSize,
}: {
  onSelectGroupSize: (traveler: GroupSizeType) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {selectTravelersList.map((traveler) => (
        <div
          onClick={() => {
            onSelectGroupSize(traveler);
          }}
          key={traveler.id}
          className="group relative p-4 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-center text-center space-y-2 mt-5">
            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
              {traveler.icon}
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
              {traveler.title}
            </h3>
            <p className="text-xs text-gray-500 leading-tight">
              {traveler.desc}
            </p>
            <div className="absolute top-2 right-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              {typeof traveler.people === "number"
                ? `${traveler.people}`
                : traveler.people}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupSizeUI;
