
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface ContactProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relation: string;
  isActive: boolean;
  onToggleActive: (id: string, active: boolean) => void;
  onRemove: (id: string) => void;
}

const ContactCard = ({
  id,
  name,
  email,
  phone,
  relation,
  isActive,
  onToggleActive,
  onRemove
}: ContactProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-medium">{name}</CardTitle>
            <p className="text-xs text-muted-foreground">{relation}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3 text-sm">
        <div className="space-y-1 text-muted-foreground">
          <p className="text-xs">{email}</p>
          {phone && <p className="text-xs">{phone}</p>}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Switch 
            id={`contact-active-${id}`}
            checked={isActive}
            onCheckedChange={(checked) => onToggleActive(id, checked)}
          />
          <label 
            htmlFor={`contact-active-${id}`}
            className="text-xs font-medium cursor-pointer"
          >
            Alert Contact
          </label>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-destructive hover:text-destructive/90 hover:bg-destructive/10 w-full"
          onClick={() => onRemove(id)}
        >
          Remove Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
