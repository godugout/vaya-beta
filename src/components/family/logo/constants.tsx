
import { Archive, Flower, Home, Leaf, Mountain, Trees, Users } from "lucide-react";
import { FamilyLogoIconOption } from "./types";

export const FamilyIconOptions: FamilyLogoIconOption[] = [
  { icon: <Trees />, name: "Tree", background: "bg-vaya-accent-green/10" },
  { icon: <Leaf />, name: "Leaf", background: "bg-vaya-accent-green/10" },
  { icon: <Flower />, name: "Flower", background: "bg-vaya-stories/10" },
  { icon: <Mountain />, name: "Mountain", background: "bg-vaya-accent-blue/10" },
  { icon: <Home />, name: "Home", background: "bg-vaya-accent-yellow/10" },
  { icon: <Users />, name: "Family", background: "bg-vaya-accent-purple/10" },
  { icon: <Archive />, name: "Archive", background: "bg-vaya-accent-orange/10" },
];
