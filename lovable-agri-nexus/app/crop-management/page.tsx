import { useEffect, useState } from 'react';
import { getCrops, createCrop } from '@/lib/api';
import { Crop } from '@/lib/types';

export default function CropManagement() {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCrops();
    }, []);

    async function loadCrops() {
        try {
            const data = await getCrops();
            setCrops(data);
        } catch (error) {
            console.error('Error loading crops:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleAddCrop(cropData: Crop) {
        try {
            const newCrop = await createCrop(cropData);
            setCrops(prev => [...prev, newCrop]);
        } catch (error) {
            console.error('Error adding crop:', error);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Crop Management</h1>
                <button
                    onClick={() => {/* Open add crop dialog */}}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    Add New Crop
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crops.map(crop => (
                        <CropCard key={crop.id} crop={crop} />
                    ))}
                </div>
            )}
        </div>
    );
}

function CropCard({ crop }: { crop: Crop }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-semibold">{crop.name}</h2>
                    {crop.variety && (
                        <p className="text-gray-600">Variety: {crop.variety}</p>
                    )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                    crop.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {crop.status}
                </span>
            </div>
            
            <div className="space-y-4">
                <div>
                    <p className="text-gray-600">Growth Stage: {crop.current_stage}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${crop.progress}%` }}
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{crop.progress}% Complete</p>
                </div>

                {crop.next_task && (
                    <div>
                        <p className="text-gray-600">Next Task:</p>
                        <p className="text-sm font-medium">{crop.next_task}</p>
                        <p className="text-sm text-gray-500">Due: {crop.next_task_date}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-600">Sowing Date:</p>
                        <p>{crop.sowing_date}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Expected Harvest:</p>
                        <p>{crop.expected_harvest}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}