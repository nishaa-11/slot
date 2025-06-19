
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowDown, Car, MapPin, CalendarClock, Shield, Star, Users, Clock, Building, ChevronLeft, ChevronRight, BadgeCheck, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  const { user } = useAuth();
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // For testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Nisha B",
      role: "Lead Developer",
      image: "NB",
      text: "Passionate about creating innovative solutions that make parking easier and more efficient for everyone."
    },
    {
      name: "Renuka",
      role: "UX Designer",
      image: "R",
      text: "Dedicated to crafting intuitive and user-friendly interfaces that enhance the parking experience."
    },
    {
      name: "Nischitha D.S.",
      role: "Product Manager",
      image: "NM",
      text: "Focused on delivering smart parking solutions that meet the evolving needs of our users."
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/90 to-primary/5 z-0">
          <ParticlesBackground />
        </div>
        
        {/* Modern gradient background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-purple-500/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-blue-500/5 to-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Animated gradient shapes */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500/10 to-primary/20 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto relative z-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] space-y-8">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8 max-w-3xl mx-auto w-full px-4 sm:px-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <BadgeCheck className="h-4 w-4" />
                  <span className="text-sm font-medium">Smart Parking Solution</span>
                </motion.div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.3] sm:leading-[1.4] mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                THE FUTURE OF {" "}
                <motion.span 
                  className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent inline-block uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  PARKING
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Book your parking slot in advance and save time. 
                Smart, efficient, and hassle-free parking solution for modern cities.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" asChild className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20">
                    <Link to={user ? "/book" : "/auth"}>
                      {user ? "Book a Slot" : "Get Started"}
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-12 px-8 border-primary/20 hover:bg-primary/5"
                    onClick={scrollToFeatures}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center gap-8 pt-8 flex-wrap w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">10K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">50+ Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">4.8/5 Rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4">
          <motion.button 
            onClick={scrollToFeatures}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium hover:bg-background/90 transition-all"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <span>Features</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
          
          <motion.button 
            onClick={scrollToTestimonials}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium hover:bg-background/90 transition-all"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span>Testimonials</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
          
          <motion.button 
            onClick={scrollToStats}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium hover:bg-background/90 transition-all"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <span>Stats</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </div>
      </section>

      {/* Smart Parking Visualization Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
              <Car className="h-4 w-4" />
              <span className="text-sm font-medium">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Parking System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced parking management system uses IoT sensors and real-time monitoring
              to provide you with the best parking experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            <motion.div
              className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-70"
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <img 
              src="/sp.jpg" 
              alt="Smart Parking System" 
              className="rounded-xl shadow-2xl w-full object-cover border border-primary/20 relative z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Powerful Features</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose SLOT?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Our platform offers a seamless parking experience with state-of-the-art technology
              </p>
            </motion.div>
          </div>
          
          <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Car className="h-10 w-10" />,
                    title: "Easy Booking",
                    description: "Book your parking slot in just a few clicks"
                  },
                  {
                    icon: <MapPin className="h-10 w-10" />,
                    title: "Multiple Locations",
                    description: "Find parking slots across multiple locations"
                  },
                  {
                    icon: <CalendarClock className="h-10 w-10" />,
                    title: "Advance Booking",
                    description: "Book your slot in advance to avoid last-minute hassle"
                  },
                  {
                    icon: <Shield className="h-10 w-10" />,
                    title: "Secure Payments",
                    description: "Our payment system is secure and transparent"
                  },
                  {
                    icon: <Clock className="h-10 w-10" />,
                    title: "Real-time Updates",
                    description: "Get real-time updates on slot availability"
                  },
                  {
                    icon: <TrendingUp className="h-10 w-10" />,
                    title: "Usage Analytics",
                    description: "Track your parking history and spending"
                  },
                  {
                    icon: <Users className="h-10 w-10" />,
                    title: "Family Sharing",
                    description: "Share your account with family members"
                  },
                  {
                    icon: <Building className="h-10 w-10" />,
                    title: "Corporate Plans",
                    description: "Special plans for businesses and organizations"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:border-primary/30 hover:translate-y-[-5px]"
                  >
                    <div className="mb-4 text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="booking" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <Car className="h-10 w-10" />,
                    title: "Easy Booking",
                    description: "Book your parking slot in just a few clicks through our intuitive interface"
                  },
                  {
                    icon: <CalendarClock className="h-10 w-10" />,
                    title: "Advance Booking",
                    description: "Book your slot up to 30 days in advance to secure your preferred spot"
                  },
                  {
                    icon: <Clock className="h-10 w-10" />,
                    title: "Real-time Updates",
                    description: "Receive instant notifications about your booking status and slot availability"
                  },
                  {
                    icon: <TrendingUp className="h-10 w-10" />,
                    title: "Usage Analytics",
                    description: "Track your parking patterns and optimize your bookings based on usage data"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:border-primary/30 hover:translate-y-[-5px]"
                  >
                    <div className="mb-4 text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="locations" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <MapPin className="h-10 w-10" />,
                    title: "Multiple Locations",
                    description: "Access parking slots in over 50 locations across major cities"
                  },
                  {
                    icon: <Building className="h-10 w-10" />,
                    title: "Premium Venues",
                    description: "Special parking arrangements at premium venues like stadiums and concert halls"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:border-primary/30 hover:translate-y-[-5px]"
                  >
                    <div className="mb-4 text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <Shield className="h-10 w-10" />,
                    title: "Secure Payments",
                    description: "End-to-end encrypted payment processing with multiple payment options"
                  },
                  {
                    icon: <Users className="h-10 w-10" />,
                    title: "Verified Users",
                    description: "All users are verified to ensure a safe and reliable parking community"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:border-primary/30 hover:translate-y-[-5px]"
                  >
                    <div className="mb-4 text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-gradient-to-b from-muted/30 to-background/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">User Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join thousands of satisfied users who have transformed their parking experience
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-5xl mx-auto relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1/2 -translate-y-1/2 -left-5 md:-left-12 z-10"
            >
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1/2 -translate-y-1/2 -right-5 md:-right-12 z-10"
            >
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </motion.div>
            
            <div className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-10 shadow-xl relative">
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10"
                >
                  <div>
                    <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                        {testimonials[activeTestimonial].image}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-4 flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    
                    <p className="text-xl md:text-2xl italic leading-relaxed">"{testimonials[activeTestimonial].text}"</p>
                    
                    <div>
                      <h4 className="font-bold text-lg">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeTestimonial === index 
                      ? "bg-primary w-6" 
                      : "bg-primary/30 hover:bg-primary/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 bg-gradient-to-b from-background/80 to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Our Impact</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">By The Numbers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                See the impact we're making in the parking industry
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Users className="h-10 w-10" />,
                value: "10,000+",
                label: "Active Users",
                description: "People using our platform daily"
              },
              {
                icon: <Building className="h-10 w-10" />,
                value: "50+",
                label: "Parking Locations",
                description: "Across major cities"
              },
              {
                icon: <Clock className="h-10 w-10" />,
                value: "15 min",
                label: "Time Saved",
                description: "Average time saved per parking"
              },
              {
                icon: <Car className="h-10 w-10" />,
                value: "500,000+",
                label: "Successful Bookings",
                description: "And counting!"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-xl shadow-xl text-center hover:border-primary/30 transition-all"
              >
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6 text-primary">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">{stat.value}</h3>
                <p className="font-medium mb-2 text-lg">{stat.label}</p>
                <p className="text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card/60 backdrop-blur-sm border border-border/50 p-12 rounded-2xl shadow-xl max-w-4xl mx-auto"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to transform your parking experience?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of satisfied users who have simplified their daily commute with SLOT.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild className="h-12 px-10 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20">
                  <Link to={user ? "/book" : "/auth"}>
                    {user ? "Book a Slot Now" : "Get Started Today"}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
