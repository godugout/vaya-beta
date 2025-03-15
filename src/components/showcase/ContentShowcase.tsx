
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoryCard } from "@/components/content/StoryCard";
import { FamilyMemberCard } from "@/components/content/FamilyMemberCard";
import { MemoryCapsuleCard } from "@/components/content/MemoryCapsuleCard";
import { NotificationBanner } from "@/components/content/NotificationBanner";

export const ContentShowcase = () => {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-6">Story Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StoryCard
            id="1"
            title="My First Memory"
            content="This is an audio recording of my earliest childhood memory."
            type="audio"
            audioUrl="/sample.mp3"
            date="2023-05-15"
            author={{ name: "Jay Patel" }}
          />
          
          <StoryCard
            id="2"
            title="Family Vacation 2022"
            content="Our amazing trip to the mountains last summer."
            type="photo"
            imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
            audioUrl="/sample.mp3"
            date="2022-08-10"
            author={{ name: "Maya Patel" }}
          />
          
          <StoryCard
            id="3"
            title="Grandma's Wisdom"
            content="I still remember the day my grandmother told me about her childhood in India. The stories of her village, the festivals they celebrated, and the traditions they upheld have stayed with me all these years. She described the vibrant colors of the markets, the delicious smells of home cooking, and the sense of community that defined her early years."
            type="transcript"
            date="2023-02-20"
            author={{ name: "Rohan Patel" }}
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Family Member Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FamilyMemberCard
            id="1"
            name="Priya Patel"
            relation="Mother"
            bio="Priya loves gardening and teaching her grandchildren about plants and nature."
            onMessage={() => {}}
            onCall={() => {}}
            onToggleLove={() => {}}
          />
          
          <FamilyMemberCard
            id="2"
            name="Raj Patel"
            relation="Father"
            bio="An amazing storyteller who keeps family history alive through his tales."
            isLoved={true}
            onMessage={() => {}}
            onCall={() => {}}
            onToggleLove={() => {}}
          />
          
          <FamilyMemberCard
            id="3"
            name="Ananya Patel"
            relation="Sister"
            bio="Creative and artistic, she captures family moments through her photography."
            onMessage={() => {}}
            onCall={() => {}}
            onToggleLove={() => {}}
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Memory Capsule Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MemoryCapsuleCard
            id="1"
            title="Family Reunion 2025"
            description="A collection of photos, stories, and mementos from our 2023 reunion, to be opened at our next reunion."
            createdAt="2023-07-15"
            unlocksAt="2025-07-15"
            isLocked={true}
            contributors={[
              { name: "Jay Patel" },
              { name: "Priya Patel" },
              { name: "Raj Patel" }
            ]}
            itemCount={15}
            onOpen={() => {}}
          />
          
          <MemoryCapsuleCard
            id="2"
            title="Grandparents' Anniversary"
            description="Memories and wishes collected for their 50th anniversary celebration."
            createdAt="2023-04-10"
            unlocksAt="2023-06-10"
            isLocked={false}
            contributors={[
              { name: "Maya Patel" },
              { name: "Arjun Patel" },
              { name: "Kiran Patel" },
              { name: "Neha Patel" }
            ]}
            itemCount={8}
            onOpen={() => {}}
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Notification Banners</h2>
        <div className="space-y-4">
          <NotificationBanner
            type="info"
            title="Welcome to Vaya!"
            message="Explore our new features designed to help preserve your family memories."
            action={{
              label: "Learn More",
              onClick: () => {},
            }}
          />
          
          <NotificationBanner
            type="success"
            title="Memory saved successfully"
            message="Your story has been added to your family's collection."
          />
          
          <NotificationBanner
            type="warning"
            title="Capsule nearing unlock date"
            message="The 'Childhood Memories' capsule will be available to open in 3 days."
            action={{
              label: "View Capsule",
              onClick: () => {},
            }}
          />
          
          <NotificationBanner
            type="error"
            title="Failed to upload recording"
            message="There was an issue with your audio file. Please try again."
            action={{
              label: "Retry",
              onClick: () => {},
            }}
          />
        </div>
      </section>
    </div>
  );
};
