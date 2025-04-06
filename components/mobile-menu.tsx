"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-9 h-9 transition-all duration-300 ease-in-out bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-white dark:bg-slate-900 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Close Button */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/block3-logo.png"
                  alt="BLOCK3 Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 transition-all duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Blue Header */}
          <div className="bg-blue-600 dark:bg-blue-700 py-4 px-6 text-white font-medium text-center">
            {t("contact.title")}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col mt-4">
            <a
              href="#home"
              className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              onClick={closeMenu}
            >
              {t("nav.home")}
            </a>
            <a
              href="#about"
              className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              onClick={closeMenu}
            >
              {t("nav.about")}
            </a>
            <a
              href="#services"
              className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              onClick={closeMenu}
            >
              {t("nav.services")}
            </a>
            <a
              href="#contact"
              className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              onClick={closeMenu}
            >
              {t("nav.contact")}
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

