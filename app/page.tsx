"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import {
  ArrowRight,
  Code,
  Globe,
  Instagram,
  Linkedin,
  MessageSquare,
  Shield,
  FileCheck,
  Users,
  Rocket,
  Coins,
  Search,
  FileCode,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/mobile-menu"
import { sendContactEmail } from "@/app/actions/send-email"
import { useToast } from "@/components/ui/toast-context"

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const formRef = useRef<HTMLFormElement>(null) // Add form reference
  const { t } = useLanguage()
  const { addToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll(".animate-on-scroll")

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in")
              observerRef.current?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )

      animatedElements.forEach((el) => {
        observerRef.current?.observe(el)
      })
    }

    animateOnScroll()

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await sendContactEmail(formData)

      if (result.success) {
        addToast({
          title: "Success!",
          description: result.message,
          variant: "success",
        })
        // Reset form using the ref
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        addToast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // New services data structure based on the provided images
  const services = [
    {
      title: t("services.blockchainAudit.title"),
      items: [
        {
          icon: <Coins className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.tokenomics.title"),
          description: t("services.tokenomics.description"),
          delay: 100,
        },
        {
          icon: <FileCode className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.smartContractAudit.title"),
          description: t("services.smartContractAudit.description"),
          delay: 200,
        },
        {
          icon: <Shield className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.penetrationTesting.title"),
          description: t("services.penetrationTesting.description"),
          delay: 300,
        },
        {
          icon: <FileCheck className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.compliance.title"),
          description: t("services.compliance.description"),
          delay: 400,
        },
      ],
    },
    {
      title: t("services.blockchainDevelopment.title"),
      items: [
        {
          icon: <MessageSquare className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.consulting.title"),
          description: t("services.consulting.description"),
          delay: 500,
        },
        {
          icon: <Search className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.research.title"),
          description: t("services.research.description"),
          delay: 600,
        },
        {
          icon: <Code className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.softwareDev.title"),
          description: t("services.softwareDev.description"),
          delay: 700,
        },
        {
          icon: <Users className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.advisory.title"),
          description: t("services.advisory.description"),
          delay: 800,
        },
      ],
    },
    {
      title: t("services.web3Marketing.title"),
      items: [
        {
          icon: <Users className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.communityBuilding.title"),
          description: t("services.communityBuilding.description"),
          delay: 900,
        },
        {
          icon: <Coins className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.investorExposure.title"),
          description: t("services.investorExposure.description"),
          delay: 1000,
        },
        {
          icon: <Globe className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.marketingStrategy.title"),
          description: t("services.marketingStrategy.description"),
          delay: 1100,
        },
        {
          icon: <Rocket className="h-8 w-8 text-slate-900 dark:text-slate-100 mb-2" />,
          title: t("services.salesStrategy.title"),
          description: t("services.salesStrategy.description"),
          delay: 1200,
        },
      ],
    },
  ]

  // Get current year for footer
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="fixed top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="relative h-14 w-14">
              <Image
                src="/images/block3-logo.png"
                alt="BLOCK3 Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a
              href="#home"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-all duration-300 ease-in-out hover:text-slate-900 dark:hover:text-slate-100 hover:translate-y-[-2px]"
            >
              {t("nav.home")}
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-all duration-300 ease-in-out hover:text-slate-900 dark:hover:text-slate-100 hover:translate-y-[-2px]"
            >
              {t("nav.about")}
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-all duration-300 ease-in-out hover:text-slate-900 dark:hover:text-slate-100 hover:translate-y-[-2px]"
            >
              {t("nav.services")}
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-all duration-300 ease-in-out hover:text-slate-900 dark:hover:text-slate-100 hover:translate-y-[-2px]"
            >
              {t("nav.contact")}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section id="home" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                <h1 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">{t("hero.title")}</h1>
                <p className="max-w-[600px] text-slate-600 dark:text-slate-400 text-lg">{t("hero.description")}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="rounded-full bg-slate-900 text-white transition-all duration-300 ease-in-out hover:bg-slate-800 hover:scale-105 hover:shadow-md">
                    {t("hero.services")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                  >
                    {t("hero.contactUs")}
                  </Button>
                </div>
              </div>
              <div className="flex justify-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300">
                <div className="relative w-full max-w-md aspect-square transition-all duration-500 ease-in-out hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-sm"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/block3-logo.png"
                      alt="BLOCK3 Logo"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 md:py-32 bg-slate-50 dark:bg-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="space-y-2 max-w-[800px]">
                <p className="text-sm uppercase tracking-widest text-slate-500">{t("about.title")}</p>
                <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{t("about.subtitle")}</h2>
                <p className="text-slate-600 dark:text-slate-400 md:text-lg">{t("about.description")}</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
                <h3 className="text-xl font-medium">{t("about.mission.title")}</h3>
                <p className="text-slate-600 dark:text-slate-400">{t("about.mission.description")}</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300">
                <h3 className="text-xl font-medium">{t("about.vision.title")}</h3>
                <p className="text-slate-600 dark:text-slate-400">{t("about.vision.description")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 p-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100 hover:transform hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
                <Shield className="h-8 w-8 text-slate-900 dark:text-slate-100" />
                <h3 className="text-lg font-medium">{t("about.security.title")}</h3>
                <p className="text-center text-slate-600 dark:text-slate-400">{t("about.security.description")}</p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200 hover:transform hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
                <Code className="h-8 w-8 text-slate-900 dark:text-slate-100" />
                <h3 className="text-lg font-medium">{t("about.innovation.title")}</h3>
                <p className="text-center text-slate-600 dark:text-slate-400">{t("about.innovation.description")}</p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300 hover:transform hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
                <Globe className="h-8 w-8 text-slate-900 dark:text-slate-100" />
                <h3 className="text-lg font-medium">{t("about.integrity.title")}</h3>
                <p className="text-center text-slate-600 dark:text-slate-400">{t("about.integrity.description")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="space-y-2 max-w-[800px]">
                <p className="text-sm uppercase tracking-widest text-slate-500">{t("services.title")}</p>
                <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{t("services.subtitle")}</h2>
                <p className="text-slate-600 dark:text-slate-400 md:text-lg">{t("services.description")}</p>
              </div>
            </div>

            {services.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16 last:mb-0">
                <h3 className="text-2xl font-medium mb-8 text-center">{category.title}</h3>
                <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {category.items.map((service, index) => (
                    <Card
                      key={index}
                      className={`border-none shadow-sm bg-white dark:bg-slate-800 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out hover:shadow-md hover:translate-y-[-4px] transition-transform duration-300 ease-in-out`}
                      style={{ transitionDelay: `${service.delay}ms` }}
                    >
                      <CardHeader>
                        {service.icon}
                        <CardTitle className="text-xl font-medium">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{service.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="space-y-2 max-w-[800px]">
                <p className="text-sm uppercase tracking-widest text-slate-500">{t("contact.title")}</p>
                <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{t("contact.subtitle")}</h2>
                <p className="text-slate-600 dark:text-slate-400 md:text-lg">{t("contact.description")}</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{t("contact.info.title")}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{t("contact.info.description")}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 transition-transform duration-300 ease-in-out hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-slate-900 dark:text-slate-100 flex-shrink-0"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-400">+62 858 4371 2530</span>
                  </div>
                  <div className="flex items-center space-x-3 transition-transform duration-300 ease-in-out hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-slate-900 dark:text-slate-100 flex-shrink-0"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-400">block3.official@gmail.com</span>
                  </div>
                  <div className="flex items-center transition-transform duration-300 ease-in-out hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-slate-900 dark:text-slate-100 flex-shrink-0 mr-3"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-400">
                      Ruko Golden Boulevard, Blok. S No.3, Desa/Kelurahan Lengkong Karya, Kec. Serpong Utara, Kota
                      Tangerang Selatan, Provinsi Banten 15310
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300 hover:shadow-md transition-shadow duration-300 ease-in-out">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{t("contact.form.title")}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t("contact.form.description")}</p>
                </div>
                <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {t("contact.form.firstName")}
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none transition-all duration-300 ease-in-out focus:shadow-sm"
                        placeholder={t("contact.form.firstNamePlaceholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {t("contact.form.lastName")}
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none transition-all duration-300 ease-in-out focus:shadow-sm"
                        placeholder={t("contact.form.lastNamePlaceholder")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {t("contact.form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none transition-all duration-300 ease-in-out focus:shadow-sm"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="min-h-[120px] w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none transition-all duration-300 ease-in-out focus:shadow-sm"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02]"
                  >
                    {isSubmitting ? "Sending..." : t("contact.form.send")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="relative h-6 w-6">
              <Image
                src="/images/block3-logo.png"
                alt="BLOCK3 Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-medium">BLOCK3</span>
          </div>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 md:text-left">
            © {currentYear} BLOCK3. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            {[
              {
                icon: <Instagram className="h-5 w-5" />,
                label: "Instagram",
                href: "https://www.instagram.com/block3.official?igsh=b2g3bml6Zmx4bW8y",
              },
              {
                icon: <Linkedin className="h-5 w-5" />,
                label: "LinkedIn",
                href: "http://linkedin.com/company/block3company",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300 ease-in-out hover:scale-110"
                aria-label={social.label}
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

