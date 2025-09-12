// import { useState } from 'react';


// const useParams = () => ({ id: '1' });

// const Link = ({ to, children, style, ...props }) => (
//   <a href={to} style={{ textDecoration: 'none', ...style }} {...props}>
//     {children}
//   </a>
// );



// export default function ItemDetailPage() {
//   const { id } = useParams();

//   // State management
//   const [value, setValue] = useState(0);
//   const [contactModalOpen, setContactModalOpen] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Mock listing data - This ensures we always have data to display
//   const listing = {
//     id: id || '1',
//     title: 'Premium Billboard Space - Times Square',
//     address_line1: '1234 Broadway',
//     city: 'New York',
//     type: 'Billboard',
//     width_ft: 48,
//     height_ft: 14,
//     traffic_count_daily: 15000,
//     price_per_week: 5000,
//     price_per_day: 750,
//     available_from: new Date().toISOString(),
//     description: 'Prime advertising space in the heart of Times Square. This premium billboard space offers excellent visibility and high foot traffic, perfect for impactful advertising campaigns.',
//     primary_image_url: 'https://via.placeholder.com/800x400/cccccc/666666?text=Billboard+Image',
//     image_urls: [
//       'https://via.placeholder.com/200x100/cccccc/666666?text=Image+1',
//       'https://via.placeholder.com/200x100/cccccc/666666?text=Image+2',
//       'https://via.placeholder.com/200x100/cccccc/666666?text=Image+3',
//       'https://via.placeholder.com/200x100/cccccc/666666?text=Image+4'
//     ],
//     features: [
//       "High visibility location",
//       "Professional installation available",
//       "Weather-resistant surface",
//       "LED illuminated",
//       "24/7 visibility",
//       "Premium location"
//     ],
//     content_restrictions: ['No adult content', 'No political ads'],
//     minimum_rental_days: 7,
//     average_rating: 4.7,
//     view_count: 1250,
//     landlord_name: 'John Smith',
//     landlord_verified: true,
//     document_urls: []
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   // Helper functions
//   const formatPrice = (price) => {
//     return price ? `$${price.toLocaleString()}` : '$0';
//   };

//   const formatTraffic = (count) => {
//     if (!count) return 'Not specified';
//     if (count >= 20000) return '20,000+ daily';
//     if (count >= 15000) return '15,000+ daily';
//     if (count >= 10000) return '10,000+ daily';
//     if (count >= 5000) return '5,000+ daily';
//     return `${Math.floor(count / 500) * 500}+ daily`;
//   };

//   const formatAvailability = (date) => {
//     if (!date) return 'Immediately';
//     const availableDate = new Date(date);
//     const today = new Date();
//     if (availableDate <= today) return 'Immediately';
//     return availableDate.toLocaleDateString();
//   };

//   const getDisplayAddress = (listing) => {
//     if (listing.address_line1) {
//       return listing.address_line1;
//     }
//     return listing.title || 'Address not specified';
//   };

//   // Features for display
//   const displayFeatures = listing.features && listing.features.length > 0
//     ? listing.features
//     : [
//       "High visibility location",
//       "Professional installation available",
//       "Weather-resistant surface"
//     ];

//   // Split features into two columns
//   const midpoint = Math.ceil(displayFeatures.length / 2);
//   const featuresCol1 = displayFeatures.slice(0, midpoint);
//   const featuresCol2 = displayFeatures.slice(midpoint);

//   // Specification data with simple icons
//   const specData = [
//     { icon: '🏷️', label: 'Type', value: listing.type || 'Not specified' },
//     { icon: '📐', label: 'Dimensions', value: listing.width_ft && listing.height_ft ? `${listing.width_ft}ft x ${listing.height_ft}ft` : 'Not specified' },
//     { icon: '👥', label: 'Traffic', value: formatTraffic(listing.traffic_count_daily) },
//     { icon: '🔧', label: 'Material', value: 'Weather-resistant' },
//     { icon: '⚠️', label: 'Restrictions', value: listing.content_restrictions?.join(', ') || 'Standard content guidelines apply' },
//     { icon: '📅', label: 'Min. Booking', value: listing.minimum_rental_days ? `${listing.minimum_rental_days} day${listing.minimum_rental_days > 1 ? 's' : ''}` : '1 day' },
//     { icon: '📥', label: 'Installation', value: 'Available' },
//     { icon: '🚫', label: 'Permit Required', value: 'Contact owner' },
//   ];

//   // Mock review data
//   const reviews = [
//     {
//       name: 'Sarah Johnson',
//       company: 'Digital Brands Co.',
//       rating: 5,
//       date: 'December 2024',
//       comment: 'Excellent location with high foot traffic. Professional service and great visibility for our campaign.'
//     },
//     {
//       name: 'Mike Chen',
//       company: 'Local Restaurant',
//       rating: 4,
//       date: 'November 2024',
//       comment: 'Good visibility and responsive landlord. Installation went smoothly.'
//     },
//     {
//       name: 'Emma Wilson',
//       company: 'Fashion Startup',
//       rating: 5,
//       date: 'October 2024',
//       comment: 'Perfect spot for our brand launch! Highly recommend this space.'
//     }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto p-4 mt-8">
//       {/* Top navigation */}
//       <div className="flex justify-between items-center pb-8">
//         <Link 
//           to="/browse" 
//           className="text-gray-700 hover:text-gray-900 text-sm font-medium"
//         >
//           ← Back to Listings
//         </Link>
//         <div className="flex gap-2">
//           <button className="p-2 hover:bg-gray-100 rounded">📤</button>
//           <button className="p-2 hover:bg-gray-100 rounded">❤️</button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-2">
//           <div className="text-2xl font-bold mb-2">
//             {listing.title}
//           </div>

//           <div className="flex items-center gap-2 text-gray-600 mb-4">
//             <span>📍</span>
//             <span>{getDisplayAddress(listing)}</span>
//             <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
//               {listing.city || 'NYC'}
//             </span>
//           </div>

//           {/* Images */}
//           <div className="mb-6">
//             <div className="mb-4">
//               <img 
//                 src={listing.primary_image_url}
//                 alt={listing.title}
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//               {listing.image_urls.map((imageUrl, index) => (
//                 <img
//                   key={index}
//                   src={imageUrl}
//                   alt={`${listing.title} ${index + 1}`}
//                   className="w-full h-20 object-cover rounded"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="border-b">
//             <div className="flex">
//               {['Details', 'Specifications', 'Reviews'].map((tab, index) => (
//                 <button
//                   key={index}
//                   className={`px-6 py-3 font-medium ${
//                     value === index 
//                       ? 'border-b-2 border-blue-500 text-blue-600' 
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                   onClick={() => setValue(index)}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Tab Content */}
//           {value === 0 && (
//             <div className="py-6">
//               <h3 className="text-lg font-bold mb-4">Description</h3>
//               <p className="text-gray-700 mb-6">
//                 {listing.description}
//               </p>

//               <h3 className="text-lg font-bold mb-4">Features</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {displayFeatures.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <span className="text-blue-500">→</span>
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <h3 className="text-lg font-bold mb-4 mt-6">Location</h3>
//               <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <div className="text-center text-gray-500">
//                   <div className="text-4xl mb-2">🗺️</div>
//                   <p>Map view coming soon</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {value === 1 && (
//             <div className="py-6">
//               <h3 className="text-lg font-bold mb-4">Technical Specifications</h3>
//               <div className="space-y-4">
//                 {specData.map((item, index) => (
//                   <div key={index} className="flex justify-between items-center py-2 border-b">
//                     <div className="flex items-center gap-3">
//                       <span>{item.icon}</span>
//                       <span className="text-gray-600">{item.label}</span>
//                     </div>
//                     <span className="font-medium">{item.value}</span>
//                   </div>
//                 ))}
//               </div>

//               <h3 className="text-lg font-bold mb-4 mt-6">Documents</h3>
//               <div className="space-y-2">
//                 <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
//                   <span>📥</span>
//                   <span>Technical Specifications (Contact owner)</span>
//                 </button>
//                 <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
//                   <span>📥</span>
//                   <span>Traffic Analysis Report (Contact owner)</span>
//                 </button>
//               </div>
//             </div>
//           )}

//           {value === 2 && (
//             <div className="py-6">
//               <div className="flex items-center gap-2 mb-6">
//                 <span className="text-2xl font-bold">{listing.average_rating}</span>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <span key={i} className={i < Math.floor(listing.average_rating) ? 'text-yellow-400' : 'text-gray-300'}>
//                       ⭐
//                     </span>
//                   ))}
//                 </div>
//                 <span className="text-gray-600">({reviews.length} reviews)</span>
//               </div>

//               {reviews.map((review, index) => (
//                 <div key={index} className="border-b pb-6 mb-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
//                         👤
//                       </div>
//                       <div>
//                         <div className="font-medium">{review.name}</div>
//                         <div className="text-sm text-gray-600">{review.company}</div>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-600">{review.date}</div>
//                   </div>
//                   <div className="flex mb-2">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
//                         ⭐
//                       </span>
//                     ))}
//                   </div>
//                   <p className="text-gray-700">{review.comment}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white border rounded-lg p-6 sticky top-4">
//             <div className="flex items-baseline gap-1 mb-2">
//               <span className="text-2xl font-bold">
//                 {formatPrice(listing.price_per_week)}
//               </span>
//               <span className="text-gray-600">/week</span>
//             </div>
//             <div className="text-sm text-gray-600 mb-6">
//               Available {formatAvailability(listing.available_from)}
//             </div>

//             {/* Date inputs */}
//             <div className="space-y-4 mb-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Start Date</label>
//                 <input 
//                   type="date" 
//                   className="w-full p-2 border rounded"
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">End Date</label>
//                 <input 
//                   type="date" 
//                   className="w-full p-2 border rounded"
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Duration */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-1">Duration</label>
//               <div className="flex items-center gap-2 p-2 border rounded">
//                 <span>⏰</span>
//                 <span className="font-medium">2 weeks</span>
//               </div>
//             </div>

//             {/* Price breakdown */}
//             <div className="space-y-2 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">{formatPrice(listing.price_per_week)} x 2 weeks</span>
//                 <span>{formatPrice(listing.price_per_week * 2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Installation fee</span>
//                 <span>$1,700</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Service fee</span>
//                 <span>$1,000</span>
//               </div>
//               <div className="flex justify-between font-bold border-t pt-2">
//                 <span>Total</span>
//                 <span>{formatPrice(listing.price_per_week * 2 + 1700 + 1000)}</span>
//               </div>
//             </div>

//             <button 
//               className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
//               onClick={() => setContactModalOpen(!contactModalOpen)}
//             >
//               Contact Owner
//             </button>

//             <p className="text-center text-sm text-gray-600 mt-3">
//               You won't be charged yet
//             </p>

//             <div className="flex items-center justify-center gap-2 mt-4">
//               <span>🚩</span>
//               <Link to="/" className="text-sm text-gray-600 border-b border-gray-600">
//                 Report this Listing
//               </Link>
//             </div>
//           </div>

//           {/* Owner info */}
//           <div className="bg-white border rounded-lg p-6 mt-4">
//             <h3 className="font-bold mb-4">About the Owner</h3>
//             <div className="text-center mb-4">
//               <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
//                 👤
//               </div>
//               <div className="font-medium">{listing.landlord_name}</div>
//               <div className="text-sm text-gray-600">
//                 {listing.landlord_verified ? '✓ Verified Owner' : 'Member since 2023'}
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Response Rate</span>
//                 <span>95%</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Active Listings</span>
//                 <span>3</span>
//               </div>
//             </div>
//           </div>

//           {/* Similar spaces */}
//           <div className="bg-white border rounded-lg p-6 mt-4">
//             <h3 className="font-bold mb-4">Similar Spaces</h3>
//             <div className="text-center text-gray-600 py-8">
//               <p>Similar spaces will be shown here</p>
//             </div>
//             <button className="w-full bg-gray-100 text-gray-700 py-2 rounded font-medium hover:bg-gray-200">
//               View Similar Spaces
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Contact Modal */}
//       {contactModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
//             <h3 className="text-lg font-bold mb-4">Contact Owner</h3>
//             <p className="text-gray-600 mb-4">
//               Send a message to {listing.landlord_name} about this listing.
//             </p>
//             <textarea 
//               className="w-full p-3 border rounded mb-4" 
//               rows="4" 
//               placeholder="Hi, I'm interested in your billboard space..."
//             />
//             <div className="flex gap-2">
//               <button 
//                 className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                 onClick={() => setContactModalOpen(false)}
//               >
//                 Send Message
//               </button>
//               <button 
//                 className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
//                 onClick={() => setContactModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }