import  { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, MapPin, Target, Users, Zap } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if(query.trim()){
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    }

    return (
        <div className='relative bg-white'>
            {/* Background Decorative Elements */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10'>
                <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-indigo-50 rounded-full blur-3xl opacity-50'></div>
                <div className='absolute bottom-0 right-[-5%] w-[30%] h-[50%] bg-blue-50 rounded-full blur-3xl opacity-50'></div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center'>
                <div className='flex flex-col gap-6'>
                    {/* Badge */}
                    <div className='mx-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm'>
                        <Zap className='h-4 w-4 text-indigo-600' />
                        <span className='text-sm font-semibold text-indigo-700 uppercase tracking-wider'>
                            The #1 Career Accelerator
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900'>
                        Find Your <span className='text-indigo-600'>Dream Career</span> <br /> 
                        In One Click
                    </h1>

                    {/* Subtitle */}
                    <p className='max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed'>
                        Join over 500,000+ professionals finding work at the worlds leading tech companies and startups. Your next big move starts here.
                    </p>

                    {/* Professional Search Bar */}
                    <div className='mt-8 flex w-full max-w-3xl mx-auto items-center bg-white border border-gray-200 shadow-2xl shadow-indigo-100 rounded-full p-2 transition-all focus-within:ring-2 focus-within:ring-indigo-500'>
                        <div className='flex items-center flex-1 px-4'>
                            <Search className='text-gray-400 mr-2' size={20} />
                            <input
                                type="text"
                                placeholder='Job title, skills, or company...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                                className='outline-none border-none w-full text-gray-700 py-2'
                            />
                        </div>
                        <div className='hidden md:flex items-center px-4 border-l border-gray-100'>
                            <MapPin className='text-gray-400 mr-2' size={20} />
                            <span className='text-gray-400 text-sm'>Remote / Anywhere</span>
                        </div>
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-8 py-6 h-auto text-base font-semibold transition-all hover:scale-105"
                        >
                            Find Jobs
                        </Button>
                    </div>

                    {/* Trending Labels */}
                    <div className='mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-500'>
                        <span>Popular:</span>
                        {['Frontend', 'Data Science', 'Product Manager', 'Remote'].map((item) => (
                            <button key={item} className='hover:text-indigo-600 underline underline-offset-4 cursor-pointer'>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <StatsSection />
            <FeatureSection />
            <HowItWorks />
        </div>
    )
}

/** 
 * SECTION 2: PLATFORM STATS
 * Builds trust immediately
 */
const StatsSection = () => (
    <div className='bg-indigo-600 py-12'>
        <div className='max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            {[
                { label: 'Live Jobs', value: '12k+' },
                { label: 'Companies', value: '500+' },
                { label: 'Candidates', value: '80k+' },
                { label: 'New Jobs Today', value: '200+' },
            ].map((stat, i) => (
                <div key={i} className='text-white'>
                    <h3 className='text-3xl font-bold'>{stat.value}</h3>
                    <p className='text-indigo-100 text-sm mt-1 uppercase tracking-wide'>{stat.label}</p>
                </div>
            ))}
        </div>
    </div>
)

/** 
 * SECTION 3: FEATURES (Why Choose Us)
 */
const FeatureSection = () => (
    <div className='py-24 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='text-center mb-16'>
                <h2 className='text-3xl font-bold text-gray-900'>Everything you need to get hired</h2>
                <p className='text-gray-500 mt-4'>We streamline the job hunting process so you can focus on the interview.</p>
            </div>
            
            <div className='grid md:grid-cols-3 gap-8'>
                {[
                    {
                        icon: <Briefcase className='w-8 h-8 text-indigo-600' />,
                        title: 'Quality Listings',
                        desc: 'We verify every company and job posting to ensure you only see the best opportunities.'
                    },
                    {
                        icon: <Target className='w-8 h-8 text-indigo-600' />,
                        title: 'Smart Matching',
                        desc: 'Our AI matches your profile with jobs that actually fit your skills and salary goals.'
                    },
                    {
                        icon: <Users className='w-8 h-8 text-indigo-600' />,
                        title: 'Career Growth',
                        desc: 'Access exclusive resources and resume builders to help you stand out from the crowd.'
                    }
                ].map((feat, i) => (
                    <div key={i} className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4 p-3 bg-indigo-50 inline-block rounded-xl'>{feat.icon}</div>
                        <h4 className='text-xl font-semibold mb-2'>{feat.title}</h4>
                        <p className='text-gray-600 leading-relaxed'>{feat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

/** 
 * SECTION 4: HOW IT WORKS
 */
const HowItWorks = () => (
    <div className='py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='flex flex-col md:flex-row items-center gap-12'>
                <div className='md:w-1/2'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-6'>How CareerPath works for you</h2>
                    <div className='space-y-8'>
                        {[
                            { step: '01', title: 'Create your account', desc: 'Set up your professional profile and upload your resume.' },
                            { step: '02', title: 'Search and Apply', desc: 'Use our advanced filters to find your perfect job and apply in one click.' },
                            { step: '03', title: 'Get Hired', desc: 'Manage applications and get direct messages from top recruiters.' },
                        ].map((item, i) => (
                            <div key={i} className='flex gap-4'>
                                <span className='text-4xl font-bold text-indigo-100'>{item.step}</span>
                                <div>
                                    <h5 className='text-lg font-bold text-gray-900'>{item.title}</h5>
                                    <p className='text-gray-600'>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:w-1/2 bg-indigo-100 rounded-3xl p-8 aspect-video flex items-center justify-center'>
                    {/* You can place an illustration or image here */}
                    <div className='text-indigo-600 font-bold italic text-2xl'>[ Professional Illustration Placeholder ]</div>
                </div>
            </div>
        </div>
    </div>
)

export default HeroSection