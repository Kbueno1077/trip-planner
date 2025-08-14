export type BudgetType = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  color: string;
};

export const selectBudgetList: BudgetType[] = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Stay within your budget",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about the cost",
    icon: "💸",
    color: "bg-purple-100 text-purple-600",
  },
];

function BudgetUI({
  onSelectBudget,
}: {
  onSelectBudget: (budget: BudgetType) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mt-4 justify-center">
      {selectBudgetList.map((budget) => (
        <div
          onClick={() => {
            onSelectBudget(budget);
          }}
          key={budget.id}
          className="group flex-1 min-w-[120px] max-w-[140px] p-3 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
              {budget.icon}
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 text-sm">
              {budget.title}
            </h3>
            <p className="text-xs text-gray-500 leading-tight">{budget.desc}</p>
            <div
              className={`mt-1 text-xs font-medium px-2 py-1 rounded-full ${budget.color}`}
            >
              {budget.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BudgetUI;
