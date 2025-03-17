
import React from "react";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatDialog: React.FC<ChatDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat with us</DialogTitle>
          <DialogDescription>
            Got questions? We're here to help with your interview process.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto py-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-sm max-w-[80%]">
              <p>Hi there! How can I help you with InterviewPro today?</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Type your message..."
          />
          <Button type="button">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
