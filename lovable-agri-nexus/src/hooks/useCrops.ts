
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface Crop {
  id: string;
  name: string;
  variety: string | null;
  plot_size: string | null;
  sowing_date: string | null;
  expected_harvest: string | null;
  current_stage: string | null;
  progress: number | null;
  status: string | null;
  next_task: string | null;
  next_task_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CropTask {
  id: string;
  crop_id: string;
  task_name: string;
  task_date: string;
  priority: string;
  status: string;
  description: string | null;
}

export const useCrops = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [tasks, setTasks] = useState<CropTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCrops = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('crops')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCrops(data || []);
    } catch (error) {
      console.error('Error fetching crops:', error);
      toast({
        title: "Error",
        description: "Failed to fetch crops",
        variant: "destructive"
      });
    }
  };

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('crop_tasks')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('task_date', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addCrop = async (cropData: Partial<Crop>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('crops')
        .insert([{ ...cropData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setCrops(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Crop added successfully"
      });
      
      return data;
    } catch (error) {
      console.error('Error adding crop:', error);
      toast({
        title: "Error",
        description: "Failed to add crop",
        variant: "destructive"
      });
    }
  };

  const updateCrop = async (id: string, updates: Partial<Crop>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('crops')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setCrops(prev => prev.map(crop => crop.id === id ? data : crop));
      toast({
        title: "Success",
        description: "Crop updated successfully"
      });
    } catch (error) {
      console.error('Error updating crop:', error);
      toast({
        title: "Error",
        description: "Failed to update crop",
        variant: "destructive"
      });
    }
  };

  const deleteCrop = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('crops')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setCrops(prev => prev.filter(crop => crop.id !== id));
      toast({
        title: "Success",
        description: "Crop deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting crop:', error);
      toast({
        title: "Error",
        description: "Failed to delete crop",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchCrops(), fetchTasks()]).finally(() => setLoading(false));
    }
  }, [user]);

  return {
    crops,
    tasks,
    loading,
    addCrop,
    updateCrop,
    deleteCrop,
    refetch: () => {
      fetchCrops();
      fetchTasks();
    }
  };
};
