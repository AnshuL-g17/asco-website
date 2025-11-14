import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Factory, Zap, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Steel Manufacturing Plant - Phase II",
      client: "Tata Steel Limited",
      location: "Jamshedpur, Jharkhand",
      year: "2023",
      category: "Industrial",
      type: "Switchgear",
      description:
        "Complete electrical infrastructure for new steel production line including HT panels, LT distribution, and motor control centers.",
      scope: ["33kV HT Panels", "LT Distribution Boards", "Motor Control Centers", "Protection Systems"],
      value: "₹2.5 Crores",
    },
    {
      title: "Smart City Street Lighting",
      client: "Pune Municipal Corporation",
      location: "Pune, Maharashtra",
      year: "2023",
      category: "Infrastructure",
      type: "Lighting",
      description: "LED street lighting upgrade across 50km of city roads with smart controls and energy monitoring.",
      scope: ["5000+ LED Street Lights", "Smart Control Systems", "Energy Monitoring", "Maintenance Support"],
      value: "₹3.2 Crores",
    },
    {
      title: "Pharmaceutical Manufacturing Facility",
      client: "Sun Pharma Industries",
      location: "Vadodara, Gujarat",
      year: "2022",
      category: "Pharmaceutical",
      type: "Switchgear",
      description: "Clean room electrical systems with specialized switchgear for pharmaceutical manufacturing.",
      scope: ["Clean Room Panels", "UPS Systems", "Emergency Lighting", "Control Automation"],
      value: "₹1.8 Crores",
    },
    {
      title: "Commercial Complex Lighting",
      client: "DLF Limited",
      location: "Gurgaon, Haryana",
      year: "2022",
      category: "Commercial",
      type: "Lighting",
      description: "Energy-efficient LED lighting solution for 2 million sq ft commercial complex.",
      scope: ["LED Panel Lights", "Emergency Systems", "Facade Lighting", "Parking Illumination"],
      value: "₹1.5 Crores",
    },
    {
      title: "Textile Mill Electrical Upgrade",
      client: "Welspun Group",
      location: "Anjar, Gujarat",
      year: "2021",
      category: "Textile",
      type: "Switchgear",
      description: "Complete electrical system upgrade for textile manufacturing facility.",
      scope: ["HT/LT Panels", "Power Factor Correction", "Motor Drives", "Energy Management"],
      value: "₹2.1 Crores",
    },
    {
      title: "Airport Terminal Lighting",
      client: "GMR Infrastructure",
      location: "Hyderabad, Telangana",
      year: "2021",
      category: "Aviation",
      type: "Lighting",
      description: "Terminal building lighting with backup systems and energy-efficient LED solutions.",
      scope: ["Terminal Lighting", "Runway Approach", "Emergency Systems", "Control Integration"],
      value: "₹2.8 Crores",
    },
  ]

  const stats = [
    { label: "Projects Completed", value: "500+", icon: Building },
    { label: "Happy Clients", value: "100+", icon: Users },
    { label: "Years Experience", value: "25+", icon: Calendar },
    { label: "States Covered", value: "15+", icon: MapPin },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Building className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Our <span className="text-primary">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Showcasing our expertise through successful electrical installations across diverse industries and
                applications.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Recent successful implementations across various industries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {project.type === "Switchgear" ? (
                          <Zap className="h-5 w-5 text-primary" />
                        ) : (
                          <Building className="h-5 w-5 text-secondary" />
                        )}
                        <Badge variant={project.type === "Switchgear" ? "default" : "secondary"}>{project.type}</Badge>
                      </div>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-xl text-balance">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm text-pretty">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium mb-1">Client</div>
                        <div className="text-muted-foreground">{project.client}</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Project Value</div>
                        <div className="text-muted-foreground">{project.value}</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Location</div>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                            <MapPin className="h-3 w-3 text-primary" />
                          </div>
                          {project.location}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Completed</div>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center">
                            <Calendar className="h-3 w-3 text-secondary" />
                          </div>
                          {project.year}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-medium mb-2 text-sm">Project Scope</div>
                      <div className="flex flex-wrap gap-1">
                        {project.scope.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Industries We Serve</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Diverse industry experience across multiple sectors
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                "Manufacturing",
                "Steel & Metal",
                "Pharmaceutical",
                "Textile",
                "Infrastructure",
                "Commercial",
                "Healthcare",
                "Education",
                "Hospitality",
                "Data Centers",
                "Renewable Energy",
                "Transportation",
              ].map((industry, index) => (
                <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <Factory className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">{industry}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Start Your Project?</h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Let's discuss how we can bring your electrical project to life with our expertise and experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">Get Project Quote</Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="bg-transparent">
                    View Our Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
