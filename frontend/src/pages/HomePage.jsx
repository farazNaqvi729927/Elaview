import { Link } from 'react-router';
import homie from '../assets/homie.jpg'
import model from '../assets/model.jpg'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import p4 from '../assets/p4.jpg'
import p5 from '../assets/p5.jpg'
import p6 from '../assets/p6.jpg'
import p7 from '../assets/p7.jpg'
import ts from '../assets/Ts.jpg'
import { useEffect, useState } from 'react';
import api from '../lib/axios.js'
import { Users } from 'lucide-react';
import Navbar from './Navbar';




export default function Home() {
  const [Product, setProduct] = useState([]);



  useEffect(() => {

    const fetchProd = async () => {
      try {
        const res = await api.get(import.meta.env.VITE_HOME, {
          params: {
            borough: ["SoHo", "Williamsburg", "Astoria"],
          }
        });

        setProduct(res.data.products);
      }

      catch (error) {
        console.log('Error Occurred', error.response?.data || error.message);
      }

    }

    fetchProd();
  }, [])



  return (
    <>
      <Navbar />

      <div className="bg-fixed bg-cover bg-center gap-0  px-20 py-10 mt-16" style={{ backgroundImage: `url(${homie})` }}>
        <div className='grid grid-cols-[2.5fr_1.5fr] max-lg:grid-cols-1'>

          <div className='bg-gray-300 flex flex-col rounded-l-3xl justify-center items-center max-lg:rounded-3xl p-8 max-lg:justify-center'>
            <p className='text-3xl sm:text-4xl md:text-5xl font-bold text-center justify-center items-center'>
              Unlock Hidden <br />
              Advertising Spaces
            </p>

            <p className='text-center mt-5 text-gray-800'>
              Connect landlords with prime advertising real estate <br />
              to brands seeking impactful visibility in cities.
            </p>

            <div className='flex justify-center mt-10 gap-3'>
              <Link className='btn w-full text-center' to="/browse" >
                Find Your Ad Space
              </Link>
            </div>

            <div className='flex flex-row flex-wrap justify-center mt-10 items-center gap-2'>
              <div className='flex flex-row justify-center'>
                <img src={p1} alt="Profile 1" className="w-8 h-8 rounded-full object-cover" />
                <img src={p2} alt="Profile 1" className="w-8 h-8 rounded-full object-cover" />
                <img src={p3} alt="Profile 1" className="w-8 h-8 rounded-full object-cover" />
                <img src={p4} alt="Profile 1" className="w-8 h-8 rounded-full object-cover" />
              </div>

              <span className='text-gray-800 text-center'>
                Trusted by <strong>500+</strong> property owners
              </span>

            </div>
          </div>


          <div className="bg-gray-300 rounded-r-3xl p-8 max-lg:hidden max-lg:p-8">
            <div className="relative">
              {/* Image */}
              <img src={model} className="rounded-xl object-cover max-lg:hidden" alt="Billboard" />

              {/* Overlay content */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 p-4 text-center rounded-xl w-[90%] max-lg:hidden">

                <div>
                  <p className="text-xl font-bold text-center">SoHo Wall Space</p>
                  <p className="text-sm text-center">30 × 40 ft • High Traffic • $5,000/week</p>
                </div>

                <div className='mt-1 flex justify-center'>
                  <Link
                    to="/browse" className="px-4 py-4 w-60 mt-3 text-center rounded-xl font-semibold transition-all duration-300 bg-black text-white 
                hover:bg-gray-300 hover:text-black hover:border-0 border-black shadow-lg"> View Details</Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='mt-10'>
        <p className='text-3xl font-bold text-center'>Featured Spaces</p>
        <p className='text-gray-800 text-center mt-3'>
          Discover prime advertising locations across the US.
        </p>

        <div className='grid gap-5 mt-5 px-5 [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))] '>
          {
            Product.map((product) => {
              const currentPrice = product.pricePerWeek;
              const priceLabel = "/week";

              return (
                <div key={product._id} className=" w-[100%] border shadow-md rounded-tl rounded-tr">

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
                  </div>

                </div>
              );
            })
          }
        </div>



        <div className='mt-10 flex justify-center'>
          <Link style={{ borderRadius: '0.3rem' }} className='border border-black p-2 w-40 text-center justify-center font-bold hover:bg-gray-200'
            to="/browse">View All Spaces</Link>
        </div>
      </div>


      <div>

        <section className="px-32">

          <h2 className='text-3xl font-bold text-center mt-16'>How Elaview Works</h2>

          <p className='text-gray-800 text-center mt-3'>
            A simple process to connect property owners with advertisers looking for prime advertising locations.
          </p>

          <div className="flex justify-center gap-10 text-center mt-10">

            {[
              { icon: "🏢", title: "List Your Space", desc: "Property owners list their available walls, windows, or other spaces with details and pricing." },
              { icon: "🔍", title: "Discover Spaces", desc: "Advertisers browse and filter spaces by location, size, traffic, and availability." },
              { icon: "🔗", title: "Connect & Book", desc: "Direct communication between property owners and advertisers to finalize deals." },
              { icon: "📈", title: "Track Performance", desc: "Measure campaign effectiveness with our traffic and engagement analytics." }
            ].map((step, id) => (

              <div key={id}>
                <div className="text-4xl">{step.icon}</div>
                <h3 className="text-lg">{step.title}</h3>
                <p className='max-w-xs text-sm text-gray-800'>{step.desc}</p>
              </div>
            ))}

          </div>
        </section>



        <section className="px-48">
          <h2 className='text-3xl font-bold text-center mt-16'>What Our Users Say</h2>
          <p className='text-gray-800 text-center mt-3'>
            Hear from property owners and advertisers who've transformed their businesses with Elaview.
          </p>
          <div className="flex justify-center gap-10 text-left mt-10">
            {[
              {
                stars: 5,
                quote: "Elaview has transformed how we monetize our building's exterior. We've seen a 40% increase in revenue from previously unused wall space.",
                name: "Sarah Johnson",
                title: "Property Manager, SoHo Heights",
                avatar: p5
              },
              {
                stars: 5,
                quote: "Finding the perfect advertising location used to take weeks. With Elaview, we secured prime SoHo wall space in just 2 days.",
                name: "Michael Chen",
                title: "Marketing Director, Urban Outfitters",
                avatar: p6
              },
              {
                stars: 4,
                quote: "Our building facades were just sitting there. Now they're generating significant passive income through Elaview's platform.",
                name: "David Rodriguez",
                title: "Owner, Brooklyn Properties LLC",
                avatar: p7
              }
            ].map((card, id) => (
              <div className="border rounded-xl p-5 shadow-sm" key={id}>

                <div className="Stars">{'⭐️'.repeat(card.stars)}{'☆'.repeat(5 - card.stars)}</div>

                <p className="text-sm text-gray-800 mt-3">"{card.quote}"</p>

                <div className="flex gap-2 mt-5">

                  <div>
                    <img className="w-8 h-8 rounded-full object-cover" src={card.avatar} alt={card.name} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">{card.name}</p>
                    <p className="text-[0.7rem] text-gray-500 font-normal">{card.title}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>



      <div className="flex gap-10 p-12 bg-heroBlue mt-10">
        <div className='flex flex-col items-center justify-center text-center'>
          <h1 className='text-3xl font-bold text-center text-white'>Ready to Transform Your Advertising Landscape?</h1>
          <p className='text-white'>
            Whether you own prime real estate or need impactful advertising space, Elaview connects you to the right opportunities.
          </p>
          <div className='flex mt-8 gap-3'>
            <div>
              <Link to="/browse" className="p-3 text-center rounded-xl font-semibold transition-transform duration-300 bg-white border text-blue-950
              hover:bg-black hover:text-white">
                Find Ad Space</Link>
            </div>
          </div>
        </div>

        <div className="">

          <div className='relative'>
            <img src={ts} style={{ width: '55em', height: '25em' }} alt="NYC Advertising" className="rounded-xl object-cover" />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 text-center rounded-xl bg-white/80">
              <strong className='text-sm'>Join 500+ property owners</strong>
              <div className='text-sm'>and 1,000+ advertisers in NYC</div>
            </div>

          </div>
        </div>
      </div>
    </>

  );
}

