import { HeroSection } from '@/components/home/HeroSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { WhatWeAnalyse } from '@/components/home/WhatWeAnalyse'
import { PricingSection } from '@/components/home/PricingSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <WhatWeAnalyse />
      <PricingSection />
    </>
  )
}
