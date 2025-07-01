
import { useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock calendar events
const calendarEvents = [
  { id: "1", title: "First Day of School", date: new Date(2023, 8, 4), type: "academic" },
  { id: "2", title: "Mid-term Examination", date: new Date(2023, 10, 15), type: "exam" },
  { id: "3", title: "Parent-Teacher Meeting", date: new Date(2023, 10, 25), type: "meeting" },
  { id: "4", title: "Winter Break Begins", date: new Date(2023, 11, 20), type: "holiday" },
  { id: "5", title: "School Resumes", date: new Date(2024, 0, 4), type: "academic" },
  { id: "6", title: "Sports Day", date: new Date(2023, 9, 15), type: "event" },
  { id: "7", title: "Final Examinations", date: new Date(2024, 1, 15), type: "exam" },
  { id: "8", title: "Graduation Day", date: new Date(2024, 2, 10), type: "event" },
];

const CalendarPage = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<string>("");

  // Filter events based on selected type
  const filteredEvents = filterType
    ? calendarEvents.filter(event => event.type === filterType)
    : calendarEvents;

  // Get events for the selected date
  const eventsForSelectedDate = filteredEvents.filter(
    event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );

  // Get events for the current month
  const eventsForCurrentMonth = filteredEvents.filter(
    event => 
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );

  // Get badge color for event type
  const getEventColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-blue-500";
      case "exam": return "bg-red-500";
      case "meeting": return "bg-purple-500";
      case "holiday": return "bg-green-500";
      case "event": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  // Using modifiers to show event indicators
  const modifiers = {
    eventDay: (day: Date) => {
      return filteredEvents.some(
        event =>
          event.date.getDate() === day.getDate() &&
          event.date.getMonth() === day.getMonth() &&
          event.date.getFullYear() === day.getFullYear()
      );
    }
  };

  const modifiersStyles = {
    eventDay: { 
      fontWeight: "bold",
      textDecoration: "underline" 
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("Academic Calendar")}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("Add Event")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("Calendar")}</CardTitle>
              <CardDescription>{t("View and manage academic events and schedules")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:flex-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                    className="rounded-md border shadow-sm pointer-events-auto"
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                  />
                </div>
                <div className="lg:flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-lg font-medium">
                      {t("Events on")} {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </h3>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t("All Event Types")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("All Event Types")}</SelectItem>
                        <SelectItem value="academic">{t("Academic")}</SelectItem>
                        <SelectItem value="exam">{t("Exam")}</SelectItem>
                        <SelectItem value="meeting">{t("Meeting")}</SelectItem>
                        <SelectItem value="holiday">{t("Holiday")}</SelectItem>
                        <SelectItem value="event">{t("School Event")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    {eventsForSelectedDate.length > 0 ? (
                      eventsForSelectedDate.map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className={`h-1.5 ${getEventColor(event.type)}`}></div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{t(event.title)}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {event.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                </p>
                              </div>
                              <Badge className={getEventColor(event.type)}>
                                {t(event.type.charAt(0).toUpperCase() + event.type.slice(1))}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center p-8 border border-dashed rounded-md">
                        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("No events scheduled for this day")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("Upcoming Events")}</CardTitle>
              <CardDescription>{t("Events for")} {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventsForCurrentMonth.length > 0 ? (
                  eventsForCurrentMonth
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <div key={event.id} className="flex items-center gap-4">
                        <div className="bg-muted w-12 h-12 rounded-md flex flex-col items-center justify-center text-center">
                          <div className="text-sm font-bold">{event.date.getDate()}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.date.toLocaleDateString("en-US", { month: "short" })}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{t(event.title)}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.date.toLocaleDateString("en-US", { weekday: "long" })}
                          </div>
                        </div>
                        <Badge className={getEventColor(event.type)}>
                          {t(event.type)}
                        </Badge>
                      </div>
                    ))
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-md">
                    <p className="text-sm text-muted-foreground">
                      {t("No events for this month")}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("Event Categories")}</CardTitle>
              <CardDescription>{t("Filter events by category")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["academic", "exam", "meeting", "holiday", "event"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getEventColor(type)}`}></div>
                    <Button
                      variant={filterType === type ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setFilterType(filterType === type ? "" : type)}
                    >
                      {t(type.charAt(0).toUpperCase() + type.slice(1))}
                    </Button>
                  </div>
                ))}
                {filterType && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => setFilterType("")}
                  >
                    {t("Clear Filter")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
