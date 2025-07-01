
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: string;
  title: string;
  time: string;
  description: string;
  icon?: React.ReactNode;
}

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  className,
}) => {
  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "student":
        return "bg-blue-100 text-blue-700";
      case "teacher":
        return "bg-green-100 text-green-700";
      case "course":
        return "bg-purple-100 text-purple-700";
      case "exam":
        return "bg-red-100 text-red-700";
      case "attendance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start p-4">
              {activity.icon ? (
                <div className="mr-4 mt-0.5">{activity.icon}</div>
              ) : (
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center mr-4 mt-0.5",
                    getActivityTypeColor(activity.type)
                  )}
                >
                  {activity.type.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
