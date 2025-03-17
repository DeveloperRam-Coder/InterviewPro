
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Candidate, CandidateStatus } from "@/types";
import { createCandidate, updateCandidate } from "@/services/candidateService";

// Define the status options using the CandidateStatus type
const statusOptions = [
  { value: "Applied", label: "Applied" },
  { value: "Screening", label: "Screening" },
  { value: "Technical", label: "Technical" },
  { value: "Cultural", label: "Cultural" },
  { value: "Offer", label: "Offer" },
  { value: "Hired", label: "Hired" },
  { value: "Rejected", label: "Rejected" },
];

// Create a type-safe schema using the CandidateStatus values
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  status: z.enum([
    "Applied", 
    "Screening", 
    "Technical", 
    "Cultural", 
    "Offer", 
    "Hired", 
    "Rejected"
  ] as const),
  resumeUrl: z.string().optional(),
  notes: z.string().optional(),
});

// Define the type for our form values
type FormValues = z.infer<typeof formSchema>;

interface CandidateFormProps {
  candidateId?: string;
  initialData?: Candidate | null;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ candidateId, initialData }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      status: "Applied" as CandidateStatus,
      resumeUrl: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone || "",
        position: initialData.position || "",
        status: initialData.status,
        resumeUrl: initialData.resumeUrl || "",
        notes: initialData.documents?.[0]?.name || "", // Using documents as notes since there's no direct notes field
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const candidateData: Partial<Candidate> = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        position: values.position,
        status: values.status as CandidateStatus,
        resumeUrl: values.resumeUrl,
        appliedDate: new Date().toISOString().split('T')[0], // Current date for new candidates
        skills: [], // Empty skills array for new candidates
      };
      
      if (candidateId) {
        await updateCandidate(candidateId, candidateData);
        toast({
          title: "Candidate Updated",
          description: "The candidate has been successfully updated.",
        });
      } else {
        await createCandidate(candidateData as Omit<Candidate, 'id'>);
        form.reset();
        toast({
          title: "Candidate Created",
          description: "The candidate has been successfully created.",
        });
      }
    } catch (error) {
      console.error("Error saving candidate:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving the candidate. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{candidateId ? "Edit Candidate" : "Add New Candidate"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange as (value: string) => void}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/resume.pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes about the candidate"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : candidateId ? "Update Candidate" : "Add Candidate"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CandidateForm;
