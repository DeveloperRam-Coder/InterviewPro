
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

const data = [
  { name: "Screening", value: 12, color: "#4f46e5" },
  { name: "Technical", value: 8, color: "#8b5cf6" },
  { name: "Cultural", value: 5, color: "#ec4899" },
  { name: "Offer", value: 3, color: "#10b981" },
  { name: "Rejected", value: 6, color: "#ef4444" }
];

const CandidateStats = () => {
  return (
    <div className="h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} Candidates`, 'Count']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CandidateStats;
