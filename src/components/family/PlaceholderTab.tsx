
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderTabProps {
  title: string;
}

export function PlaceholderTab({ title }: PlaceholderTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          This is where {title.toLowerCase()} will be displayed.
        </p>
      </CardContent>
    </Card>
  );
}
