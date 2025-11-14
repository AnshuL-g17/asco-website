import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, CheckCircle, FileText, Zap, TestTube, Building } from "lucide-react"

export default function CertificationsPage() {
  const isoCertifications = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management System",
      certNo: "SPC24Q9107",
      scope:
        "Solar Street Lights, Fuse Links, Air Circuit Breakers, MCBs, Contactors, Changeovers, SFUs, DBs & Panels, Lamps, LED Lights & Fixtures, LED Drivers, Cables, Switches, RCCB/RCBO, Fans (BLDC & Electric)",
      category: "Quality",
      icon: Shield,
      color: "cyan",
    },
    {
      title: "ISO 14001:2015",
      description: "Environmental Management System",
      certNo: "SPC24E9108",
      scope:
        "Solar Street Lights, Fuse Links, Air Circuit Breakers, MCBs, Contactors, Changeovers, SFUs, DBs & Panels, Lamps, LED Lights & Fixtures, LED Drivers, Cables, Switches, RCCB/RCBO, Fans (BLDC & Electric)",
      category: "Environment",
      icon: Award,
      color: "cyan",
    },
    {
      title: "ISO 45001:2018",
      description: "Occupational Health & Safety Management System",
      certNo: "ASPLOHSMS181025238",
      scope: "Manufacturing of Switchgear and LED Lighting",
      category: "Health & Safety",
      icon: Shield,
      color: "cyan",
    },
  ]

  const bisCertifications = [
    {
      title: "BIS – LED Modules",
      licenceNo: "R-84002330",
      standard: "IS 14286:2010 / IEC 61215:2005, IS/IEC 61730",
      icon: Zap,
    },
    {
      title: "BIS – LED Street Lights",
      licenceNo: "R-97001236",
      standard: "IS 10322 (Part 5/Sec 3):2012",
      icon: Zap,
    },
    {
      title: "BIS – LED Bulbs",
      licenceNo: "R-97000655",
      standard: "IS 16102 (Part 1):2012",
      icon: Zap,
    },
    {
      title: "BIS – Li-Ion Batteries",
      licenceNo: "R-97000990",
      standard: "IS 16046 (Part 2):2018 / IEC 62133-2:2017",
      models: "ASCORG12812, ASCORG12818, ASCORG12824, ASCORG12830, ASCORG12836, ASCORG12842, ASCORG12848, ASCORG12854",
      icon: TestTube,
    },
    {
      title: "BIS – LED Drivers",
      licenceNo: "R-97000221",
      standard: "IS 15885 (Part 2/Sec 13):2012",
      icon: Zap,
    },
    {
      title: "BIS – LED Flood Lights",
      licenceNo: "R-97000671",
      standard: "IS 10322 (Part 5/Sec 5):2013",
      icon: Zap,
    },
    {
      title: "BIS – Switchgear (Switches)",
      licenceNo: "9316274",
      standard: "IS 60947 (Part 3):1999",
      icon: Shield,
    },
    {
      title: "BIS – Miniature Circuit Breakers (MCBs)",
      licenceNo: "9800017117",
      standard: "IS/IEC 60898 (Part 1):2002",
      icon: Shield,
    },
  ]

  const additionalApprovals = [
    {
      title: "PWD Haryana Approval",
      description: "ASCO Make Approval",
      category: "Government",
      icon: Building,
      color: "red",
    },
    {
      title: "PWD MP Approval",
      description: "ASCO Make Approval",
      category: "Government",
      icon: Building,
      color: "red",
    },
    {
      title: "MES Approval",
      description: "Western Command Approval",
      category: "Defense",
      icon: Shield,
      color: "red",
    },
  ]

  const testingFacilities = [
    {
      title: "High Voltage Testing",
      description: "Up to 50kV testing capability",
      icon: Zap,
      color: "cyan",
    },
    {
      title: "Temperature Rise",
      description: "Thermal performance testing",
      icon: TestTube,
      color: "red",
    },
    {
      title: "Short Circuit",
      description: "Fault current testing",
      icon: Shield,
      color: "cyan",
    },
    {
      title: "IP Rating",
      description: "Ingress protection testing",
      icon: FileText,
      color: "red",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-cyan-800 py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-balance">
                Certifications & <span className="text-cyan-200">Standards</span>
              </h1>
              <p className="text-lg sm:text-xl text-cyan-100 text-pretty max-w-3xl mx-auto mb-8">
                Our commitment to quality is validated by internationally recognized certifications and adherence to the
                highest industry standards.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-6">
                <Shield className="h-8 w-8 text-cyan-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-balance">ISO Certifications</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                International Organization for Standardization certified quality and environmental management systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {isoCertifications.map((cert, index) => {
                const IconComponent = cert.icon
                return (
                  <Card key={index} className="cert-card-hover border-0 shadow-lg bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4 cert-mobile-padding">
                      <div
                        className={`w-14 h-14 bg-${cert.color}-100 rounded-full mx-auto mb-4 flex items-center justify-center`}
                      >
                        <IconComponent className={`h-7 w-7 text-${cert.color}-600`} />
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{cert.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit mx-auto text-xs">
                        {cert.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3 cert-mobile-padding">
                      <p className="text-muted-foreground text-center text-sm">{cert.description}</p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-xs">Certificate No.:</span>
                          <span className="text-muted-foreground text-xs font-mono">{cert.certNo}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="text-xs font-medium mb-2">Scope:</div>
                        <div className="text-xs text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-2">
                          {cert.scope}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-medium bg-green-50 rounded-lg py-2">
                        <CheckCircle className="h-3 w-3" />
                        <span>Active</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <div className="cert-section-divider"></div>

        <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <FileText className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-balance">BIS Certifications</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Bureau of Indian Standards certified products ensuring quality and safety compliance
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 cert-mobile-stack">
              {bisCertifications.map((cert, index) => {
                const IconComponent = cert.icon
                return (
                  <Card key={index} className="cert-card-hover h-full">
                    <CardHeader className="pb-4 cert-mobile-padding">
                      <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-red-600" />
                      </div>
                      <CardTitle className="text-base sm:text-lg text-center cert-mobile-text">{cert.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 cert-mobile-padding">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Licence No.</div>
                        <div className="text-sm font-mono">{cert.licenceNo}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Standard</div>
                        <div className="text-xs leading-relaxed">{cert.standard}</div>
                      </div>
                      {cert.models && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="text-xs font-medium text-muted-foreground mb-1">Models</div>
                          <div className="text-xs leading-relaxed">{cert.models}</div>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-medium bg-green-50 rounded-lg py-2">
                        <CheckCircle className="h-3 w-3" />
                        <span>Certified</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-6">
                <Building className="h-8 w-8 text-cyan-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-balance">
                Government & Defense Approvals
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Approved by government departments and defense establishments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto cert-mobile-stack">
              {additionalApprovals.map((approval, index) => {
                const IconComponent = approval.icon
                return (
                  <Card key={index} className="cert-card-hover text-center">
                    <CardHeader className="pb-4 cert-mobile-padding">
                      <div
                        className={`w-16 h-16 bg-${approval.color}-100 rounded-full mx-auto mb-4 flex items-center justify-center`}
                      >
                        <IconComponent className={`h-8 w-8 text-${approval.color}-600`} />
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{approval.title}</CardTitle>
                      <Badge variant="outline" className="w-fit mx-auto">
                        {approval.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3 cert-mobile-padding">
                      <p className="text-muted-foreground">{approval.description}</p>
                      <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium bg-green-50 rounded-lg py-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Approved</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <div className="cert-section-divider"></div>

        <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <TestTube className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-balance">Testing Facilities</h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
                State-of-the-art testing equipment ensures every product meets stringent quality standards
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 cert-mobile-stack">
              {testingFacilities.map((facility, index) => {
                const IconComponent = facility.icon
                return (
                  <Card key={index} className="cert-card-hover text-center h-full">
                    <CardHeader className="cert-mobile-padding">
                      <div
                        className={`w-16 h-16 bg-${facility.color}-100 rounded-full mx-auto mb-4 flex items-center justify-center`}
                      >
                        <IconComponent className={`h-8 w-8 text-${facility.color}-600`} />
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{facility.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="cert-mobile-padding">
                      <p className="text-sm text-muted-foreground">{facility.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
