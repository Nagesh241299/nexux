import { useState, useRef, useEffect } from 'react'
import classNames from '@/utils/classNames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import navigationIcon from '@/routes/SideMenuRoutes/navigation-icon.config'
import {
    GUIDE_PREFIX_PATH,
    UI_COMPONENTS_PREFIX_PATH,
} from '@/constants/route.constant'
import { apiGetSearchResult } from '@/services/CommonService'
import debounce from 'lodash/debounce'
import { HiOutlineSearch, HiChevronRight, HiSearch } from 'react-icons/hi'
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import Button from './Button'
import Dialog from './Dialog'
import ScrollBar from './ScrollBar'
import { IoClose } from 'react-icons/io5'

type SearchData = {
    key: string
    path: string
    title: string
    icon: string
    category: string
    categoryTitle: string
}

type SearchResult = {
    title: string
    data: SearchData[]
}

const recommendedSearch: SearchResult[] = [
    {
        title: 'Recommended',
        data: [
            {
                key: 'guide.documentation',
                path: `${GUIDE_PREFIX_PATH}/documentation/introduction`,
                title: 'Documentation',
                icon: 'documentation',
                category: 'Docs',
                categoryTitle: 'Guide',
            },
            {
                key: 'guide.changeLog',
                path: `${GUIDE_PREFIX_PATH}/changelog`,
                title: 'Changelog',
                icon: 'changeLog',
                category: 'Docs',
                categoryTitle: 'Guide',
            },
            {
                key: 'uiComponent.common.button',
                path: `${UI_COMPONENTS_PREFIX_PATH}/button`,
                title: 'Button',
                icon: 'uiCommonButton',
                category: 'Common',
                categoryTitle: 'UI Components',
            },
        ],
    },
]

const data = {
    categories: [
        { title: 'Base Notes', items: ['Coconut Milk'] },
        { title: 'Food & Nutrition Applications', items: ['Coconut Milk'] },
        { title: 'Flavor', items: ['Coconut Milk'] },
        {
            title: 'Ingredient Name',
            items: ['Coconut Milk', 'Coconut Milk Powder'],
        },
        { title: 'Middle Notes', items: ['Coconut Milk'] },
        { title: 'Olfactory Notes', items: ['Coconut Milk'] },
        { title: 'Top Notes', items: ['Coconut Milk'] },
    ],
    brands: [
        {
            name: 'Givaudan',
            product: 'PRIMETIME',
            img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        },
        {
            name: 'Givaudan - Naturex',
            product: 'Naturex',
            img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        },
        {
            name: 'Flavorchem & Orchidia Fragrances',
            product: 'Flavorchem',
            img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        },
    ],
    formulations: [
        {
            company: 'Grant Industries',
            product: 'Hydrating Coconut Milk Concentrate',
            img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        },
        {
            company: 'Bakels',
            product: 'Sweet Coconut Bread',
            img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        },
        {
            company: 'Alchemy Ingredients',
            product: 'Coconut Milk',
            img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        },
    ],
}

const ListItem = (props: {
    icon: string
    label: string
    url: string
    isLast?: boolean
    keyWord: string
    onNavigate: () => void
}) => {
    const { icon, label, url = '', keyWord, onNavigate } = props

    return (
        <Link to={url} onClick={onNavigate}>
            <div
                className={classNames(
                    'flex items-center justify-between rounded-xl p-3 cursor-pointer user-select',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                )}
            >
                <div className="flex items-center gap-2">
                    <div
                        className={classNames(
                            'rounded-lg border-2 border-gray-200 shadow-sm text-xl group-hover:shadow h-10 w-10 flex items-center justify-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100',
                        )}
                    >
                        {icon && navigationIcon[icon]}
                    </div>
                    <div className="text-gray-900 dark:text-gray-300">
                        <Highlighter
                            autoEscape
                            highlightClassName={classNames(
                                'text-primary',
                                'underline bg-transparent font-semibold dark:text-white',
                            )}
                            searchWords={[keyWord]}
                            textToHighlight={label}
                        />
                    </div>
                </div>
                <HiChevronRight className="text-lg" />
            </div>
        </Link>
    )
}

const _Search = ({ className }: { className?: string }) => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)
    const [searchResult, setSearchResult] =
        useState<SearchResult[]>(recommendedSearch)
    const [noResult, setNoResult] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleReset = () => {
        setNoResult(false)
        setSearchResult(recommendedSearch)
    }

    const handleSearchOpen = () => {
        setSearchDialogOpen(true)
    }

    const handleSearchClose = () => {
        setSearchDialogOpen(false)
        handleReset()
    }

    const debounceFn = debounce(handleDebounceFn, 200)

    async function handleDebounceFn(query: string) {
        if (!query) {
            setSearchResult(recommendedSearch)
            return
        }

        if (noResult) {
            setNoResult(false)
        }

        const respond = await apiGetSearchResult<SearchResult[]>({ query })

        if (respond) {
            if (respond.length === 0) {
                setNoResult(true)
            }
            setSearchResult(respond)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    useEffect(() => {
        if (searchDialogOpen) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 100)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [searchDialogOpen])

    const handleNavigate = () => {
        handleSearchClose()
    }

    return (
        <>
            <div
                className="bg-white border p-2 mx-4"
                onClick={handleSearchOpen}
            >
                <PiMagnifyingGlassDuotone size={24} />
            </div>
            <Dialog
                contentClassName="p-0"
                isOpen={searchDialogOpen}
                closable={false}
                onRequestClose={handleSearchClose}
            >
                <div>
                    <div className="px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center">
                            <HiOutlineSearch className="text-xl" />
                            <input
                                ref={inputRef}
                                className="ring-0 outline-none block w-full p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
                                placeholder="Search..."
                                onChange={handleSearch}
                            />
                        </div>
                        <Button
                            className="border-0 hover:bg-white hover:border"
                            size="xs"
                            onClick={handleSearchClose}
                        >
                            <IoClose />
                        </Button>
                    </div>
                    <div className="py-2 px-5">
                        <ScrollBar className="max-h-72   rounded-lg">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="border-r-4 py-2">
                                    {data.categories.map((category, index) => (
                                        <div key={index} className="mb-4">
                                            <p className=" font-semibold text-gray-400">
                                                {category.title}
                                            </p>
                                            {category.items.map((item, i) => (
                                                <p
                                                    className="flex items-center text-black"
                                                    key={i}
                                                >
                                                    <HiSearch /> {item}
                                                </p>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <p className=" font-semibold text-gray-400">
                                        Brands
                                    </p>
                                    {data.brands.map((brand, index) => (
                                        <div className="flex gap-4 items-center">
                                            <img
                                                src={brand.img}
                                                className="object-contain w-14 h-14"
                                            />
                                            <div>
                                                <p
                                                    key={index}
                                                    className="font-semibold text-gray-400 pt-2"
                                                >
                                                    {brand.name}
                                                </p>
                                                <p
                                                    key={index}
                                                    className="text-black border-b pb-2"
                                                >
                                                    {brand.product}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <p className=" font-semibold text-gray-400 my-3">
                                        Formulations
                                    </p>
                                    {data.formulations.map(
                                        (formulation, index) => (
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={formulation.img}
                                                    className="object-contain w-14 h-14"
                                                />
                                                <div>
                                                    <p
                                                        key={index}
                                                        className="font-semibold text-gray-400 pt-2"
                                                    >
                                                        {formulation.company}
                                                    </p>
                                                    <p
                                                        key={index}
                                                        className="text-black border-b pb-2"
                                                    >
                                                        {formulation.product}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </ScrollBar>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

const Search = withHeaderItem(_Search)

export default Search
