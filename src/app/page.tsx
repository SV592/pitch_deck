import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ProgressSteps from "./components/ProgressSteps";
import CompanyInfoForm from "./components/CompanyInfoForm";
import Generation from "./components/Generation";
import GeneratedOutline from "./components/GeneratedOutline";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState<any>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    problemStatement: "",
    solution: "",
    businessModel: "",
    targetMarket: "",
    financials: "",
    fundingGoal: "",
    teamSize: "",
    stage: "idea",
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Manufacturing",
    "Real Estate",
    "Entertainment",
    "Food & Beverage",
    "Transportation",
    "Energy",
    "Other",
  ];

  const stages = [
    { value: "idea", label: "Idea Stage" },
    { value: "prototype", label: "Prototype" },
    { value: "mvp", label: "MVP" },
    { value: "growth", label: "Growth Stage" },
    { value: "expansion", label: "Expansion" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePitchDeck = async () => {
    setIsGenerating(true);

    // Simulate AI generation process
    setTimeout(() => {
      const mockOutline = {
        title: `${formData.companyName} Pitch Deck`,
        slides: [
          {
            id: 1,
            title: "Company Overview",
            type: "title",
            content: {
              subtitle: `Revolutionizing ${formData.industry}`,
              tagline:
                formData.solution.split(" ").slice(0, 10).join(" ") + "...",
              suggestedImage: "Modern office or product hero shot",
            },
          },
          {
            id: 2,
            title: "The Problem",
            type: "problem",
            content: {
              headline: "Market Pain Points",
              bullets: [
                formData.problemStatement.split(".")[0],
                "Current solutions are inadequate",
                "Market demand is growing rapidly",
                "Opportunity for disruption exists",
              ],
              suggestedImage: "Frustrated users or market gap visualization",
            },
          },
          {
            id: 3,
            title: "Our Solution",
            type: "solution",
            content: {
              headline: "Innovative Approach",
              description: formData.solution,
              keyFeatures: [
                "Cutting-edge technology",
                "User-friendly interface",
                "Scalable architecture",
                "Cost-effective solution",
              ],
              suggestedImage: "Product demo or solution diagram",
            },
          },
          {
            id: 4,
            title: "Market Opportunity",
            type: "market",
            content: {
              tam: "$50B Total Addressable Market",
              sam: "$5B Serviceable Addressable Market",
              som: "$500M Serviceable Obtainable Market",
              growth: "15% annual growth rate",
              suggestedImage: "Market size charts and graphs",
            },
          },
          {
            id: 5,
            title: "Business Model",
            type: "business",
            content: {
              model: formData.businessModel,
              revenue: [
                "Primary revenue stream",
                "Secondary revenue opportunities",
                "Recurring revenue potential",
                "Scalable pricing strategy",
              ],
              suggestedImage: "Revenue flow diagram",
            },
          },
          {
            id: 6,
            title: "Financial Projections",
            type: "financials",
            content: {
              year1: "$100K ARR",
              year3: "$1M ARR",
              year5: "$10M ARR",
              metrics: formData.financials,
              suggestedImage: "Growth charts and financial projections",
            },
          },
          {
            id: 7,
            title: "Team",
            type: "team",
            content: {
              size: formData.teamSize,
              expertise: [
                "Industry veterans",
                "Technical excellence",
                "Previous startup experience",
                "Diverse skill sets",
              ],
              suggestedImage: "Professional team photos",
            },
          },
          {
            id: 8,
            title: "Funding Ask",
            type: "funding",
            content: {
              amount: formData.fundingGoal,
              use: [
                "40% Product development",
                "30% Marketing & sales",
                "20% Team expansion",
                "10% Operations",
              ],
              suggestedImage: "Fund allocation pie chart",
            },
          },
          {
            id: 9,
            title: "Next Steps",
            type: "cta",
            content: {
              timeline: "12-month roadmap",
              milestones: [
                "Product launch",
                "Market expansion",
                "Team growth",
                "Series A preparation",
              ],
              suggestedImage: "Timeline or roadmap visualization",
            },
          },
        ],
      };

      setGeneratedOutline(mockOutline);
      setIsGenerating(false);
      setCurrentStep(3);
    }, 3000);
  };

  const steps = [
    {
      number: 1,
      title: "Company Info",
      description: "Tell us about your company",
    },
    { number: 2, title: "Generate", description: "AI creates your outline" },
    { number: 3, title: "Review", description: "Review and customize" },
  ];

  if (isLoading || !user) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {currentStep === 1 && (
          <CompanyInfoForm
            formData={formData}
            handleInputChange={handleInputChange}
            industries={industries}
            stages={stages}
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 2 && (
          <Generation
            isGenerating={isGenerating}
            generatePitchDeck={generatePitchDeck}
          />
        )}

        {currentStep === 3 && generatedOutline && (
          <GeneratedOutline generatedOutline={generatedOutline} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
