
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateCapsuleForm from "../CreateCapsuleForm";

export const CapsuleTableFooter = () => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={6} className="px-6">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 text-base text-gray-600">
              <MessageSquare className="h-5 w-5" />
              <span className="font-medium">Share memories with your family by creating a new time capsule</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="autumn" className="text-base">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Capsule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <CreateCapsuleForm />
              </DialogContent>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
