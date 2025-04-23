
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import ContactCard from "@/components/contacts/ContactCard";
import { Contact } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Contacts = () => {
  const { user } = useAuth();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    relation: ""
  });

  useEffect(() => {
    // Fetch contacts for current user
    const fetchContacts = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        toast.error("Failed to fetch contacts.");
        setContacts([]);
      } else {
        setContacts(
          (data ?? []).map((c) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone || undefined,
            relation: c.relation,
            isActive: c.is_active
          }))
        );
      }
      setLoading(false);
    };
    fetchContacts();
  }, [user]);

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.email || !newContact.relation) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!user) {
      toast.error("You must be signed in to add contacts.");
      return;
    }
    const inserting = {
      user_id: user.id,
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone !== "" ? newContact.phone : null,
      relation: newContact.relation,
      is_active: true
    };
    const { data, error } = await supabase
      .from("contacts")
      .insert([inserting])
      .select()
      .maybeSingle();

    if (error) {
      toast.error("Failed to add contact.");
      return;
    }
    toast.success("Contact added!");
    setContacts([
      {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        relation: data.relation,
        isActive: data.is_active
      },
      ...contacts
    ]);
    setNewContact({ name: "", email: "", phone: "", relation: "" });
    setOpen(false);
  };

  const handleToggleActive = async (id: string, active: boolean) => {
    const idx = contacts.findIndex((c) => c.id === id);
    if (idx === -1) return;
    const { error } = await supabase
      .from("contacts")
      .update({ is_active: active })
      .eq("id", id)
      .eq("user_id", user?.id || "");
    if (error) {
      toast.error("Failed to update contact status.");
      return;
    }
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, isActive: active } : contact
      )
    );
    toast.success(active ? "Contact enabled!" : "Contact disabled!");
  };

  const handleRemoveContact = async (id: string) => {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)
      .eq("user_id", user?.id || "");
    if (error) {
      toast.error("Failed to remove contact.");
      return;
    }
    setContacts(contacts.filter((contact) => contact.id !== id));
    toast.success("Contact removed.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Trusted Contacts
          </h1>
          <p className="text-muted-foreground">
            Manage the people you trust to receive anonymous wellness alerts.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusCircle size={16} />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Trusted Contact</DialogTitle>
              <DialogDescription>
                Add someone you trust to receive anonymous alerts if your
                wellness metrics indicate concern.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relation">Relationship</Label>
                <Select
                  value={newContact.relation}
                  onValueChange={(value) =>
                    setNewContact({ ...newContact, relation: value })
                  }
                >
                  <SelectTrigger id="relation">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic Advisor">
                      Academic Advisor
                    </SelectItem>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Close Friend">Close Friend</SelectItem>
                    <SelectItem value="Family Member">
                      Family Member
                    </SelectItem>
                    <SelectItem value="Mental Health Professional">
                      Mental Health Professional
                    </SelectItem>
                    <SelectItem value="Residential Advisor">
                      Residential Advisor
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddContact}>
                Add Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[100px] text-lg text-muted-foreground">
          Loading contacts...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              id={contact.id}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
              relation={contact.relation}
              isActive={contact.isActive}
              onToggleActive={handleToggleActive}
              onRemove={handleRemoveContact}
            />
          ))}
        </div>
      )}

      {!loading && contacts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
          <p className="text-center text-muted-foreground mb-4">
            You haven't added any trusted contacts yet. Add someone you trust to
            receive anonymous wellness alerts.
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-1">
                <PlusCircle size={16} />
                Add Your First Contact
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Contacts;
