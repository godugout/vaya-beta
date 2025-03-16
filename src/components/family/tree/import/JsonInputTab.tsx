
import { Textarea } from "@/components/ui/textarea";

interface JsonInputTabProps {
  jsonData: string;
  setJsonData: (data: string) => void;
}

export const JsonInputTab = ({ jsonData, setJsonData }: JsonInputTabProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder={`Paste your JSON data here...\n{\n  "nodes": [\n    {"id": "1", "data": {"name": "John Doe"}},\n    {"id": "2", "data": {"name": "Jane Doe"}}\n  ],\n  "edges": [\n    {"id": "e1-2", "source": "1", "target": "2"}\n  ]\n}`}
        className="h-[200px] font-mono text-sm"
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
      />
    </div>
  );
};
