
import { format, isAfter, isBefore, isToday, isTomorrow } from "date-fns";

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return "Today";
  }
  
  if (isTomorrow(date)) {
    return "Tomorrow";
  }
  
  return format(date, "MMM d, yyyy");
};

export const getDateColor = (date: Date): string => {
  const today = new Date();
  
  if (isBefore(date, today)) {
    return "text-destructive";
  }
  
  if (isToday(date)) {
    return "text-priority-medium";
  }
  
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);
  
  if (isBefore(date, twoWeeksLater)) {
    return "text-foreground";
  }
  
  return "text-muted-foreground";
};

export const isOverdue = (date: Date): boolean => {
  return isBefore(date, new Date());
};
