
import { useState, useCallback } from 'react';

// Define the prerequisites interface
interface NavigationPrerequisites {
  requiredStage?: string;
  requiredData?: any;
  requiredDataName?: string;
  errorMessage?: string;
  completedStages?: Set<string>;
}

// Track navigation history to support back buttons
const getInitialNavHistory = () => {
  return ['conceptualise']; // Default starting point
};

export function useJourneyNavigation() {
  const [navigationHistory, setNavigationHistory] = useState(getInitialNavHistory());
  const [currentDetailedView, setCurrentDetailedView] = useState('conceptualise');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle back button navigation
  const handleNavigateBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      // Remove current view from history
      const newHistory = [...navigationHistory];
      newHistory.pop();
      // Get the previous view
      const previousView = newHistory[newHistory.length - 1];
      // Update state
      setNavigationHistory(newHistory);
      setCurrentDetailedView(previousView);
    } else {
      // If we're at the root level, navigate to conceptualise
      setCurrentDetailedView('conceptualise');
    }
  }, [navigationHistory]);

  // Navigate to a specific view (can be a main stage view or a sub-view)
  const handleNavigateToView = useCallback((viewKey: string, prerequisites: NavigationPrerequisites = {}) => {
    const { 
      requiredStage, 
      requiredData, 
      requiredDataName, 
      errorMessage,
      completedStages
    } = prerequisites;

    // Check if prerequisites are met
    if (requiredStage && !completedStages?.has(requiredStage)) {
      alert(errorMessage || `Please complete ${requiredStage} first.`);
      return;
    }

    if (requiredData === undefined && requiredDataName) {
      alert(errorMessage || `Please add ${requiredDataName} first.`);
      return;
    }

    // Simulate data loading when changing views
    setIsProcessing(true);
    setTimeout(() => {
      // Add current view to history before navigating to new view
      if (currentDetailedView !== viewKey) {
        setNavigationHistory(prev => [...prev, viewKey]);
      }
      setCurrentDetailedView(viewKey);
      setIsProcessing(false);
    }, 500);
  }, [currentDetailedView]);

  return {
    navigationHistory,
    currentDetailedView,
    isProcessing,
    handleNavigateBack,
    handleNavigateToView,
    setNavigationHistory,
    setCurrentDetailedView
  };
}
