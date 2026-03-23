import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organs = ["Kidney", "Liver", "Heart", "Lungs", "Pancreas"];

const AddDonor = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    organ: "",
    healthScore: [80],
    distance: [50],
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.bloodGroup || !form.organ) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    toast({ title: "Donor registered", description: `${form.name} has been added successfully.` });
    setForm({ name: "", age: "", bloodGroup: "", organ: "", healthScore: [80], distance: [50], location: "" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="rounded-xl border border-border bg-card"
        style={{ boxShadow: "var(--shadow-elevated)" }}
      >
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Register New Donor</h2>
            <p className="text-xs text-muted-foreground">Enter donor details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g. 30"
                min={1}
                max={100}
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Blood Group *</Label>
              <Select value={form.bloodGroup} onValueChange={(v) => setForm({ ...form, bloodGroup: v })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((bg) => (
                    <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Organ *</Label>
              <Select value={form.organ} onValueChange={(v) => setForm({ ...form, organ: v })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select organ" />
                </SelectTrigger>
                <SelectContent>
                  {organs.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. Mumbai"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Health Score</Label>
              <span className="text-sm font-semibold text-primary">{form.healthScore[0]}%</span>
            </div>
            <Slider
              value={form.healthScore}
              onValueChange={(v) => setForm({ ...form, healthScore: v })}
              max={100}
              min={0}
              step={1}
            />
            <p className="text-xs text-muted-foreground">Overall health assessment score of the donor</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Distance (km)</Label>
              <span className="text-sm font-semibold text-primary">{form.distance[0]} km</span>
            </div>
            <Slider
              value={form.distance}
              onValueChange={(v) => setForm({ ...form, distance: v })}
              max={500}
              min={0}
              step={5}
            />
            <p className="text-xs text-muted-foreground">Approximate distance from the medical center</p>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full rounded-lg h-11 text-sm font-semibold">
              Register Donor
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonor;
