
import React, { useState } from 'react';
import { 
  Building2, MapPin, DollarSign, Home, Key, Layout, List, 
  Camera, Play, Square, BedDouble, Bath, Calendar, 
  CheckCircle2, Sparkles, Plus, X, Upload, Brain
} from 'lucide-react';
import { Property } from '../types';

export const AddProperty: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Property>>({
    type: 'HOUSE',
    status: 'FOR_SALE',
    amenities: [],
    tags: []
  });
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const amenitiesList = [
    'Private Pool', 'Gym', 'Garage', 'Garden', 'Smart Home', 'Security System', 
    'Solar Panels', 'Back-up Generator', 'Elevator', 'Concierge', 'High-speed Internet', 'Balcony'
  ];

  const toggleAmenity = (amenity: string) => {
    const current = formData.amenities || [];
    if (current.includes(amenity)) {
      setFormData({ ...formData, amenities: current.filter(a => a !== amenity) });
    } else {
      setFormData({ ...formData, amenities: [...current, amenity] });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Fix: Explicitly type 'file' as 'File' to resolve 'unknown' type error when passing to readAsDataURL
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Add New Property</h1>
          <p className="text-slate-500 font-medium italic">Create a high-impact listing with video tours and AI optimization.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          Step <span className="text-blue-600 text-lg">{step}</span> of 4
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
        
        {step === 1 && (
          <div className="space-y-10 animate-slideInRight">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><InfoIcon /></div>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layout size={14} /> Property Title</label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none"
                  placeholder="e.g. Skyline Luxury Penthouse"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><DollarSign size={14} /> List Price (USD)</label>
                <input 
                  type="number"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Key size={14} /> Listing Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {['FOR_SALE', 'FOR_RENT'].map(s => (
                    <button
                      key={s}
                      onClick={() => setFormData({...formData, status: s as any})}
                      className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.status === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Building2 size={14} /> Property Type</label>
                <select 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none appearance-none"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value="HOUSE">House</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="OFFICE">Office</option>
                  <option value="LAND">Land</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-slideInRight">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><MapPin size={20} /></div>
              Location & Details
            </h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Full Address / Neighborhood</label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none"
                  placeholder="e.g. Bole Road, Addis Ababa, Ethiopia"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><BedDouble size={14} /> Beds</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" value={formData.beds} onChange={e => setFormData({...formData, beds: Number(e.target.value)})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Bath size={14} /> Baths</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" value={formData.baths} onChange={e => setFormData({...formData, baths: Number(e.target.value)})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Square size={14} /> Area (sqft)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" value={formData.sqft} onChange={e => setFormData({...formData, sqft: Number(e.target.value)})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={14} /> Year Built</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" value={formData.yearBuilt} onChange={e => setFormData({...formData, yearBuilt: Number(e.target.value)})} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><List size={14} /> Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all border ${
                        formData.amenities?.includes(amenity) 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-600'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-slideInRight">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Camera size={20} /></div>
              Medias & Visuals
            </h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Upload Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100">
                      <img src={img} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-400 group">
                    <Upload size={24} className="group-hover:scale-110 transition-transform mb-2" />
                    <span className="text-[10px] font-black uppercase">Add Photo</span>
                    <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Play size={14} /> Video Tour URL (YouTube/TikTok)</label>
                <div className="relative group">
                  <Play className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none"
                    placeholder="https://..."
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic">Recommended: Vertical video (9:16) for TikTok-style tour experiences.</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 animate-slideInRight text-center py-4">
             <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-blue-200 mb-6">
                <Sparkles size={40} className="text-white" />
             </div>
             <h2 className="text-3xl font-black text-slate-900">Review & Optimize</h2>
             <p className="text-slate-500 max-w-lg mx-auto font-medium">Your listing is almost ready. We'll use AI to optimize your description for maximum conversion based on the details provided.</p>
             
             <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 space-y-6 text-left max-w-2xl mx-auto">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Brain size={14} className="text-indigo-600" /> Description Preview</label>
                  <textarea 
                    className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-sm font-medium leading-relaxed outline-none focus:ring-4 focus:ring-indigo-100"
                    rows={6}
                    placeholder="Enter or generate description..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <button className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:text-indigo-800 transition-colors">
                  <Sparkles size={14} /> Generate with AI
                </button>
             </div>

             <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-3xl max-w-2xl mx-auto text-left">
                <div className="p-3 bg-white rounded-2xl text-blue-600">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-xs text-blue-900 font-bold leading-relaxed">
                  By publishing, your property will be visible on the "Area Map" and searchable across the platform instantly.
                </p>
             </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              step === 1 ? 'invisible' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            Previous
          </button>
          {step < 4 ? (
            <button 
              onClick={nextStep}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              Next Step <ChevronRightIcon />
            </button>
          ) : (
            <button 
              onClick={() => alert('Property published!')}
              className="px-12 py-5 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3"
            >
              <RocketIcon /> Publish Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal Helpers
const InfoIcon = () => <Building2 size={20} />;
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2s-7 10-7 10" />
    <path d="m9 15 3 3" />
    <path d="M11 7a2 2 0 0 0 0 4" />
  </svg>
);
