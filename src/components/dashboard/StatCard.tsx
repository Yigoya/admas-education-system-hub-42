
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
            {trend && (
              <div
                className={cn(
                  "flex items-center text-xs font-medium mt-2",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}
              >
                <span
                  className={cn(
                    "mr-1 flex items-center",
                    trend.positive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.positive ? "↑" : "↓"}
                </span>
                <span>{trend.value}%</span>
                <span className="ml-1 text-muted-foreground">
                  from last month
                </span>
              </div>
            )}
          </div>
          <div className="h-12 w-12 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center text-primary-blue">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
