
import { useEffect, useState } from "react";
import { Contact } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ContactSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ContactSelect = ({ value, onChange }: ContactSelectProps) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("contacts")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true);
      
      if (data) {
        setContacts(data.map(c => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || undefined,
          relation: c.relation,
          isActive: c.is_active
        })));
      }
    };

    fetchContacts();
  }, [user]);

  return (
    <div className="space-y-2">
      <Label htmlFor="contact">Trusted Contact</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="contact">
          <SelectValue placeholder="Select a trusted contact" />
        </SelectTrigger>
        <SelectContent>
          {contacts.map((contact) => (
            <SelectItem key={contact.id} value={contact.id}>
              {contact.name} ({contact.relation})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ContactSelect;
