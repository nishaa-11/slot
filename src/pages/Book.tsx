
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { CalendarIcon, Loader2, Check, ArrowRight, MapPin, Car, Building, Clock, CreditCard, Calendar as CalendarIcon2, User, Phone, CircleCheck } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import GoogleMap from "@/components/GoogleMap";


// Type definitions

// Type definitions
type Area = {
  area_id: string;
  area_name: string;
  latitude: number | null;
  longitude: number | null;
};

type ParkingSlot = {
  slot_id: string;
  area_id: string;
  status: string | null;
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Progress steps for the booking process
const bookingSteps = [
  { id: 1, title: "Select Area", icon: Building },
  { id: 2, title: "Choose Slot", icon: Car },
  { id: 3, title: "Set Time", icon: Clock },
  { id: 4, title: "Enter Details", icon: User },
  { id: 5, title: "Confirm", icon: Check }
];

const Book = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedExitDate, setSelectedExitDate] = useState<Date | undefined>();
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingType, setBookingType] = useState<"reserve" | "immediate">("immediate");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [formErrors, setFormErrors] = useState({
    vehicleNumber: false,
    customerName: false,
    contactNumber: false
  });
  const [bookingCost, setBookingCost] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Fetch all areas when component mounts
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const { data, error } = await supabase.from("areas").select("*");
        if (error) {
          console.error("Error fetching areas:", error);
          throw error;
        }
        if (data) {
          setAreas(data);
          console.log("Areas loaded:", data.length);
        } else {
          console.log("No areas found");
          setAreas([]);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
        toast.error("Failed to load areas");
      }
    };

    fetchAreas();
  }, []);

  // Fetch available slots when selected area changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedArea) return;
      
      try {
        setLoadingSlots(true);
        const { data, error } = await supabase
          .from("parking_slots")
          .select("*")
          .eq("area_id", selectedArea)
          .eq("status", "available");
          
        if (error) {
          console.error("Error fetching slots:", error);
          throw error;
        }
        
        if (data) {
          setSlots(data);
          console.log("Available slots loaded:", data.length);
        } else {
          console.log("No available slots found");
          setSlots([]);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        toast.error("Failed to load available slots");
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedArea]);

  const validateForm = () => {
    const errors = {
      vehicleNumber: !vehicleNumber.trim(),
      customerName: !customerName.trim(),
      contactNumber: !contactNumber.trim()
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedArea) {
      toast.error("Please select an area");
      return;
    }
    
    if (currentStep === 2 && !selectedSlot) {
      toast.error("Please select a slot");
      return;
    }
    
    if (currentStep === 3) {
      if (!selectedDate) {
        toast.error("Please select entry date and time");
        return;
      }
      if (!selectedExitDate) {
        toast.error("Please select exit date and time");
        return;
      }
      if (selectedExitDate <= selectedDate) {
        toast.error("Exit time must be after entry time");
        return;
      }
    }
    
    if (currentStep === 4) {
      if (!validateForm()) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Convert date to IST for display
  const convertToIST = (date: Date) => {
    try {
      return formatInTimeZone(
        date,
        'Asia/Kolkata',
        "dd MMM yyyy, hh:mm aa 'IST'"
      );
    } catch (error) {
      console.error('Error converting date:', error);
      return 'Invalid date';
    }
  };

  // Calculate booking cost based on duration
  const calculateBookingCost = () => {
    if (!selectedDate || !selectedExitDate) return 0;
    const duration = Math.ceil((selectedExitDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60));
    const hourlyRate = 50; // Base rate per hour
    return duration * hourlyRate;
  };

  // Update booking cost when dates change
  useEffect(() => {
    const cost = calculateBookingCost();
    setBookingCost(cost);
  }, [selectedDate, selectedExitDate]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!selectedArea || !selectedSlot || !selectedDate) {
      toast.error("Missing booking information. Please start over.");
      setCurrentStep(1);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log("Starting booking process...");
      
      // Check if vehicle exists
      const { data: existingVehicleData, error: vehicleQueryError } = await supabase
        .from("vehicles")
        .select("*")
        .eq("vehicle_number", vehicleNumber);
      
      if (vehicleQueryError) {
        console.error("Error checking vehicle:", vehicleQueryError);
        throw vehicleQueryError;
      }
      
      // If vehicle doesn't exist, create it
      if (!existingVehicleData || existingVehicleData.length === 0) {
        console.log("Creating new vehicle record");
        const { error: insertVehicleError } = await supabase
          .from("vehicles")
          .insert([
            {
              vehicle_number: vehicleNumber,
              customer_name: customerName,
              contact_number: contactNumber,
            },
          ]);
        
        if (insertVehicleError) {
          console.error("Error creating vehicle:", insertVehicleError);
          throw insertVehicleError;
        }
      } else {
        console.log("Vehicle already exists");
      }
      
      // Get area name for the booking record
      const { data: areaData, error: areaError } = await supabase
        .from("areas")
        .select("area_name")
        .eq("area_id", selectedArea)
        .single();
      
      if (areaError) {
        console.error("Error getting area:", areaError);
        throw areaError;
      }
      
      // Create booking record
      console.log("Creating booking record");
      // Calculate the booking cost and ensure it's a number
      const finalBookingCost = calculateBookingCost();
      console.log("Booking cost calculated:", finalBookingCost);
      
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert([
          {
            vehicle_number: vehicleNumber,
            slot_id: selectedSlot,
            entry_time: selectedDate.toISOString(),
            exit_time: selectedExitDate?.toISOString(),
            status: "booked",
            payment_status: "pending",
            amount_paid: Number(finalBookingCost) // Ensure it's stored as a number
          },
        ])
        .select();
      
      if (bookingError) {
        console.error("Error creating booking:", bookingError);
        throw bookingError;
      }
      
      // Update slot status
      console.log("Updating slot status");
      const { error: slotError } = await supabase
        .from("parking_slots")
        .update({ status: "booked" })
        .eq("slot_id", selectedSlot);
      
      if (slotError) {
        console.error("Error updating slot status:", slotError);
        throw slotError;
      }
      
      console.log("Booking successful!");
      toast.success(`Booking ${bookingType === "immediate" ? "confirmed" : "reserved"}!`, {
        icon: <Check className="h-5 w-5 text-green-500" />,
      });
      
      // Add a small delay to show the success message before redirecting
      setTimeout(() => {
        navigate("/bookings");
      }, 1500);
      
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast.error(`Booking failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const SlotSelector = () => {
    if (loadingSlots) {
      return (
        <div className="flex items-center justify-center h-60">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="h-8 w-8 text-primary" />
          </motion.div>
        </div>
      );
    }
    
    if (slots.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-3">😢</div>
            <h3 className="text-xl font-semibold">No slots available</h3>
            <p className="text-muted-foreground mt-2">Please select a different area or try again later.</p>
          </motion.div>
        </div>
      );
    }
    
    return (
      <motion.div 
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
      >
        {slots.map((slot) => (
          <motion.div
            key={slot.slot_id}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="aspect-square"
          >
            <button
              type="button"
              onClick={() => setSelectedSlot(slot.slot_id)}
              className={cn(
                "w-full h-full rounded-lg border-2 transition-all duration-300 flex flex-col items-center justify-center",
                selectedSlot === slot.slot_id
                  ? "border-primary bg-primary/10 shadow-md shadow-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <Car className={cn("h-6 w-6 mb-1", selectedSlot === slot.slot_id ? "text-primary" : "")} />
              <span className={cn("font-medium", selectedSlot === slot.slot_id ? "text-primary" : "")}>
                {slot.slot_id.split("-").pop()}
              </span>
            </button>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 5:
        return (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-primary" />
                <Label className="text-lg">Booking Summary</Label>
              </div>
              <p className="text-sm text-muted-foreground">Review your booking details before confirming</p>
            </div>

            <Card className="overflow-hidden border border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Car className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Vehicle Details</p>
                        <p className="text-sm text-muted-foreground">{vehicleNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Customer Details</p>
                        <p className="text-sm text-muted-foreground">{customerName}</p>
                        <p className="text-sm text-muted-foreground">{contactNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Parking Location</p>
                        <p className="text-sm text-muted-foreground">
                          {areas.find(area => area.area_id === selectedArea)?.area_name} - Slot {selectedSlot.split('-').pop()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Booking Time</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedDate && convertToIST(selectedDate)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedExitDate && `Until ${convertToIST(selectedExitDate)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Total Cost</span>
                    </div>
                    <span className="text-xl font-bold">₹{bookingCost}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Base rate: ₹50.00 per hour</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePreviousStep}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <Label htmlFor="area" className="text-lg">Select Parking Area</Label>
              </div>
              <p className="text-sm text-muted-foreground">Choose the parking area where you want to park your vehicle</p>
              <Select 
                value={selectedArea} 
                onValueChange={value => {
                  setSelectedArea(value);
                  setSelectedSlot("");
                }}
              >
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.area_id} value={area.area_id}>
                      {area.area_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {selectedArea && (
                <div className="mt-4 p-4 border border-border/50 rounded-lg bg-gradient-to-br from-background to-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted/50 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{areas.find(area => area.area_id === selectedArea)?.area_name}</h3>
                      <p className="text-sm text-muted-foreground">Selected parking area</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Google Maps Integration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <div className="rounded-lg overflow-hidden border border-border/50">
                  <GoogleMap 
                    selectedArea={areas.find(area => area.area_id === selectedArea) || null}
                    className="h-[300px] w-full"
                  />
                </div>
                {selectedArea && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Showing route to {areas.find(area => area.area_id === selectedArea)?.area_name}. The route will update as you select different areas.
                  </p>
                )}
              </motion.div>
            </motion.div>

            <div className="flex items-center gap-4 pt-4">
              <Button 
                onClick={handleNextStep} 
                className="w-full" 
                disabled={!selectedArea}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {selectedArea && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 pt-4"
              >
                <Button
                  onClick={handleNextStep}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <Label className="text-lg">Select Parking Slot</Label>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Choose an available parking slot</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button" 
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                  onClick={() => {
                    setSelectedSlot("");
                    const fetchSlots = async () => {
                      setLoadingSlots(true);
                      try {
                        const { data, error } = await supabase
                          .from("parking_slots")
                          .select("*")
                          .eq("area_id", selectedArea)
                          .eq("status", "available");
                          
                        if (error) throw error;
                        setSlots(data || []);
                      } catch (error) {
                        toast.error("Failed to refresh slots");
                      } finally {
                        setLoadingSlots(false);
                      }
                    };
                    fetchSlots();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 12a9 9 0 0 0 15 6.7L21 16"></path><path d="M21 16v6h-6"></path>
                  </svg>
                  Refresh
                </motion.button>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button 
                onClick={handlePreviousStep} 
                variant="outline" 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleNextStep} 
                className="flex-1" 
                disabled={!selectedSlot}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border border-border/50 rounded-lg p-6 min-h-80">
              <SlotSelector />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon2 className="h-5 w-5 text-primary" />
                <Label className="text-lg">Select Date & Time</Label>
              </div>
              <p className="text-sm text-muted-foreground">When do you want to park your vehicle?</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-2">
                    <Label>Entry Date & Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12 border-border/50",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? convertToIST(selectedDate) : "Select entry time"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="rounded-md border border-border/50"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select
                      value={selectedDuration}
                      onValueChange={(value) => {
                        const duration = parseInt(value);
                        if (selectedDate) {
                          const exitDate = new Date(selectedDate.getTime());
                          exitDate.setMinutes(exitDate.getMinutes() + duration);
                          setSelectedExitDate(exitDate);
                          setSelectedDuration(value);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full h-12 border-border/50">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { value: "2", label: "2 minutes" },
                          { value: "5", label: "5 minutes" },
                          { value: "30", label: "30 minutes" },
                          { value: "60", label: "1 hour" },
                          { value: "90", label: "1.5 hours" },
                          { value: "120", label: "2 hours" },
                          { value: "180", label: "3 hours" },
                          { value: "240", label: "4 hours" },
                          { value: "360", label: "6 hours" },
                          { value: "720", label: "12 hours" },
                          { value: "1440", label: "24 hours" },
                        ].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedExitDate && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Exit time: {convertToIST(selectedExitDate)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-full space-y-2 mt-4">
                  <Label>Booking Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        onClick={() => setBookingType("immediate")}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center",
                          bookingType === "immediate"
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "rounded-full p-2 mb-2",
                          bookingType === "immediate" ? "bg-primary/20" : "bg-muted"
                        )}>
                          <CreditCard className={cn(
                            "h-5 w-5",
                            bookingType === "immediate" ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <span className={cn(
                          "font-medium",
                          bookingType === "immediate" ? "text-primary" : ""
                        )}>
                          Immediate Booking
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          Book now and pay at the venue
                        </span>
                      </button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        onClick={() => setBookingType("reserve")}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center",
                          bookingType === "reserve"
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "rounded-full p-2 mb-2",
                          bookingType === "reserve" ? "bg-primary/20" : "bg-muted"
                        )}>
                          <Clock className={cn(
                            "h-5 w-5",
                            bookingType === "reserve" ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <span className={cn(
                          "font-medium",
                          bookingType === "reserve" ? "text-primary" : ""
                        )}>
                          Reservation
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          Reserve now, pay later
                        </span>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePreviousStep}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleNextStep} 
                className="flex-1" 
                disabled={!selectedDate || !selectedExitDate}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <Label className="text-lg">Enter Details</Label>
              </div>
              <p className="text-sm text-muted-foreground">Please provide your personal information</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                <Input
                  id="vehicleNumber"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className={formErrors.vehicleNumber ? "border-red-500" : ""}
                />
                {formErrors.vehicleNumber && (
                  <p className="text-sm text-red-500">Vehicle number is required</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Your Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={formErrors.customerName ? "border-red-500" : ""}
                />
                {formErrors.customerName && (
                  <p className="text-sm text-red-500">Name is required</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className={formErrors.contactNumber ? "border-red-500" : ""}
                />
                {formErrors.contactNumber && (
                  <p className="text-sm text-red-500">Contact number is required</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePreviousStep}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleNextStep} 
                className="flex-1" 
                disabled={!vehicleNumber.trim() || !customerName.trim() || !contactNumber.trim()}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <Label className="text-lg">Confirm Your Booking</Label>
              </div>
              <p className="text-sm text-muted-foreground">Please review your booking details</p>
            </div>
            
            <motion.div 
              className="border border-border/50 rounded-lg p-6 space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                  className="space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-medium">{areas.find(area => area.area_id === selectedArea)?.area_name}</p>
                </motion.div>
                <motion.div 
                  className="space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-muted-foreground">Slot</p>
                  <p className="font-medium">{selectedSlot}</p>
                </motion.div>
                <motion.div 
                  className="space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-muted-foreground">Entry Time</p>
                  <p className="font-medium">{selectedDate ? convertToIST(selectedDate) : ""}</p>
                </motion.div>
                <motion.div 
                  className="space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.35 }}
                >
                  <p className="text-sm text-muted-foreground">Exit Time</p>
                  <p className="font-medium">{selectedExitDate ? convertToIST(selectedExitDate) : ""}</p>
                </motion.div>
                <motion.div 
                  className="space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm text-muted-foreground">Booking Type</p>
                  <p className="font-medium capitalize">{bookingType}</p>
                </motion.div>
                <motion.div 
                  className="space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground">Vehicle Number</p>
                  <p className="font-medium">{vehicleNumber}</p>
                </motion.div>
                <motion.div 
                  className="space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm text-muted-foreground">Your Name</p>
                  <p className="font-medium">{customerName}</p>
                </motion.div>
                <motion.div 
                  className="md:col-span-2 space-y-1"
                  variants={fadeIn}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p className="font-medium">{contactNumber}</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-6 pt-4 border-t border-border/50"
                variants={fadeIn}
                transition={{ delay: 0.8 }}
              >
                <p className="text-center">
                  By proceeding, you agree to our terms and conditions for parking reservations.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-24 px-4 bg-gradient-to-br from-background via-background/95 to-primary/5"
      >
        <div className="container mx-auto max-w-4xl space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Book Your Slot
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find and reserve the perfect parking spot for your vehicle
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
              {bookingSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : currentStep > step.id
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    )}
                  >
                    <StepIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Main Content */}
          <Card className="border-border/50 shadow-xl bg-background/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              {renderStep()}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Book;
