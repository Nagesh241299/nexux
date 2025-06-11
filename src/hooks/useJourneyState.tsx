import { useState, useCallback } from 'react'
import { simulateApiCall } from '@/components/ExploreBrand/utils/journeyUtils'

export function useJourneyState(searchQuery = '') {
    const [activeMode, setActiveMode] = useState('explore')
    const [projectTitle, setProjectTitle] = useState(
        searchQuery || 'Millet Noodles',
    )
    const [completedStages, setCompletedStages] = useState<Set<string>>(
        new Set(),
    )

    // Stage 1: Conceptualize
    const [projectConcept, setProjectConcept] = useState(null)

    // Stage 2: Formulation
    const [projectStack, setProjectStack] = useState(null)
    const [projectCostEstimate, setProjectCostEstimate] = useState(null)
    const [projectPackaging, setProjectPackaging] = useState(null)

    // Stage 3: Testing
    const [testingResults, setTestingResults] = useState(null)

    // Stage 4: Pilot
    const [pilotFeedback, setPilotFeedback] = useState(null)

    // Stage 5: Manufacturing
    const [manufacturingDetails, setManufacturingDetails] = useState(null)

    // State for sub-components (Concept Builder, Stack Builder) - passed down
    const [conceptGeneratorState, setConceptGeneratorState] = useState({
        startingPoint: 'custom',
        brandName: '',
        milletBase: 'Multi-Millet',
        flavour: 'Classic Desi Masala',
        claims: [],
    })

    const [conceptEvaluation, setConceptEvaluation] = useState({
        score: '--',
        clean: '--',
        sourcing: '--',
        sourcingSub: 'Complexity',
        marketFit: '--',
        cost: '--',
        benchmark: '--',
        margin: '--',
        positioning: 'Enter details to generate evaluation.',
        marketing: '...',
    })

    const [isEvaluatingConcept, setIsEvaluatingConcept] = useState(false)

    const [stackBuilderState, setStackBuilderState] = useState({
        targetClaim: 'High Protein',
        baseMillet: 'Multi-Millet',
    })

    const [stackOutput, setStackOutput] = useState<any>({
        stack: [],
        nutritionEstimate: '...',
        targetClaim: '',
    })

    const [isGeneratingStack, setIsGeneratingStack] = useState(false)

    // Function to update completed stages and navigate
    const completeStageAndNavigate = useCallback(
        (stageKey: string, nextView: string, navigationControls: any) => {
            setCompletedStages((prev) => new Set([...prev, stageKey]))

            // Use setTimeout to ensure the navigation happens after state updates
            setTimeout(() => {
                navigationControls.setCurrentDetailedView(nextView)

                // Dispatch custom event for step completion
                const event = new CustomEvent('journey-step-complete', {
                    detail: { completedStep: stageKey, nextStep: nextView },
                })
                window.dispatchEvent(event)
            }, 100)
        },
        [],
    )

    // Handler for resetting/initializing the app
    const handleInitializeApp = useCallback(() => {
        // Reset all state to initial values
        setActiveMode('explore')
        setProjectTitle('Millet Noodles')
        setCompletedStages(new Set<string>())

        // Reset stage data
        setProjectConcept(null)
        setProjectStack(null)
        setProjectCostEstimate(null)
        setProjectPackaging(null)
        setTestingResults(null)
        setPilotFeedback(null)
        setManufacturingDetails(null)

        // Reset generator states
        setConceptGeneratorState({
            startingPoint: 'custom',
            brandName: '',
            milletBase: 'Multi-Millet',
            flavour: 'Classic Desi Masala',
            claims: [],
        })

        setConceptEvaluation({
            score: '--',
            clean: '--',
            sourcing: '--',
            sourcingSub: 'Complexity',
            marketFit: '--',
            cost: '--',
            benchmark: '--',
            margin: '--',
            positioning: 'Enter details to generate evaluation.',
            marketing: '...',
        })

        setStackBuilderState({
            targetClaim: 'High Protein',
            baseMillet: 'Multi-Millet',
        })

        setStackOutput({
            stack: [],
            nutritionEstimate: '...',
            targetClaim: '',
        })
    }, [])

    // Handler for mode changes
    const handleModeChange = useCallback(
        (mode: string) => {
            // Reset when changing modes
            handleInitializeApp()
            setActiveMode(mode)
            // Update title based on mode
            switch (mode) {
                case 'explore':
                    setProjectTitle('Millet Noodles')
                    break
                case 'analyze':
                    setProjectTitle('Analyze Brand X')
                    break
                case 'develop':
                    setProjectTitle('Develop from Ragi')
                    break
                case 'find':
                    setProjectTitle('Find High Protein Need')
                    break
                case 'trends':
                    setProjectTitle('Explore Baked Trend')
                    break
                default:
                    setProjectTitle('New Project')
            }
        },
        [handleInitializeApp],
    )

    // Simulate stack generation
    const simulateStackGeneration = useCallback(async (currentState: any) => {
        setIsGeneratingStack(true)
        await simulateApiCall(700)
        setStackOutput({
            stack: [
                {
                    ingredient: 'Millet Flour (Multi)',
                    percentage: 65,
                    role: 'Base',
                },
                {
                    ingredient: 'Pea Protein Isolate',
                    percentage: 15,
                    role: 'Protein Fortification',
                },
                {
                    ingredient: 'Psyllium Husk',
                    percentage: 8,
                    role: 'Binding/Fiber',
                },
                {
                    ingredient: 'Tapioca Starch',
                    percentage: 7,
                    role: 'Texture',
                },
                { ingredient: 'Salt', percentage: 3, role: 'Flavor' },
                {
                    ingredient: 'Natural Flavors',
                    percentage: 2,
                    role: 'Flavor',
                },
            ],
            nutritionEstimate: 'Est. 16g protein, 9g fiber per serving',
            targetClaim: currentState.targetClaim,
        })
        setIsGeneratingStack(false)
    }, [])

    // Simulate testing results generation
    const simulateTestingGeneration = useCallback(async () => {
        return {
            score: '8.5',
            shelfLife: '12 months at ambient temperature',
            risks: [
                'Moisture sensitivity',
                'Texture degradation after 9 months',
            ],
        }
    }, [])

    // Simulate pilot feedback generation
    const simulatePilotFeedback = useCallback(async () => {
        return {
            batchNumber: '001-A',
            rating: '4.2',
            improvements: 'Increase spice level, improve packaging seal',
        }
    }, [])

    // Simulate manufacturing details generation
    const simulateManufacturingDetails = useCallback(async () => {
        return {
            manufacturer: 'FoodTech Solutions, Bangalore',
            launchStatus: 'In Progress',
            estimatedLaunchDate: '2023-Q3',
        }
    }, [])

    return {
        activeMode,
        projectTitle,
        completedStages,

        // Stage 1: Conceptualize
        projectConcept,

        // Stage 2: Formulation
        projectStack,
        projectCostEstimate,
        projectPackaging,

        // Stage 3: Testing
        testingResults,

        // Stage 4: Pilot
        pilotFeedback,

        // Stage 5: Manufacturing
        manufacturingDetails,

        // Component states
        conceptGeneratorState,
        conceptEvaluation,
        isEvaluatingConcept,
        stackBuilderState,
        stackOutput,
        isGeneratingStack,

        // Setters
        setActiveMode,
        setProjectTitle,
        setCompletedStages,
        setProjectConcept,
        setProjectStack,
        setProjectCostEstimate,
        setProjectPackaging,
        setTestingResults,
        setPilotFeedback,
        setManufacturingDetails,
        setConceptGeneratorState,
        setConceptEvaluation,
        setIsEvaluatingConcept,
        setStackBuilderState,
        setStackOutput,
        setIsGeneratingStack,

        // Actions
        handleInitializeApp,
        handleModeChange,
        completeStageAndNavigate,
        simulateStackGeneration,
        simulateTestingGeneration,
        simulatePilotFeedback,
        simulateManufacturingDetails,
    }
}
