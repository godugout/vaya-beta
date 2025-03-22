
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FamilyContext } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Plus, X } from "lucide-react";

interface FamilyContextFormProps {
  initialContext?: FamilyContext;
  onSave: (context: FamilyContext) => void;
  edition?: "standard" | "hanuman";
}

export function FamilyContextForm({ initialContext, onSave, edition = "standard" }: FamilyContextFormProps) {
  const [context, setContext] = useState<FamilyContext>(initialContext || {
    familyName: "",
    ancestralRegion: "",
    currentLocation: "",
    culturalIdentity: "",
    primaryLanguage: "",
    familyElders: [],
    traditions: [],
    hobbies: [],
    familyValues: []
  });
  
  // South Asian regions for Hanuman edition
  const southAsianRegions = [
    { value: "gujarat", label: "Gujarat" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "uttar_pradesh", label: "Uttar Pradesh" },
    { value: "bihar", label: "Bihar" },
    { value: "west_bengal", label: "West Bengal" },
    { value: "tamil_nadu", label: "Tamil Nadu" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "andhra_pradesh", label: "Andhra Pradesh" },
    { value: "telangana", label: "Telangana" },
    { value: "odisha", label: "Odisha" },
    { value: "madhya_pradesh", label: "Madhya Pradesh" },
    { value: "haryana", label: "Haryana" },
    { value: "delhi", label: "Delhi" }
  ];
  
  // Languages for South Asian context
  const languages = [
    { value: "gujarati", label: "Gujarati" },
    { value: "hindi", label: "Hindi" },
    { value: "punjabi", label: "Punjabi" },
    { value: "marathi", label: "Marathi" },
    { value: "bengali", label: "Bengali" },
    { value: "tamil", label: "Tamil" },
    { value: "telugu", label: "Telugu" },
    { value: "kannada", label: "Kannada" },
    { value: "malayalam", label: "Malayalam" },
    { value: "urdu", label: "Urdu" },
    { value: "sanskrit", label: "Sanskrit" },
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" }
  ];
  
  const [newElder, setNewElder] = useState("");
  const [newTradition, setNewTradition] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleChange = (field: keyof FamilyContext, value: any) => {
    setContext(prev => ({ ...prev, [field]: value }));
  };

  const handleAddItem = (field: 'familyElders' | 'traditions' | 'hobbies' | 'familyValues', value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (value.trim()) {
      setContext(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()]
      }));
      setter("");
    }
  };

  const handleRemoveItem = (field: 'familyElders' | 'traditions' | 'hobbies' | 'familyValues', index: number) => {
    setContext(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(context);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {edition === "hanuman" ? "Family Context Settings (Hanuman Edition)" : "Family Context Settings"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="familyName">Family Name</Label>
            <Input
              id="familyName"
              value={context.familyName || ""}
              onChange={(e) => handleChange("familyName", e.target.value)}
              placeholder={edition === "hanuman" ? "e.g., Patel, Sharma, Singh" : "e.g., Smith, Johnson"}
            />
          </div>

          {edition === "hanuman" ? (
            <div className="space-y-2">
              <Label htmlFor="ancestralRegion">Ancestral Region in South Asia</Label>
              <Select
                value={context.ancestralRegion}
                onValueChange={(value) => handleChange("ancestralRegion", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {southAsianRegions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="ancestralRegion">Ancestral Region/Country</Label>
              <Input
                id="ancestralRegion"
                value={context.ancestralRegion || ""}
                onChange={(e) => handleChange("ancestralRegion", e.target.value)}
                placeholder="e.g., Italy, Mexico, China"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="currentLocation">Current Location</Label>
            <Input
              id="currentLocation"
              value={context.currentLocation || ""}
              onChange={(e) => handleChange("currentLocation", e.target.value)}
              placeholder="e.g., California, New York, Texas"
            />
          </div>

          {edition === "hanuman" ? (
            <div className="space-y-2">
              <Label htmlFor="culturalIdentity">Cultural Identity</Label>
              <Input
                id="culturalIdentity"
                value={context.culturalIdentity || ""}
                onChange={(e) => handleChange("culturalIdentity", e.target.value)}
                placeholder="e.g., Gujarati, North Indian, Indo-American"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="culturalIdentity">Cultural Identity</Label>
              <Input
                id="culturalIdentity"
                value={context.culturalIdentity || ""}
                onChange={(e) => handleChange("culturalIdentity", e.target.value)}
                placeholder="e.g., Italian-American, Mexican-American"
              />
            </div>
          )}

          {edition === "hanuman" ? (
            <div className="space-y-2">
              <Label htmlFor="primaryLanguage">Primary Language</Label>
              <Select
                value={context.primaryLanguage}
                onValueChange={(value) => handleChange("primaryLanguage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="primaryLanguage">Primary Language</Label>
              <Input
                id="primaryLanguage"
                value={context.primaryLanguage || ""}
                onChange={(e) => handleChange("primaryLanguage", e.target.value)}
                placeholder="e.g., English, Spanish, Mandarin"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Family Elders</Label>
            <div className="flex gap-2">
              <Input
                value={newElder}
                onChange={(e) => setNewElder(e.target.value)}
                placeholder={edition === "hanuman" ? "e.g., Nani, Dada, Chacha" : "e.g., Grandma Smith"}
              />
              <Button 
                type="button" 
                size="icon"
                onClick={() => handleAddItem('familyElders', newElder, setNewElder)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {context.familyElders?.map((elder, index) => (
                <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm">{elder}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1"
                    onClick={() => handleRemoveItem('familyElders', index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Family Traditions</Label>
            <div className="flex gap-2">
              <Input
                value={newTradition}
                onChange={(e) => setNewTradition(e.target.value)}
                placeholder={edition === "hanuman" ? "e.g., Diwali celebration, Raksha Bandhan" : "e.g., Sunday dinners"}
              />
              <Button 
                type="button" 
                size="icon"
                onClick={() => handleAddItem('traditions', newTradition, setNewTradition)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {context.traditions?.map((tradition, index) => (
                <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm">{tradition}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1"
                    onClick={() => handleRemoveItem('traditions', index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hobbies & Interests</Label>
            <div className="flex gap-2">
              <Input
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder={edition === "hanuman" ? "e.g., Cricket, Bollywood movies, Cooking" : "e.g., Hiking, Reading"}
              />
              <Button 
                type="button" 
                size="icon"
                onClick={() => handleAddItem('hobbies', newHobby, setNewHobby)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {context.hobbies?.map((hobby, index) => (
                <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm">{hobby}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1"
                    onClick={() => handleRemoveItem('hobbies', index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Family Values</Label>
            <div className="flex gap-2">
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={edition === "hanuman" ? "e.g., Respect for elders, Education, Seva" : "e.g., Honesty, Hard work"}
              />
              <Button 
                type="button" 
                size="icon"
                onClick={() => handleAddItem('familyValues', newValue, setNewValue)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {context.familyValues?.map((value, index) => (
                <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm">{value}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1"
                    onClick={() => handleRemoveItem('familyValues', index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Family Context
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
