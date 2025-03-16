
import { 
  Archive, 
  Flower, 
  Home, 
  Leaf, 
  Mountain, 
  Trees, 
  Users,
  Heart,
  BookHeart,
  GraduationCap,
  HandHeart,
  Tent,
  Gift,
  TreeDeciduous,
  TreePalm
} from "lucide-react";
import { FamilyLogoIconOption } from "./types";

export const FamilyIconOptions: FamilyLogoIconOption[] = [
  // Original icons
  { icon: <Trees />, name: "Trees", background: "bg-vaya-accent-green/10" },
  { icon: <TreeDeciduous />, name: "Tree", background: "bg-vaya-accent-green/10" },
  { icon: <TreePalm />, name: "Palm", background: "bg-vaya-accent-green/10" },
  { icon: <Leaf />, name: "Leaf", background: "bg-vaya-accent-green/10" },
  { icon: <Flower />, name: "Flower", background: "bg-vaya-stories/10" },
  { icon: <Home />, name: "Home", background: "bg-vaya-accent-yellow/10" },
  { icon: <Users />, name: "Family", background: "bg-vaya-accent-purple/10" },
  { icon: <Heart />, name: "Heart", background: "bg-vaya-accent-purple/10" },
  { icon: <BookHeart />, name: "Stories", background: "bg-vaya-accent-blue/10" },
  { icon: <GraduationCap />, name: "Education", background: "bg-vaya-accent-blue/10" },
  { icon: <HandHeart />, name: "Care", background: "bg-vaya-accent-purple/10" },
  { icon: <Tent />, name: "Adventure", background: "bg-vaya-accent-yellow/10" },
  { icon: <Gift />, name: "Celebration", background: "bg-vaya-accent-orange/10" },
  { icon: <Mountain />, name: "Mountain", background: "bg-vaya-accent-blue/10" },
  { icon: <Archive />, name: "Archive", background: "bg-vaya-accent-orange/10" },
  
  // Custom icons for cultural representation - we'll render these differently in the UI
  { 
    icon: <img src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" alt="Vaya Star" className="w-6 h-6" />, 
    name: "Vaya Star", 
    background: "bg-black",
    customIcon: true 
  },
  { 
    icon: <img src="/lovable-uploads/28c7c4bc-01c1-461e-829b-3730a83cec0d.png" alt="Tree of Life" className="w-6 h-6" />, 
    name: "Tree of Life", 
    background: "bg-leaf/10",
    customIcon: true 
  },
  { 
    icon: <img src="/lovable-uploads/beb4747e-e0e7-41c9-bd32-228eb811e675.png" alt="Mountain" className="w-6 h-6" />, 
    name: "Mountain", 
    background: "bg-autumn/10",
    customIcon: true 
  },
  { 
    icon: <img src="/lovable-uploads/5be5684a-9f01-4cf2-9232-5a08916c1cb9.png" alt="Temple" className="w-6 h-6" />, 
    name: "Temple", 
    background: "bg-leaf/10",
    customIcon: true 
  },
  { 
    icon: <img src="/lovable-uploads/601683fb-5c58-4468-946b-7bd998a42791.png" alt="Sacred Leaf" className="w-6 h-6" />, 
    name: "Sacred Leaf", 
    background: "bg-sand/10",
    customIcon: true 
  },
  { 
    icon: <img src="/lovable-uploads/80003303-7e78-4dad-8af2-47b20a1928ba.png" alt="Wisdom Light" className="w-6 h-6" />, 
    name: "Wisdom Light", 
    background: "bg-autumn/10",
    customIcon: true 
  },
];
