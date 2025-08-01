'use client';

import React, { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import Hero from "./components/Hero";
import ProgressSteps from "./components/ProgressSteps";
import CompanyInfoForm from "./components/CompanyInfoForm";
import Generation from "./components/Generation";
import GeneratedOutline from "./components/GeneratedOutline";
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const { user, isLoading: loadingAuth } = useUser();
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
    if (!loadingAuth && !user) {
      router.push('/login');
    }
  }, [loadingAuth, user, router]);

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
    try {
      const response = await fetch('/api/decks/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newDeck = await response.json();
      setGeneratedOutline(newDeck);
      setCurrentStep(3);
      router.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error('Error generating pitch deck:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    { number: 1, title: "Company Info", description: "Tell us about your company" },
    { number: 2, title: "Generate", description: "AI creates your outline" },
    { number: 3, title: "Review", description: "Review and customize" },
  ];

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect to login via useEffect
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