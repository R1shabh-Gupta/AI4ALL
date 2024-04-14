import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import { getAuth } from "firebase/auth";
import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const FeedbackButton = () => {
  const { toast } = useToast();
  const auth = getAuth();
  const user = auth.currentUser;
  const textareaText = useRef<HTMLTextAreaElement>(null);

  const [rating, setRating] = useState("none");

  const showToast = (
    variant: "default" | "destructive" | null | undefined,
    title: string,
    description: string
  ) => {
    toast({
      variant: variant,
      title: title,
      description: description,
    });
  };

  const handleSubmit = () => {
    if (user) {
      try {
        const userFeedback = {
          from_name: user.displayName,
          from_email: user.email,
          to_name: "AI4ALL Team",
          message: textareaText.current?.value,
          rating: rating,
        };

        emailjs
          .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            userFeedback,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          )
          .then(
            () => {
              showToast(
                "default",
                "Feedback submitted successfully!",
                "Thank you for your feedback. We'll use it to improve our product."
              );
            },
            (error) => {
              console.log(error);
              showToast(
                "destructive",
                "Uh oh! Something went wrong.",
                "Feedback not submitted. Please try again."
              );
            }
          );
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("User not logged in");
      showToast(
        "destructive",
        "Uh oh! Something went wrong.",
        "Please login to continue."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-normal text-gray-600 text-md">
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="text-2xl">Leave feedback</DialogTitle>
          <DialogDescription className="text-center text-md">
            We'd love to hear what went well or how we can improve the product
            experience.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-3">
          <Textarea
            ref={textareaText}
            className="min-h-[100px] border-slate-400"
          />

          <ToggleGroup type="single">
            <ToggleGroupItem value="sad" onClick={() => setRating("sad")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`w-4 h-4 ${
                  rating == "sad" ? "fill-yellow-300" : ""
                }`}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                <line x1="9" x2="9.01" y1="9" y2="9"></line>
                <line x1="15" x2="15.01" y1="9" y2="9"></line>
              </svg>
            </ToggleGroupItem>

            <ToggleGroupItem
              value="moderate"
              onClick={() => setRating("moderate")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`w-4 h-4 ${
                  rating == "moderate" ? "fill-yellow-300" : ""
                }`}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" x2="16" y1="15" y2="15"></line>
                <line x1="9" x2="9.01" y1="9" y2="9"></line>
                <line x1="15" x2="15.01" y1="9" y2="9"></line>
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="happy" onClick={() => setRating("happy")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`w-4 h-4 ${
                  rating == "happy" ? "fill-yellow-300" : ""
                }`}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" x2="9.01" y1="9" y2="9"></line>
                <line x1="15" x2="15.01" y1="9" y2="9"></line>
              </svg>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;
