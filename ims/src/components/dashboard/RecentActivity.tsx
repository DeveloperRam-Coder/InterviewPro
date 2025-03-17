
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      avatar: "AC"
    },
    action: "submitted feedback for",
    subject: "Sarah Johnson's technical interview",
    timestamp: "10 minutes ago"
  },
  {
    id: "2",
    user: {
      name: "Lisa Wong",
      avatar: "LW"
    },
    action: "scheduled an interview with",
    subject: "Robert Davis for Senior Developer position",
    timestamp: "1 hour ago"
  },
  {
    id: "3",
    user: {
      name: "James Peters",
      avatar: "JP"
    },
    action: "created an offer for",
    subject: "Emily Davis for UX Designer role",
    timestamp: "3 hours ago"
  },
  {
    id: "4",
    user: {
      name: "David Kim",
      avatar: "DK"
    },
    action: "added a new candidate",
    subject: "Michael Brown for Product Manager position",
    timestamp: "Yesterday"
  }
];

const RecentActivity = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${activity.user.name.replace(" ", "+")}`} />
            <AvatarFallback>{activity.user.avatar}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span>
              {" "}
              {activity.action}
              {" "}
              <span className="font-medium">{activity.subject}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
