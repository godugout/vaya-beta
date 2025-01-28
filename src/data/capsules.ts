import { Camera, Gift, Heart, Music, Star, Image, Book, Users } from "lucide-react";

export const capsules = [
  {
    title: "Family Reunion 2024",
    link: "/capsules/reunion-2024",
    icon: Star,
    colorKey: "orange",
    metadata: {
      creatorInitials: "JD",
      itemCount: 12,
      status: "upcoming" as const,
      date: "2024-07-15",
    }
  },
  {
    title: "Holiday Memories",
    link: "/capsules/holidays",
    icon: Gift,
    colorKey: "green",
    metadata: {
      creatorInitials: "MC",
      itemCount: 8,
      status: "active" as const,
      date: "2023-12-25",
    }
  },
  {
    title: "Wedding Anniversary",
    link: "/capsules/anniversary",
    icon: Heart,
    colorKey: "orange",
    metadata: {
      creatorInitials: "AS",
      itemCount: 15,
      status: "locked" as const,
      date: "2024-02-14",
    }
  },
  {
    title: "Summer Vacation",
    link: "/capsules/summer",
    icon: Camera,
    colorKey: "green",
    metadata: {
      creatorInitials: "RK",
      itemCount: 6,
      status: "active" as const,
      date: "2024-06-01",
    }
  },
  {
    title: "Family Concert",
    link: "/capsules/concert",
    icon: Music,
    colorKey: "orange",
    metadata: {
      creatorInitials: "PL",
      itemCount: 4,
      status: "revealed" as const,
      date: "2023-11-30",
    }
  },
  {
    title: "Beach Day Photos",
    link: "/capsules/beach",
    icon: Image,
    colorKey: "blue",
    metadata: {
      creatorInitials: "EM",
      itemCount: 24,
      status: "active" as const,
      date: "2024-03-15",
    }
  },
  {
    title: "Graduation Day",
    link: "/capsules/graduation",
    icon: Book,
    colorKey: "green",
    metadata: {
      creatorInitials: "TK",
      itemCount: 18,
      status: "upcoming" as const,
      date: "2024-05-20",
    }
  },
  {
    title: "Family Recipes",
    link: "/capsules/recipes",
    icon: Heart,
    colorKey: "orange",
    metadata: {
      creatorInitials: "MR",
      itemCount: 10,
      status: "active" as const,
      date: "2024-04-01",
    }
  },
  {
    title: "Birthday Celebration",
    link: "/capsules/birthday",
    icon: Gift,
    colorKey: "yellow",
    metadata: {
      creatorInitials: "SP",
      itemCount: 15,
      status: "upcoming" as const,
      date: "2024-08-10",
    }
  },
  {
    title: "Family Reunion",
    link: "/capsules/reunion",
    icon: Users,
    colorKey: "blue",
    metadata: {
      creatorInitials: "JW",
      itemCount: 30,
      status: "active" as const,
      date: "2024-07-04",
    }
  }
];