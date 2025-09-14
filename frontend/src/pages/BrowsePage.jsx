import { Checkbox, FormControlLabel, ListItem, List, Typography, TextField, IconButton, Stack, Drawer } from '@mui/material';
import { Collapse, ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState, useMemo, useEffect } from 'react';
import { Slider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { MapPin, X, ChevronDown, ChevronUp, MapPinHouse, DollarSign, RulerDimensionLine, TrafficCone, CalendarCheck, ChevronLeft, ChevronRight, Users, Eye } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import api from '../lib/axios.js'
import Navbar from './Navbar.jsx';



function BrowseSpace() {

    // Navigation
    const navigate = useNavigate();

    // UI State
    const [open, setOpen] = useState(true);
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);
    const [open5, setOpen5] = useState(true);
    const [open6, setOpen6] = useState(true);
    const [iconopen, setIconOpen] = useState(false);
    const [Product, setProduct] = useState([]);
    const [TotalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([1000, 15000]);
    const [widthRange, setWidthRange] = useState([0, 40]);
    const [heightRange, setHeightRange] = useState([0, 50]);
    const [calendarDate, setcalendarDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLocations, setselectedLocations] = useState([]);
    const [selectedNeighborhoods, setselectedNeighborhoods] = useState([]);
    const [selectedspaceTypes, setselectedspaceTypes] = useState([]);
    const [selectedTraffic, setselectedTraffic] = useState([]);
    const [selectedAvailability, setselectedAvailability] = useState([]);
    const sortOptions = ["Recommended", "Earliest Availability", "Recently Added"];
    const spaceTypes = ["Wall", "Window", "Queens", "Billboard", "Vehicle", "Storefront", "Rooftop"];
    const traffic = ["5000", "10000", "15000", "20000"]
    const [sortOption, setSortOption] = useState('Recommended');
    // const [drawerOpen, setDrawerOpen] = useState(false);
    // const [showStatusBar, setShowStatusBar] = useState(true)
    // const [showActivityBar, setShowActivityBar] = useState(false)
    // const [showPanel, setShowPanel] = useState(false)




    let itemsPerPage = 10;

    useEffect(() => {

        const fetchProd = async () => {
            try {
                const res = await api.get("/browseProducts", {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                        sort: sortOption,
                        location: selectedLocations,   // can be array
                        borough: selectedNeighborhoods,
                        spaceType: selectedspaceTypes,
                        traffic: selectedTraffic,
                        priceMin: priceRange[0],
                        priceMax: priceRange[1],
                        minWidth: widthRange[0],
                        maxWidth: widthRange[1],
                        minHeight: heightRange[0],
                        maxHeight: heightRange[1],
                        availability: calendarDate
                    }
                });

                setProduct(res.data.products);
                setTotalPages(res.data.totalPages);
            }

            catch (error) {
                console.log('Error Occurred', error.response?.data || error.message);
            }

            finally {
                setLoading(false)
            }
        }

        fetchProd();
    }, [currentPage, sortOption, selectedLocations, selectedNeighborhoods, selectedspaceTypes, selectedTraffic, priceRange, widthRange, heightRange, calendarDate])


    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    // Static filter options
    const locations = [
        "Manhattan",
        "Brooklyn",
        "Queens",
        "Bronx",
        "Staten Island",
        "Long Island"
    ];


    const neighbourhoods = [
        "SoHo",         // Manhattan
        "Williamsburg", // Brooklyn
        "Astoria",      // Queens
        "Riverdale",    // Bronx
        "St. George",   // Staten Island
        "Long Island City" // Queens
    ];


    // Navigation function
    const handleViewDetails = (productId) => {
        navigate(`/browse/${productId}`);
    };





    // Get current price based on selected option (week/month)
    // const getCurrentPrice = (product) => {
    //     return selectedOption === product.pricePerWeek;
    // };

    // // Get price range based on selected option
    // const getCurrentPriceRange = () => {
    //     if (selectedOption === "week") {
    //         return priceRange;
    //     } else {
    //         // Convert week prices to month prices for filtering
    //         return [Math.round(priceRange[0] * 4.3), Math.round(priceRange[1] * 4.3)];
    //     }
    // };



    // Checkbox handlers
    const handleCheckboxChange = (event) => {
        let value = event.target.value;
        let isChecked = event.target.checked;

        if (isChecked) {
            setselectedNeighborhoods(([...selectedNeighborhoods, value]));

        } else {
            setselectedNeighborhoods(selectedNeighborhoods.filter((item) => item !== value))
        }
    }


    const handleCheckboxChange1 = (event) => {
        let value = event.target.value;
        let isChecked = event.target.checked;

        if (isChecked) {
            setselectedspaceTypes(([...selectedspaceTypes, value]));

        } else {
            setselectedspaceTypes(selectedspaceTypes.filter((item) => item !== value))
        }
    }


    const handleCheckboxChange2 = (event) => {
        let value = event.target.value;
        let isChecked = event.target.checked;

        if (isChecked) {
            setselectedTraffic(([...selectedTraffic, value]));
        } else {
            setselectedTraffic(selectedTraffic.filter((item) => item !== value))
        }
    }


    const handleCheckboxChang4 = (e) => {
        let value = e.target.value;
        let isChecked = e.target.checked;
        if (isChecked) {
            setselectedLocations(([...selectedLocations, value]));
            setCurrentPage(1);
        }
        else {
            setselectedLocations(selectedLocations.filter((item) => item !== value))
        }
    };


    // Filter removal functions
    const locationFilter = (index) => {
        const newSelectedLocations = [...selectedLocations];
        newSelectedLocations.splice(index, 1);
        setselectedLocations(newSelectedLocations);
    };

    const neighFilter = (index) => {
        const newSelectedNeighborhoods = [...selectedNeighborhoods];
        newSelectedNeighborhoods.splice(index, 1);
        setselectedNeighborhoods(newSelectedNeighborhoods);
    };

    const typeFilter = (index) => {
        const newSelectedTypes = [...selectedspaceTypes];
        newSelectedTypes.splice(index, 1);
        setselectedspaceTypes(newSelectedTypes);
    };

    const trafficFilter = (index) => {
        const newSelectedTraffic = [...selectedTraffic];
        newSelectedTraffic.splice(index, 1);
        setselectedTraffic(newSelectedTraffic);
    };

    const dateFilter = (index) => {
        const newSelectedAvailability = [...selectedAvailability];
        newSelectedAvailability.splice(index, 1);
        setselectedAvailability(newSelectedAvailability);
    };


    // Filter products based on selected criteria
    const filteredItems = Product.filter((item) => {
        const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(item.location);
        const neighborhoodMatch = selectedNeighborhoods.length === 0 || selectedNeighborhoods.includes(item.borough);
        const spacetypeMatch = selectedspaceTypes.length === 0 || selectedspaceTypes.includes(item.spaceType);
        const trafficMatch = selectedTraffic.length === 0 || selectedTraffic.includes(item.traffic);
        const PriceMatch = priceRange[0] !== undefined && priceRange[1] !== undefined;
        const WidthMatch = widthRange[0] !== undefined && widthRange[1] !== undefined;
        const HeightMatch = heightRange[0] !== undefined && heightRange[1] !== undefined;
        const dateMatch = selectedAvailability.includes('Immediately') ? item.availability === 'Immediately' : true;
        const calendardateMatch = calendarDate ? new Date(item.availability).getTime() === calendarDate.getTime() : true;

        return locationMatch && neighborhoodMatch && trafficMatch && spacetypeMatch && PriceMatch && WidthMatch && HeightMatch && dateMatch && calendardateMatch;
    });


    // Sorting handlers
    const handleSortChange = (option) => {
        setSortOption(option);
    };



    const areFiltersActive = selectedLocations.length > 0 || selectedNeighborhoods.length > 0 || selectedspaceTypes.length > 0 || selectedTraffic.length > 0 ||
        selectedAvailability.length > 0 || priceRange[0] !== 1000 || priceRange[1] !== 15000 || widthRange > 0 || heightRange > 0 || calendarDate !== null;




    let pageNumbers = [];

    for (let i = 1; i <= TotalPages; i++) {
        pageNumbers.push(i)
    }


    const prevButton = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextButton = () => {
        if (currentPage < TotalPages) {
            setCurrentPage(currentPage + 1);
        }
    };



    const reset = () => {
        setselectedLocations([]);
        setselectedNeighborhoods([]);
        setselectedspaceTypes([]);
        setselectedTraffic([]);
        setselectedAvailability([]);
        setPriceRange([1000, 15000]);
        setWidthRange([0, 40]);
        setHeightRange([0, 50]);
        setcalendarDate(null);
        setCurrentPage(1);

        // if (filtersWereActive) {
        //     setSortOption("Recommended");
        // }

    }



    return (
        <>
         <Navbar />
            <div className='flex gap-4 p-10'>

                {/*Sidebar */}
                <div className='mt-20 border p-5 self-start rounded max-w-[25rem]'>
                    <div className='flex justify-between  items-center'>
                        <div className='text-xl font-bold'>Filters</div>
                        <button style={{ borderRadius: '0.3rem', width: '40%' }}
                            onClick={reset} className='bg-black text-white p-3 rounded-lg hover:bg-gray-300 hover:text-black'>
                            Reset All
                        </button>
                    </div>


                    {/* Location Filter */}
                    <div className='border-b border-[rgb(211,210,210)] mt-3'>
                        <ListSubheader onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }} disableGutters>
                            <div className='flex justify-between items-center'>
                                <div className='font-500 text-[1.1rem] text-black'>Location</div>
                                <div>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </div>
                            </div>
                        </ListSubheader>
                        <Collapse in={open}>
                            <List >
                                {locations.map((location) => (
                                    <ListItem key={location} disablePadding>
                                        <FormControlLabel value={location} checked={selectedLocations.includes(location)}
                                            control={<Checkbox onChange={handleCheckboxChang4} />}
                                            label={<span style={{ fontSize: 'calc(1rem + 0.1vw)' }} className='text-gray-900'>{location}</span>} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>


                    {/* Neighborhoods Filter */}
                    <div className='border-b border-[rgb(211,210,210)] mt-3'>
                        <ListSubheader onClick={() => setOpen1(!open1)} style={{ cursor: 'pointer' }} disableGutters>
                            <div className='flex justify-between'>
                                <div className='font-500 text-[1.1rem] text-black'>Neighborhoods</div>
                                <div>
                                    {open1 ? <ExpandLess /> : <ExpandMore />}
                                </div>
                            </div>
                        </ListSubheader>

                        <Collapse in={open1}>
                            <List>
                                {neighbourhoods.map((neighbourhood) => (
                                    <ListItem key={neighbourhood} disablePadding>
                                        <FormControlLabel value={neighbourhood} checked={selectedNeighborhoods.includes(neighbourhood)}
                                            control={<Checkbox onChange={handleCheckboxChange} />}
                                            label={<span style={{ fontSize: 'calc(0.9rem + 0.1vw)' }}>{neighbourhood}</span>} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>


                    {/* Space Type Filter */}
                    <div className='border-b border-[rgb(211,210,210)] mt-3'>
                        <ListSubheader onClick={() => setOpen2(!open2)} style={{ cursor: 'pointer' }} disableGutters>
                            <div className='flex justify-between'>
                                <div className='font-500 text-[1.1rem] text-black'>Space Types</div>
                                <div> {open2 ? <ExpandLess /> : <ExpandMore />}</div>
                            </div>
                        </ListSubheader>

                        <Collapse in={open2}>
                            <List>
                                {spaceTypes.map((type) => (
                                    <ListItem key={type} disablePadding>
                                        <FormControlLabel value={type} checked={selectedspaceTypes.includes(type)}
                                            control={<Checkbox onChange={handleCheckboxChange1} />}
                                            label={<span style={{ fontSize: 'calc(0.9rem + 0.1vw)' }}>{type}</span>} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>


                    {/* Traffic Filter */}
                    <div className='border-b border-[rgb(211,210,210)] mt-3'>
                        <ListSubheader onClick={() => setOpen3(!open3)} style={{ cursor: 'pointer' }} disableGutters>
                            <div className='flex justify-between'>
                                <div className='font-500 text-[1.1rem] text-black'>Traffic</div>
                                <div>{open3 ? <ExpandLess /> : <ExpandMore />}</div>
                            </div>
                        </ListSubheader>

                        <Collapse in={open3}>
                            <List>
                                {traffic.map((number) => (
                                    <ListItem key={number} disablePadding>
                                        <FormControlLabel value={number} checked={selectedTraffic.includes(number)}
                                            control={<Checkbox onChange={handleCheckboxChange2} />}
                                            label={<span style={{ fontSize: 'calc(0.9rem + 0.1vw)' }}>{number}+ Daily</span>} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>



                    {/* Price Filter */}
                    <div className='border-b border-[rgb(211,210,210)] mt-3'>
                        <ListSubheader onClick={() => setOpen6(!open6)} style={{ cursor: 'pointer' }} disableGutters>
                            <div className='flex justify-between'>
                                <div className='font-500 text-[1.1rem] text-black'>Price Per Week</div>
                                <div> {open6 ? <ExpandLess /> : <ExpandMore />}</div>
                            </div>
                        </ListSubheader>

                        <Collapse in={open6} className='p-3' >
                            <Slider value={priceRange} onChange={(_, newValue) => setPriceRange(newValue)}
                                valueLabelDisplay="off" min={1000} max={15000}
                                step={300} style={{ color: 'black', '& .MuiSliderThumb': { backgroundColor: 'black' } }}
                            />

                            <div className='flex justify-between'>
                                <span style={{ fontSize: 'calc(1rem + 0.1vw)' }}>${priceRange[0]}</span>
                                <span style={{ fontSize: 'calc(1rem + 0.1vw)' }}>${priceRange[1]}</span>
                            </div>
                        </Collapse>
                    </div>



                    {/* Size Filter */}
                    <div className='border-b border-[rgb(211,210,210)] mt-3'>
                        <ListSubheader onClick={() => setOpen5(!open5)} style={{ cursor: 'pointer' }} disableGutters>
                            <div className='flex justify-between'>
                                <div className='font-500 text-[1.1rem] text-black'>Size</div>
                                <div>{open5 ? <ExpandLess /> : <ExpandMore />}</div>
                            </div>
                        </ListSubheader>

                        <Collapse in={open5}>
                            <div className='flex flex-col gap-6 p-2'>

                                {/* Width Range Slider */}
                                <div>
                                    <Typography className="text-[calc(0.9rem+0.1vw)] text-gray-800 mb-2">
                                        Width (ft): {widthRange[0]} - {widthRange[1]}
                                    </Typography>
                                    <Slider
                                        value={widthRange}
                                        onChange={(e, newValue) => setWidthRange(newValue)}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={40} // you can set dynamically based on dataset max

                                        sx={{
                                            color: "black",             // main color
                                            "& .MuiSlider-thumb": {
                                                backgroundColor: "black", // thumb
                                            },
                                            "& .MuiSlider-rail": {
                                                backgroundColor: "#d1d1d1", // rail lighter
                                            },
                                            "& .MuiSlider-track": {
                                                backgroundColor: "black", // filled part
                                            },
                                        }}
                                    />
                                </div>

                                {/* Height Range Slider */}
                                <div>
                                    <Typography className="text-[calc(0.9rem+0.1vw)] text-gray-800 mb-2">
                                        Height (ft): {heightRange[0]} - {heightRange[1]}
                                    </Typography>
                                    <Slider
                                        value={heightRange}
                                        onChange={(e, newValue) => setHeightRange(newValue)}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={50} // adjust dynamically too

                                        sx={{
                                            color: "black",             // main color
                                            "& .MuiSlider-thumb": {
                                                backgroundColor: "black", // thumb
                                            },
                                            "& .MuiSlider-rail": {
                                                backgroundColor: "#d1d1d1", // rail lighter
                                            },
                                            "& .MuiSlider-track": {
                                                backgroundColor: "black", // filled part
                                            },
                                        }}
                                    />
                                </div>

                            </div>
                        </Collapse>
                    </div>


                    {/* Date Filter */}
                    <div>
                        <ListSubheader onClick={() => setOpen4(!open4)} style={{ cursor: 'pointer' }} disableGutters>
                            <div className='flex justify-between'>
                                <div className='font-500 text-[1.1rem] text-black'>Date</div>
                                <div>{open4 ? <ExpandLess /> : <ExpandMore />}</div>
                            </div>
                        </ListSubheader>

                        <Collapse in={open4}>
                            <div className="mt-3">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker value={calendarDate} onChange={(newValue) => setcalendarDate(newValue)}
                                        slots={{ openPickerIcon: CalendarToday }}
                                        slotProps={{
                                            textField: {
                                                size: 'small', style: {
                                                    width: '100%', '& .MuiOutlinedInputRoot': {
                                                        borderRadius: '4px', '& fieldset': { borderColor: '#d3d2d2', },
                                                    },
                                                    '& .MuiInputBaseInput': { py: 0.5, height: 'auto' },
                                                },
                                            },
                                            popper: { style: { zIndex: 9999 } }
                                        }} />
                                </LocalizationProvider>
                            </div>
                        </Collapse>
                    </div>
                </div>



                {/*Main Content */}
                <div className='mt-20 w-full'>

                    <div className='flex items-center' >
                        {/* <i onClick={toggleDrawer(true)} className="bi bi-list drawer" style={{ zIndex: 1200, padding: 2, fontSize: '24px', cursor: 'pointer' }}></i> */}
                        <div className='text-3xl font-bold text-gray-900'>Advertising Spaces in NYC</div>
                    </div>


                    {/* Filter Chips */}
                    {areFiltersActive && (
                        <div className='flex items-center mt-6 gap-4'>

                            <div className="flex flex-wrap gap-2">
                                {selectedLocations.map((location, index) => (
                                    <div key={index} className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <MapPin />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>{location}</div>
                                        <button onClick={() => locationFilter(index)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {selectedNeighborhoods.map((neighborhood, index) => (
                                    <div key={`neigh-${index}`} className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <MapPin />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>{neighborhood}</div>
                                        <button onClick={() => neighFilter(index)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}


                                {selectedspaceTypes.map((space, index) => (
                                    <div key={`space-${index}`} className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <MapPinHouse />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>{space}</div>
                                        <button onClick={() => typeFilter(index)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {selectedTraffic.map((traffic, index) => (
                                    <div key={index} className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <TrafficCone />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>{traffic}</div>
                                        <button onClick={() => trafficFilter(index)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {selectedAvailability.map((availability, index) => (
                                    <div key={index} className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <CalendarCheck />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>{availability}</div>
                                        <button onClick={() => dateFilter(index)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {calendarDate && (
                                    <div key="calendar-date" className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <CalendarCheck />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>
                                            {calendarDate && `${String(calendarDate.getMonth() + 1).padStart(2, '0')}/
                                            ${String(calendarDate.getDate()).padStart(2, '0')}/${calendarDate.getFullYear()}`}
                                        </div>
                                        <button onClick={() => setcalendarDate(null)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                {widthRange[0] !== 1000 || widthRange[1] !== 15000 && (
                                    <div className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <RulerDimensionLine />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>{minWidth}ft Width</div>
                                        <button onClick={() => setWidthRange([0, 40])}><X size={16} /></button>
                                    </div>
                                )}
                                {heightRange[0] !== 1000 || heightRange[1] !== 15000 && (
                                    <div className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <RulerDimensionLine />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>{minHeight}ft Height</div>
                                        <button onClick={() => setHeightRange([0, 50])}><X size={16} /></button>
                                    </div>
                                )}
                                {(priceRange[0] !== 1000 || priceRange[1] !== 15000) && (
                                    <div className='flex items-center border rounded-xl px-2 py-2 gap-1 text-lg'>
                                        <DollarSign size={16} />
                                        <div style={{ fontSize: 'calc(0.9em + 0.1vw)', marginLeft: '0.3em' }}>${priceRange[0]} - ${priceRange[1]}</div>
                                        <button onClick={() => setPriceRange([1000, 15000])}><X size={16} /></button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <button className='rounded p-2 border border-transparent hover:border-1 hover:border-gray-400 transition-colors duration-200 ease-in-out' onClick={reset}>Clear All</button>
                            </div>
                        </div>
                    )}


                    {/*Listings Number Shown*/}
                    <div className="flex justify-between items-center mt-8">

                        <div className="text-left text-[calc(1rem+0.2vw)] text-gray-600 font-medium">
                            {Product.length === 0 ? null : (
                                Product.length > 0
                                    ? `Showing ${Product.length} spaces matching your criteria`
                                    : `Showing ${Product.length} space matching your criteria`
                            )}
                        </div>



                        {/* Sorting Dropdown */}
                        <div>
                            <DropdownMenu modal={false} onOpenChange={setIconOpen}>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center justify-between gap-2 px-4 py-2 border rounded focus:outline-none
                                     bg-white shadow-sm w-52">

                                        <span>{sortOption}</span>

                                        {iconopen ? (
                                            <ChevronUp className="h-4 w-4 text-gray-500 transition-transform duration-200 ease-in-out" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 ease-in-out" />
                                        )}
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" sideOffset={12} className="w-52 p-2 bg-white rounded-md">
                                    {sortOptions.map(option => (
                                        <DropdownMenuItem key={option} onClick={() => { handleSortChange(option) }}
                                            className={`text-md px-4 py-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none 
                                             ${sortOption === option ? "bg-gray-100 font-semibold" : ""}`}>
                                            {option}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>


                    {loading && (
                        <div className='flex flex-col items-center justify-center py-20'>
                            <div className='relative'>
                                <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4'></div>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-700 mb-2'>Loading Your Notes</h3>
                            <p className='text-gray-500'>Please wait while we fetch your content...</p>
                        </div>
                    )}

                    {/*Listings*/}
                    {
                        Product.length === 0 && !loading ?
                            (
                                <p className="mt-12 flex text-center justify-center text-[calc(1rem+1vw)]">
                                    No items match your selected filters. Try changing your filters.
                                </p>

                            ) :
                            (
                                <div className='grid gap-8 mt-5 [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]'>
                                    {
                                        Product.map((product) => {
                                            const currentPrice = product.pricePerWeek;
                                            const priceLabel = "/week";

                                            return (
                                                <div key={product._id} className="w-[100%] border shadow-md rounded-tl rounded-tr">

                                                    <img className='h-[20em] w-[100%] object-cover rounded-tl rounded-tr' src={product.img[0]} alt={product.location}
                                                        loading="lazy" />

                                                    <div className="text-left p-4">

                                                        {/* Borough */}
                                                        <div className="text-lg font-bold text-gray-900">
                                                            {product.borough}
                                                        </div>


                                                        {/* Location + Price */}
                                                        <div className="flex justify-between text-gray-900 mt-2">
                                                            <div className="text-md font-bold">
                                                                {product.location}
                                                            </div>
                                                            <div className="text-md font-bold text-gray-900">
                                                                ${currentPrice.toLocaleString()}
                                                                <span className="text-gray-600 font-normal">{priceLabel}</span>
                                                            </div>
                                                        </div>


                                                        {/* Type + Size */}
                                                        <div className="flex justify-between mt-2">
                                                            <div className="text-md font-medium whitespace-nowrap">
                                                                <span className="text-gray-600">Type</span>: {product.spaceType}
                                                            </div>
                                                            <div className="text-md font-medium whitespace-nowrap">
                                                                <span className="text-gray-600">Size</span>: {product.width}ft x {product.height}ft
                                                            </div>
                                                        </div>


                                                        {/* Traffic */}
                                                        <div className="flex items-center gap-1 mt-2">
                                                            <i className="bi bi-people-fill"></i>
                                                            <div className="flex items-center text-lg font-medium">
                                                                <span><Users /></span>
                                                                <span className="text-gray-600">Traffic</span>: {product.traffic}+ Daily
                                                            </div>
                                                        </div>


                                                        {/* Availability */}
                                                        <div className="text-md font-medium mt-2">
                                                            <span className="text-gray-600">Available</span>:
                                                            {product.isAvailable ? "Immediately" : new Date(product.availability).toLocaleDateString()}

                                                        </div>



                                                        {/* <div className="flex justify-center mt-2">
                                                            <button className="btn1 flex items-center gap-1 w-full justify-center mt-5"
                                                                onClick={() => handleViewDetails(product._id)}>
                                                                <Eye />
                                                                View Details
                                                            </button>
                                                        </div> */}
                                                    </div>

                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            )
                    }


                    {TotalPages > 1 && (
                        <div style={{ mt: 4 }}>
                            <nav aria-label="Page navigation example">

                                <ul style={{ display: 'flex', alignItems: 'center' }} className="pagination justify-center mt-5 text-2xl">

                                    <li className='cursor-pointer hover:bg-gray-300 p-2 rounded' onClick={prevButton} ><ChevronLeft size={40} /></li>

                                    <li className="page-item">

                                        <div className='flex'>
                                            {pageNumbers.map((num) => {
                                                return (
                                                    <div key={num} className='p-[0.2em] '>
                                                        <div>
                                                            <button className={`pageBtn ${currentPage === num ? 'active' : ''}
                                                             focus:bg-gray-300 p-2 rounded`}
                                                                onClick={() => setCurrentPage(num)}>{num}</button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </li>

                                    <li className='cursor-pointer hover:bg-gray-300 p-2 rounded' onClick={nextButton} ><ChevronRight size={40} /></li>

                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}

export default BrowseSpace;