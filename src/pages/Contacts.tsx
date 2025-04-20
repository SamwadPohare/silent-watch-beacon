
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContactCard from "@/components/contacts/ContactCard";
import { Contact } from "@/types";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      relation: "Academic Advisor",
      isActive: true
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "555-123-4567",
      relation: "Close Friend",
      isActive: true
    },
    {
      id: "3",
      name: "Professor David Williams",
      email: "d.williams@university.edu",
      relation: "Professor",
      isActive: false
    }
  ]);

  const [open, setOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    relation: ""
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.relation) {
      const id = Math.random().toString(36).substring(2, 9);
      setContacts([
        ...contacts,
        {
          id,
          name: newContact.name,
          email: newContact.email,
          phone: newContact.phone !== "" ? newContact.phone : undefined,
          relation: newContact.relation,
          isActive: true
        }
      ]);
      setNewContact({ name: "", email: "", phone: "", relation: "" });
      setOpen(false);
    }
  };

  const handleToggleActive = (id: string, active: boolean) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, isActive: active } : contact
      )
    );
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trusted Contacts</h1>
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
                Add someone you trust to receive anonymous alerts if your wellness metrics indicate concern.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relation">Relationship</Label>
                <Select
                  value={newContact.relation}
                  onValueChange={(value) => setNewContact({ ...newContact, relation: value })}
                >
                  <SelectTrigger id="relation">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic Advisor">Academic Advisor</SelectItem>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Close Friend">Close Friend</SelectItem>
                    <SelectItem value="Family Member">Family Member</SelectItem>
                    <SelectItem value="Mental Health Professional">Mental Health Professional</SelectItem>
                    <SelectItem value="Residential Advisor">Residential Advisor</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddContact}>Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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

      {contacts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
          <p className="text-center text-muted-foreground mb-4">
            You haven't added any trusted contacts yet. Add someone you trust to receive anonymous wellness alerts.
          </p>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-1">
              <PlusCircle size={16} />
              Add Your First Contact
            </Button>
          </DialogTrigger>
        </div>
      )}
    </div>
  );
};

export default Contacts;
