
import { FamilyContext } from "@/components/chat/types";

export const personalizePrompt = (promptText: string, familyContext: FamilyContext | null): string => {
  if (!familyContext) return promptText;
  
  let personalizedText = promptText;
  
  // Replace placeholders with actual context data
  if (familyContext.ancestralRegion) {
    personalizedText = personalizedText.replace(/\[user's specific region in India\]/g, familyContext.ancestralRegion);
    personalizedText = personalizedText.replace(/\[ancestral village\/city\]/g, familyContext.ancestralRegion);
  }
  
  if (familyContext.currentLocation) {
    personalizedText = personalizedText.replace(/\[current location\]/g, familyContext.currentLocation);
  }
  
  if (familyContext.culturalIdentity) {
    personalizedText = personalizedText.replace(/\[user's specific region in India\]/g, familyContext.culturalIdentity);
  }
  
  // Handle family members
  if (familyContext.familyElders && familyContext.familyElders.length > 0) {
    const randomElder = familyContext.familyElders[Math.floor(Math.random() * familyContext.familyElders.length)];
    personalizedText = personalizedText.replace(/\[family member\]/g, randomElder);
  }
  
  // Handle traditions
  if (familyContext.traditions && familyContext.traditions.length > 0) {
    const randomTradition = familyContext.traditions[Math.floor(Math.random() * familyContext.traditions.length)];
    personalizedText = personalizedText.replace(/\[tradition\]/g, randomTradition);
  }
  
  // Handle hobbies/interests
  if (familyContext.hobbies && familyContext.hobbies.length > 0) {
    const randomHobby = familyContext.hobbies[Math.floor(Math.random() * familyContext.hobbies.length)];
    personalizedText = personalizedText.replace(/\[hobby\/interest\]/g, randomHobby);
  }
  
  return personalizedText;
};
