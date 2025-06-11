export interface MarketIntelligenceReport {
    message: string;
    report: Report;
  }
  
  export interface Report {
    citations: { [key: string]: string };
    riskAnalysis: RiskAnalysis;
    marketAnalysis: MarketAnalysis;
    description: string;
    packagingTrends: PackagingTrends;
    consumerInsights: ConsumerInsights;
    competitiveAnalysis: CompetitiveAnalysis;
    innovationOpportunities: InnovationOpportunities;
    strategicRecommendations: StrategicRecommendation[];
  }
  
  export interface RiskAnalysis {
    marketBarriers: MarketBarrier[];
    regulatoryChallenges: RegulatoryChallenge[];
  }
  
  export interface MarketBarrier {
    barrier: string;
    citations: string[];
    description: string;
  }
  
  export interface RegulatoryChallenge {
    issue: string;
    citations: string[];
    description: string;
  }
  
  export interface MarketAnalysis {
    title: string;
    overview: MarketOverview;
    currentMarketSize: MarketSize;
    marketSegmentation: MarketSegmentation;
    projectedMarketSize: MarketSize;
  }
  
  export interface MarketOverview {
    growthDrivers: GrowthDriver[];
  }
  
  export interface GrowthDriver {
    driver: string;
    citations: string[];
    description: string;
  }
  
  export interface MarketSize {
    year: number;
    value: string;
    citations: string[];
    description: string;
    growthRate?: string; // Optional field for projected market size
  }
  
  export interface MarketSegmentation {
    organic: Segment;
    premium: Segment;
    conventional: Segment;
  }
  
  export interface Segment {
    share: string;
    description?: string;
    growthRate?: string; // Optional growth rate for the organic segment
  }
  
  export interface PackagingTrends {
    formats: PackagingFormat[];
    citations: string[];
    sustainabilityInitiatives: string[];
  }
  
  export interface PackagingFormat {
    size: string;
    type: string;
    purpose: string;
    priceRange?: string;
    material?: string;
    examples?: string[];
    pricePremium?: string;
  }
  
  export interface ConsumerInsights {
    segments: ConsumerSegment[];
    purchaseDrivers: PurchaseDriver[];
    geographicDistribution: GeographicDistribution;
  }
  
  export interface ConsumerSegment {
    name: string;
    useCase: string;
    behavior: string;
    citations: string[];
    demographics: string;
    channelPreference: string;
  }
  
  export interface PurchaseDriver {
    citations: string[];
    primaryFactors: string[];
    premiumAcceptance: string;
  }
  
  export interface GeographicDistribution {
    citations: string[];
    metroCities: string;
    tierIICities: string;
    ruralAdoption: string;
  }
  
  export interface CompetitiveAnalysis {
    brands: Brand[];
    priceSegmentation: PriceSegmentation;
  }
  
  export interface Brand {
    name: string;
    pricing: string;
    segment: string;
    citations: string[];
    strengths?: string;
    differentiation?: string;
  }
  
  export interface PriceSegmentation {
    premium: string;
    massMarket: string;
    institutional: string;
  }
  
  export interface InnovationOpportunities {
    whiteSpaces: WhiteSpaceOpportunity[];
    technologies: Technology[];
    productDevelopments: ProductDevelopment[];
  }
  
  export interface WhiteSpaceOpportunity {
    citations: string[];
    description: string;
    opportunity: string;
  }
  
  export interface Technology {
    name: string;
    adoption: string;
    benefits: string;
    citations: string[];
  }
  
  export interface ProductDevelopment {
    type: string;
    examples: string[];
    citations: string[];
    potential: string;
  }
  
  export interface StrategicRecommendation {
    citations: string[];
    focusArea: string;
    recommendation: string;
  }
  