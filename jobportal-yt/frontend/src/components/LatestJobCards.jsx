import PropTypes from 'prop-types'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, ArrowUpRight } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer relative overflow-hidden'
        >
            {/* Top Section: Company Info & Logo */}
            <div className='flex items-start justify-between mb-5'>
                <div className='flex items-center gap-4'>
                    {/* Company Logo / Avatar */}
                    <Avatar className="h-12 w-12 rounded-xl border border-gray-100 shadow-sm bg-white overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <AvatarImage 
                            src={job?.company?.logo} 
                            alt={job?.company?.name} 
                            className="object-contain p-1" // 'contain' is better for company logos
                        />
                        <AvatarFallback className="bg-indigo-50 text-indigo-600 rounded-xl font-bold">
                            <Building2 size={20} />
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h1 className='font-bold text-gray-900 group-hover:text-indigo-600 transition-colors'>
                            {job?.company?.name}
                        </h1>
                        <div className='flex items-center text-gray-500 text-xs gap-1 mt-0.5'>
                            <MapPin size={12} />
                            <span>{job?.location || "Remote / India"}</span>
                        </div>
                    </div>
                </div>

                {/* Floating "Apply" indicator on hover */}
                <div className='opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-indigo-600 p-1.5 rounded-full text-white shadow-lg'>
                    <ArrowUpRight size={16} />
                </div>
            </div>

            {/* Middle Section: Job Title & Description */}
            <div className='mb-6'>
                <h1 className='font-extrabold text-xl text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors'>
                    {job?.title}
                </h1>
                <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>
                    {job?.description}
                </p>
            </div>

            {/* Bottom Section: Meta Badges */}
            <div className='flex flex-wrap items-center gap-2 pt-4 border-t border-gray-50'>
                <Badge className='bg-indigo-50 text-indigo-700 border-none px-3 py-1 font-semibold rounded-lg hover:bg-indigo-100' variant="secondary">
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-orange-50 text-orange-700 border-none px-3 py-1 font-semibold rounded-lg hover:bg-orange-100' variant="secondary">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 border-none px-3 py-1 font-semibold rounded-lg hover:bg-purple-100' variant="secondary">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Subtle background decorative element */}
            <div className='absolute -bottom-4 -right-4 p-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity'>
                <Building2 size={100} />
            </div>
        </div>
    )
}

LatestJobCards.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string,
            logo: PropTypes.string // Path or URL to the logo
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        jobType: PropTypes.string,
        salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        location: PropTypes.string
    }).isRequired
}

export default LatestJobCards