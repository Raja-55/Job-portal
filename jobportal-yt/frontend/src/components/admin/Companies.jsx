import  { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search, Filter } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className='min-h-screen bg-gray-50/50'>
            <div className='max-w-6xl mx-auto px-4 py-10'>
                
                {/* Header Section */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
                    <div>
                        <div className='flex items-center gap-2 mb-1'>
                            <div className='p-1.5 bg-indigo-100 rounded-lg'>
                                <Building2 className='h-5 w-5 text-indigo-600' />
                            </div>
                            <h1 className='text-2xl font-bold text-gray-900'>Company Management</h1>
                        </div>
                        <p className='text-gray-500 text-sm'>Register and manage your organizations here.</p>
                    </div>
                    
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all flex items-center gap-2 rounded-full px-6"
                    >
                        <Plus size={18} />
                        <span>Register New Company</span>
                    </Button>
                </div>

                {/* Filter & Search Bar */}
                <div className='bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6'>
                    <div className='flex items-center gap-4'>
                        <div className='relative flex-1 max-w-md'>
                            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                                <Search size={18} />
                            </div>
                            <Input
                                className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-indigo-500 rounded-xl"
                                placeholder="Search companies by name..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        
                        {/* Decorative Filter Indicator */}
                        <Button variant="outline" className="hidden sm:flex items-center gap-2 border-gray-200 rounded-xl text-gray-600">
                            <Filter size={16} />
                            <span>Filters</span>
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
                    <CompaniesTable />
                </div>
                
                {/* Empty State Helper (Optional logic) */}
                <div className='mt-4 text-center'>
                    <p className='text-xs text-gray-400'>
                        Showing all registered organizations associated with your recruiter profile.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Companies