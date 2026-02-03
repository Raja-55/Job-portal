import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { 
    MapPin, 
    Briefcase, 
    Wallet, 
    Users, 
    Calendar, 
    ArrowLeft, 
    Clock, 
    CheckCircle2 
} from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (!singleJob) return <div className="h-screen flex items-center justify-center text-gray-500">Loading job details...</div>

    return (
        <div className='min-h-screen bg-gray-50 pb-20'>
            {/* Top Navigation / Header */}
            <div className='bg-white border-b sticky top-0 z-10'>
                <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
                    >
                        <ArrowLeft size={18} />
                        Back to Jobs
                    </Button>
                    <div className='flex items-center gap-4'>
                        <span className='hidden sm:block text-sm text-gray-500'>Posted on {singleJob?.createdAt?.split("T")[0]}</span>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-full px-8 py-5 text-base font-semibold transition-all ${
                                isApplied 
                                ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed border border-emerald-200' 
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100'
                            }`}
                        >
                            {isApplied ? (
                                <span className='flex items-center gap-2'><CheckCircle2 size={18} /> Applied</span>
                            ) : 'Apply Now'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 mt-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    
                    {/* LEFT COLUMN: Job Content */}
                    <div className='lg:col-span-2 space-y-6'>
                        <div className='bg-white p-8 rounded-2xl border border-gray-200 shadow-sm'>
                            <h1 className='text-3xl font-extrabold text-gray-900 mb-4'>{singleJob?.title}</h1>
                            
                            <div className='flex flex-wrap gap-3 mb-8'>
                                <Badge className='bg-indigo-50 text-indigo-700 border-indigo-100 px-3 py-1'>{singleJob?.postion} Positions</Badge>
                                <Badge className='bg-orange-50 text-orange-700 border-orange-100 px-3 py-1'>{singleJob?.jobType}</Badge>
                                <Badge className='bg-purple-50 text-purple-700 border-purple-100 px-3 py-1'>{singleJob?.salary} LPA</Badge>
                            </div>

                            <div className='prose max-w-none'>
                                <h3 className='text-xl font-bold text-gray-900 mb-3'>About the Role</h3>
                                <p className='text-gray-600 leading-relaxed whitespace-pre-line'>
                                    {singleJob?.description}
                                </p>
                            </div>
                        </div>

                        {/* Requirements Placeholder (If your backend had it) */}
                        <div className='bg-white p-8 rounded-2xl border border-gray-200 shadow-sm'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Key Skills Required</h3>
                            <div className='flex flex-wrap gap-2'>
                                {singleJob?.skills?.length > 0 ? (
                                    singleJob.skills.map((skill, index) => (
                                        <span key={index} className='bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium'>
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className='text-gray-500 italic'>Contact recruiter for skill requirements.</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar Stats */}
                    <div className='lg:col-span-1 space-y-6'>
                        <div className='bg-white p-6 rounded-2xl border border-gray-200 shadow-sm'>
                            <h3 className='text-lg font-bold text-gray-900 mb-6 border-b pb-4'>Job Overview</h3>
                            
                            <div className='space-y-5'>
                                <div className='flex items-start gap-4'>
                                    <div className='p-2 bg-blue-50 rounded-lg text-blue-600'>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Location</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.location}</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-4'>
                                    <div className='p-2 bg-green-50 rounded-lg text-green-600'>
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Experience</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.experience} Years</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-4'>
                                    <div className='p-2 bg-yellow-50 rounded-lg text-yellow-600'>
                                        <Wallet size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Salary Range</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.salary} LPA</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-4'>
                                    <div className='p-2 bg-purple-50 rounded-lg text-purple-600'>
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Total Applicants</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.applications?.length} Candidates</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-4'>
                                    <div className='p-2 bg-red-50 rounded-lg text-red-600'>
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Posted Date</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.createdAt?.split("T")[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Safety Warning Card */}
                        <div className='bg-indigo-900 p-6 rounded-2xl text-white'>
                            <h4 className='font-bold mb-2 flex items-center gap-2'>
                                <Clock size={16} /> Quick Tip
                            </h4>
                            <p className='text-indigo-100 text-sm leading-relaxed'>
                                High volume of applicants expected. We recommend applying within the first 48 hours for better visibility.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobDescription