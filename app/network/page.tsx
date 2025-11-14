import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapPin, Globe, Building2 } from "lucide-react"

export default function NetworkPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Network</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                ASCO's extensive network spanning prestigious government departments, procurement platforms, and
                specialized companies delivering comprehensive electrical solutions across India
              </p>
            </div>

            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Procurement Platforms</h2>
                <p className="text-lg text-slate-600">
                  We actively participate in major government procurement platforms
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
                {["GEM", "IREPS", "E PROCUREMENT", "N PROCUREMENT", "MSTC"].map((platform) => (
                  <div
                    key={platform}
                    className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900 text-sm">{platform}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Prestigious Departments & Organizations</h2>
                <p className="text-lg text-slate-600">
                  Trusted partners across government departments, railways, and power sectors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* State Development Agencies */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <Building2 className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Development Agencies and PSUs</h3>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>BREDA</div>
                    <div>JKEDA</div>
                    <div>UPNEDA</div>
                    <div>EESL</div>
                    <div>ITI</div>
                  </div>
                </div>

                {/* PWD Departments */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <Building2 className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-bold text-green-900 mb-4">PWD Departments</h3>
                  <div className="space-y-2 text-sm text-green-700">
                    <div>PWD Haryana</div>
                    <div>PWD MP</div>
                    <div>PWD Punjab</div>
                    <div>PWD West Bengal</div>
                    <div>PWD Tamil Nadu</div>
                    <div>PWD Rajasthan</div>
                    <div>PWD Madhya Pradesh</div>
                    <div>PWD Uttar Pradesh</div>
                    <div>PWD Chhattisgarh</div>
                    <div>PWD Orissa</div>
                    <div>PWD Assam</div>
                    <div>PWD Maharashtra</div>
                  </div>
                </div>

                {/* R&B Departments */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <Building2 className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-bold text-purple-900 mb-4">R&B Departments</h3>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div>R & B Gujarat</div>
                    <div>R & B Andhra Pradesh</div>
                    <div>R & B Karnataka</div>
                    <div>R & B Kerala</div>
                    <div>R & B Telangana</div>
                    <div>R & B Himachal Pradesh</div>
                    <div>R & B Uttarakhand</div>
                  </div>
                </div>

                {/* Railways */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                  <Building2 className="h-8 w-8 text-red-600 mb-4" />
                  <h3 className="text-lg font-bold text-red-900 mb-4">Indian Railways</h3>
                  <div className="space-y-2 text-sm text-red-700">
                    <div>Northern Railway</div>
                    <div>Western Railway</div>
                    <div>East Coast Railway</div>
                    <div>Southern Railway</div>
                    <div>Eastern Railway</div>
                    <div>South Western Railway</div>
                    <div>South Eastern Railway</div>
                    <div>North Western Railway</div>
                    <div>North Eastern Railway</div>
                    <div>ICF</div>
                    <div>MCF</div>
                  </div>
                </div>

                {/* Power Sector */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                  <Building2 className="h-8 w-8 text-yellow-600 mb-4" />
                  <h3 className="text-lg font-bold text-yellow-900 mb-4">Power Sector</h3>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div>GSECL</div>
                    <div>GETCO</div>
                    <div>MPPVCL</div>
                    <div>DVVNL</div>
                    <div>MVVNL</div>
                    <div>NBPDCL</div>
                    <div>SBPDCL</div>
                    <div>JBVNL</div>
                    <div>TSECL</div>
                    <div>MSEDCL</div>
                    <div>POWER GRID</div>
                    <div>NHPL</div>
                    <div>DVC</div>
                    <div>MEECL</div>
                  </div>
                </div>

                {/* Other Organizations */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
                  <Building2 className="h-8 w-8 text-teal-600 mb-4" />
                  <h3 className="text-lg font-bold text-teal-900 mb-4">Other Organizations</h3>
                  <div className="space-y-2 text-sm text-teal-700">
                    <div>Western Command</div>
                    <div>RCF</div>
                    <div>UP Irrigation</div>
                    <div>CIDCO</div>
                    <div>MCGM (BMC)</div>
                    <div>MSRTC</div>
                    <div>Mumbai Port Trust</div>
                    <div>MMRDA</div>
                    <div>UPRNNL</div>
                    <div>WBPHED</div>
                    <div>WBSEB</div>
                    <div>PuVVNL</div>
                    <div>PVVNL</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Facilities</h2>
                <p className="text-lg text-slate-600">
                  ASCO's state-of-the-art facilities strategically located across India
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Main Manufacturing Unit</h3>
                  <p className="text-blue-700 mb-6">
                    Our flagship manufacturing facility equipped with advanced machinery and quality control systems
                  </p>
                  <div className="text-sm text-blue-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-blue-700" />
                      </div>
                      Patel Nagar Kapurthala, Punjab 144601
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Aujla Road Unit</h3>
                  <p className="text-green-700 mb-6">
                    Specialized production facility focusing on switchgear and electrical panel manufacturing
                  </p>
                  <div className="text-sm text-green-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-green-700" />
                      </div>
                      Aujla Road
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Jalandhar Unit</h3>
                  <p className="text-purple-700 mb-6">
                    Advanced manufacturing center for electrical components and distribution systems
                  </p>
                  <div className="text-sm text-purple-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-purple-700" />
                      </div>
                      Jalandhar
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-orange-900 mb-4">Delhi Unit</h3>
                  <p className="text-orange-700 mb-6">
                    Strategic manufacturing location serving the northern region with quality electrical solutions
                  </p>
                  <div className="text-sm text-orange-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-orange-700" />
                      </div>
                      Shahdra, East Delhi, Delhi, 110032
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
                  <h3 className="text-2xl font-bold text-teal-900 mb-4">Ghaziabad Unit</h3>
                  <p className="text-teal-700 mb-6">
                    Modern production facility with automated systems for high-volume manufacturing
                  </p>
                  <div className="text-sm text-teal-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-teal-200 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-teal-700" />
                      </div>
                      Loni Tahsil, Ghaziabad, Uttar Pradesh, 201005
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-8 rounded-2xl border border-rose-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-rose-900 mb-4">Haridwar Unit</h3>
                  <p className="text-rose-700 mb-6">
                    Strategic facility serving the Uttarakhand region with comprehensive electrical solutions
                  </p>
                  <div className="text-sm text-rose-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-rose-200 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-rose-700" />
                      </div>
                      Bahadarabad, Haridwar, Uttarakhand
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
