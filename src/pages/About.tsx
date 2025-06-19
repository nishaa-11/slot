
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, Clock, CreditCard, BarChart, CheckCircle, Zap, Leaf, Smile, Users, Shield, Award, Heart, Lightbulb, Target, TrendingUp, Rocket } from "lucide-react";

const About = () => {
  const { user } = useAuth();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0" />
        
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
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Our Story</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              About <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">SLOT.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing urban parking with technology that makes finding and securing parking spaces effortless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border/50 rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary/30"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To transform the parking experience through innovative technology, making it seamless, efficient, and stress-free for everyone. We're committed to reducing traffic congestion and environmental impact by optimizing how people find and use parking spaces.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary/30"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where parking is no longer a source of frustration, but an effortless part of the journey. We envision smart cities where every parking space is optimized, reducing traffic, pollution, and stress while creating more livable urban environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Platform Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">Technology</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Platform</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Powered by cutting-edge technology to deliver a seamless parking experience
            </p>
          </motion.div>

          <Tabs defaultValue="features" className="w-full max-w-4xl mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Core Features</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Clock className="h-10 w-10" />,
                    title: "Real-time Availability",
                    description: "Live updates on parking slot availability across all locations"
                  },
                  {
                    icon: <MapPin className="h-10 w-10" />,
                    title: "Location Services",
                    description: "Integrated maps and navigation to guide you to your reserved spot"
                  },
                  {
                    icon: <CreditCard className="h-10 w-10" />,
                    title: "Secure Payments",
                    description: "Hassle-free payment options with transparent pricing"
                  },
                  {
                    icon: <CalendarClock className="h-10 w-10" />,
                    title: "Advance Booking",
                    description: "Reserve your spot days or weeks in advance"
                  },
                  {
                    icon: <BarChart className="h-10 w-10" />,
                    title: "Usage Analytics",
                    description: "Track your parking history and optimize your routine"
                  },
                  {
                    icon: <Users className="h-10 w-10" />,
                    title: "Multi-user Access",
                    description: "Share your account with family or team members"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border/50 p-6 rounded-xl hover:shadow-lg transition-all hover:border-primary/50"
                  >
                    <div className="mb-4 text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="technology" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Zap className="h-10 w-10" />,
                    title: "IoT Sensors",
                    description: "Smart sensors deployed across parking locations to monitor real-time availability"
                  },
                  {
                    icon: <Shield className="h-10 w-10" />,
                    title: "Secure Infrastructure",
                    description: "End-to-end encryption and secure payment processing"
                  },
                  {
                    icon: <TrendingUp className="h-10 w-10" />,
                    title: "AI Predictions",
                    description: "Machine learning algorithms to predict parking availability based on historical data"
                  },
                  {
                    icon: <Building className="h-10 w-10" />,
                    title: "Cloud Architecture",
                    description: "Scalable cloud infrastructure ensuring 99.9% uptime and reliability"
                  }
                ].map((tech, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border/50 p-6 rounded-xl hover:shadow-lg transition-all hover:border-primary/50"
                  >
                    <div className="mb-4 text-primary">{tech.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Clock className="h-10 w-10" />,
                    title: "Time Saving",
                    description: "Save up to 15 minutes per trip by eliminating the search for parking"
                  },
                  {
                    icon: <Leaf className="h-10 w-10" />,
                    title: "Eco-Friendly",
                    description: "Reduce emissions by minimizing the time spent circling for parking spots"
                  },
                  {
                    icon: <Smile className="h-10 w-10" />,
                    title: "Stress Reduction",
                    description: "Eliminate the anxiety of finding parking in busy areas"
                  },
                  {
                    icon: <Award className="h-10 w-10" />,
                    title: "Premium Experience",
                    description: "Enjoy a VIP parking experience with guaranteed availability"
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border/50 p-6 rounded-xl hover:shadow-lg transition-all hover:border-primary/50"
                  >
                    <div className="mb-4 text-primary">{benefit.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Our Team</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Passionate individuals working together to revolutionize parking
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                name: "Nisha B",
                role: "Lead Developer",
                image: "NB",
                description: "Passionate about creating innovative solutions that make parking easier and more efficient for everyone."
              },
              {
                name: "Renuka",
                role: "UX Designer",
                image: "R",
                description: "Dedicated to crafting intuitive and user-friendly interfaces that enhance the parking experience."
              },
              {
                name: "Nischitha D.S.",
                role: "Product Manager",
                image: "ND",
                description: "Focused on delivering smart parking solutions that meet the evolving needs of our users."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/50 rounded-xl p-8 hover:shadow-xl transition-all hover:border-primary/30 hover:translate-y-[-5px]"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                      {member.image}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {member.role}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-6 bg-card border border-border/50 rounded-xl p-8 md:p-12 shadow-lg"
          >
            <h2 className="text-3xl font-bold">Ready to Transform Your Parking Experience?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who have made parking hassle-free with SLOT.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20">
                <Link to={user ? "/book" : "/auth"}>
                  {user ? "Book a Slot Now" : "Get Started Today"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
