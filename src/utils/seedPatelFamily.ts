
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

interface FamilyMember {
  name: string;
  birthdate: string | null;
  email: string;
  home_address: string;
}

export async function seedPatelFamily() {
  try {
    // First, get the Patel family ID
    const { data: families, error: familyError } = await supabase
      .from("families")
      .select("id")
      .eq("name", "Patel Family")
      .single();
    
    if (familyError) {
      console.error("Error fetching Patel family:", familyError);
      return { success: false, error: familyError };
    }
    
    const familyId = families.id;
    
    // Define the family members based on the provided data
    const patelFamilyMembers: FamilyMember[] = [
      // Original family members
      { name: "Urmila Patel", birthdate: "1969-06-22", email: "", home_address: "" },
      { name: "MH Patel", birthdate: "1932-06-26", email: "", home_address: "" },
      { name: "Nita Patel", birthdate: "1973-07-04", email: "", home_address: "" },
      { name: "Tejal Patel", birthdate: "2002-08-01", email: "", home_address: "" },
      { name: "Diviya Patel", birthdate: "2008-02-08", email: "", home_address: "" },
      { name: "Kishor Patel", birthdate: "2003-08-10", email: "", home_address: "" },
      { name: "Pankaj Patel", birthdate: "2009-03-01", email: "", home_address: "" },
      { name: "Maya Patel", birthdate: "2010-01-14", email: "", home_address: "" },
      { name: "Dilip Patel", birthdate: null, email: "", home_address: "" },
      { name: "Sunita Patel", birthdate: "1977-07-07", email: "", home_address: "" },
      { name: "Chirag Patel", birthdate: "1979-06-07", email: "chirag779@gmail.com", home_address: "2214 Rosemore walk Marietta, GA 30062" },
      { name: "Sonali Patel", birthdate: "1979-07-15", email: "Sonali6123@gmail.com", home_address: "2214 Rosemore walk Marietta, GA 30062" },
      { name: "Anuja Patel", birthdate: "1981-12-16", email: "anujapatel@gmail.com", home_address: "2214 Rosemore walk Marietta, GA 30062" },
      { name: "Bina Patel", birthdate: "1976-07-19", email: "bpatel1976@gmail.com", home_address: "4702 Deepwater LN. Sugar Land TX 77479" },
      { name: "Darshan Patel", birthdate: "1983-06-27", email: "darshanpatel83@gmail.com", home_address: "" },
      { name: "Vishal Patel", birthdate: "1988-04-20", email: "vishpatel101@gmail.com", home_address: "" },
      { name: "Nikhil Patel", birthdate: "1989-06-10", email: "n1417@gmail.com", home_address: "" },
      { name: "Aashini Patel", birthdate: "1987-05-15", email: "aashpatel@gmail.com", home_address: "" },
      { name: "Rajiv Patel", birthdate: "1984-08-19", email: "rajivpatel@gmail.com", home_address: "" },
      { name: "Jay Patel", birthdate: "1977-06-06", email: "jaypatel@gmail.com", home_address: "15159 Garcal Drive, San Jose, CA 95127" },
      { name: "Jimi Patel", birthdate: "1980-11-20", email: "dpatel1980@gmail.com", home_address: "15159 Garcal Drive, San Jose, CA 95127" },
      { name: "Simi Patel", birthdate: "2007-05-19", email: "simispatel@gmail.com", home_address: "15159 Garcal Drive, San Jose, CA 95127" },
      { name: "Jaden Patel", birthdate: "2010-02-15", email: "", home_address: "" },
      { name: "Shaun Patel", birthdate: "2013-05-11", email: "", home_address: "" },
      { name: "Tushar Patel", birthdate: "1983-04-17", email: "tusharpatel@yahoo.com", home_address: "1506 Brian Ct. Milpitas, CA 95035" },
      { name: "Naveen Patel", birthdate: "1952-02-12", email: "", home_address: "" },
      { name: "Arjun Patel", birthdate: "2009-11-03", email: "", home_address: "" },
      { name: "Kavya Patel", birthdate: "2015-06-13", email: "", home_address: "" },
      { name: "Kartik Patel", birthdate: "1975-08-16", email: "", home_address: "" },
      { name: "Vidya Patel", birthdate: "1945-09-12", email: "", home_address: "" },
      { name: "Krina Patel", birthdate: "1964-12-24", email: "", home_address: "" },
      { name: "Ketan Patel", birthdate: "1969-07-07", email: "", home_address: "" },
      { name: "Kiran Patel", birthdate: "1985-07-21", email: "karankumar.desai@gmail.com", home_address: "3627Nortree Street, San Jose, CA 95148" },
      { name: "Meera K Desai", birthdate: null, email: "lisa617@gmail.com", home_address: "4702 Deepwater LN. Sugar Land TX 77479" },
      { name: "Lisa Patel", birthdate: "1976-07-19", email: "adesai17@gmail.com", home_address: "4702 Deepwater LN. Sugar Land TX 77479" },
      { name: "Minali Patel", birthdate: "1984-08-27", email: "minalip@gmail.com", home_address: "4702 Deepwater LN. Sugar Land TX 77479" },
      { name: "Swasti Patel", birthdate: "1988-03-31", email: "swastipatel@gmail.com", home_address: "112 Eagle Point, Irvine, CA 92604" },
      { name: "Dhara Patel", birthdate: "2000-01-14", email: "dharapatel@gmail.com", home_address: "112 Eagle Point, Irvine, CA 92604" },
      
      // New family members from phonebook data
      { name: "Daivyabhai Patel", birthdate: "2023-04-30", email: "", home_address: "" },
      { name: "Jai Patel", birthdate: "2023-05-03", email: "", home_address: "" },
      { name: "Vaishali Patel", birthdate: "2023-04-16", email: "", home_address: "" },
      { name: "Grishma Patel", birthdate: "2023-04-15", email: "", home_address: "" },
      { name: "Vinay Patel", birthdate: "2023-04-13", email: "", home_address: "" },
      { name: "Trushar Patel", birthdate: "2023-04-13", email: "", home_address: "" },
      { name: "Anu Patel", birthdate: "2023-04-05", email: "", home_address: "" },
      { name: "Emma Patel", birthdate: "2023-03-16", email: "", home_address: "" },
      { name: "Deevanshi Desai", birthdate: "2023-01-16", email: "", home_address: "" },
      { name: "Varsha Patel", birthdate: "2023-01-15", email: "", home_address: "" },
      { name: "Tanishee Patel", birthdate: "2023-01-05", email: "", home_address: "" },
      { name: "Mala Patel", birthdate: "2022-12-22", email: "", home_address: "" },
      { name: "Ronak Patel", birthdate: "2022-12-21", email: "", home_address: "" },
      { name: "Binita Dilip Patel", birthdate: "2022-10-17", email: "", home_address: "" },
      { name: "Thakor Patel", birthdate: "2022-09-07", email: "", home_address: "" },
      { name: "Jayesh Patel", birthdate: "2022-06-09", email: "", home_address: "" },
      { name: "Vrunda Patel", birthdate: "2022-08-30", email: "", home_address: "" },
      { name: "Pankaj Master", birthdate: "2022-08-19", email: "", home_address: "" },
      { name: "Shefali Patel", birthdate: "2022-06-01", email: "", home_address: "" },
      { name: "Alpa Patel", birthdate: null, email: "", home_address: "" },
      { name: "Ajay Patel", birthdate: null, email: "", home_address: "" },
      { name: "Kayur Patel", birthdate: null, email: "", home_address: "" },
      { name: "Ankur Patel", birthdate: null, email: "", home_address: "" },
      { name: "Vina Patel", birthdate: null, email: "", home_address: "" },
      { name: "Sunita Narshibhai Patel", birthdate: null, email: "", home_address: "" },
      { name: "Renjen Patel", birthdate: null, email: "", home_address: "" }
    ];
    
    // Seed each family member
    for (const member of patelFamilyMembers) {
      // Create a unique user ID for each family member
      const userId = uuidv4();
      
      // Parse birthdate to proper format (some birthdates might be null)
      let parsedBirthdate = null;
      if (member.birthdate) {
        parsedBirthdate = new Date(member.birthdate);
      }
      
      // Add profile for each family member
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          full_name: member.name,
          avatar_url: member.name === "Gopal" ? "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=150&h=150" : null,
          birthdate: parsedBirthdate,
          email: member.email || null,
          home_address: member.home_address || null,
          data_source: "Excel Import",
          imported_at: new Date().toISOString()
        });
      
      if (profileError) {
        console.error(`Error creating profile for ${member.name}:`, profileError);
        continue;
      }
      
      // Add as family member
      const { error: memberError } = await supabase
        .from("family_members")
        .insert({
          family_id: familyId,
          user_id: userId,
          role: "member"
        });
      
      if (memberError) {
        console.error(`Error adding ${member.name} to family:`, memberError);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error seeding Patel family:", error);
    return { success: false, error };
  }
}
