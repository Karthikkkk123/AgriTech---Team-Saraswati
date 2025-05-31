
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Plus, Calendar, Droplets, Sprout, AlertTriangle, CheckCircle, Eye, Edit, Trash2 } from "lucide-react";
import { useCrops } from "@/hooks/useCrops";
import { useForm } from "react-hook-form";

const CropManagement = () => {
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const { crops, tasks, loading, addCrop, updateCrop, deleteCrop } = useCrops();
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (data: unknown) => {
    await addCrop(data);
    reset();
    setShowAddCrop(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "attention": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors">
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Crop Management
              </h1>
              <p className="text-muted-foreground mt-2">Track and manage your crop lifecycle</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddCrop(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Crop
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Crops", value: crops.length, icon: Sprout, color: "from-green-500 to-green-600" },
            { title: "Total Area", value: `${crops.reduce((acc, crop) => acc + parseFloat(crop.plot_size?.replace(/[^0-9.]/g, '') || '0'), 0).toFixed(1)} acres`, icon: "div", color: "from-blue-500 to-blue-600" },
            { title: "Upcoming Tasks", value: tasks.length, icon: Calendar, color: "from-purple-500 to-purple-600" },
            { title: "Health Status", value: "Good", icon: CheckCircle, color: "from-emerald-500 to-emerald-600" }
          ].map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{item.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                    {typeof item.icon === 'string' ? (
                      <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
                    ) : (
                      <item.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Crop List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Crops</h2>
            {crops.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700">
                <CardContent className="p-12 text-center">
                  <Sprout className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No crops yet</h3>
                  <p className="text-gray-500 mb-4">Start by adding your first crop to begin tracking.</p>
                  <Button onClick={() => setShowAddCrop(true)} className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Crop
                  </Button>
                </CardContent>
              </Card>
            ) : (
              crops.map((crop) => (
                <Card key={crop.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                          {crop.name}
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{crop.variety}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(crop.status || 'healthy')}>
                          {crop.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{crop.name} - Detailed View</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Variety</Label>
                                    <p className="text-sm text-muted-foreground">{crop.variety || 'Not specified'}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Plot Size</Label>
                                    <p className="text-sm text-muted-foreground">{crop.plot_size || 'Not specified'}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Sowing Date</Label>
                                    <p className="text-sm text-muted-foreground">{crop.sowing_date || 'Not set'}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Expected Harvest</Label>
                                    <p className="text-sm text-muted-foreground">{crop.expected_harvest || 'Not set'}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Current Stage</Label>
                                    <p className="text-sm text-muted-foreground">{crop.current_stage}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Progress</Label>
                                    <div className="flex items-center gap-2">
                                      <Progress value={crop.progress || 0} className="flex-1" />
                                      <span className="text-sm font-medium">{crop.progress || 0}%</span>
                                    </div>
                                  </div>
                                </div>
                                {crop.notes && (
                                  <div>
                                    <Label className="text-sm font-medium">Notes</Label>
                                    <p className="text-sm text-muted-foreground mt-1">{crop.notes}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20" onClick={() => deleteCrop(crop.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Plot Size:</span>
                          <span className="ml-2 font-medium">{crop.plot_size || 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stage:</span>
                          <span className="ml-2 font-medium">{crop.current_stage}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sown:</span>
                          <span className="ml-2 font-medium">{crop.sowing_date || 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Harvest:</span>
                          <span className="ml-2 font-medium">{crop.expected_harvest || 'Not set'}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground font-medium">Growth Progress</span>
                          <span className="text-sm font-bold text-green-600">{crop.progress || 0}%</span>
                        </div>
                        <Progress value={crop.progress || 0} className="h-3 bg-gray-200 dark:bg-gray-700">
                          <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500" />
                        </Progress>
                      </div>
                      
                      {crop.next_task && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Next Task:</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-blue-700 dark:text-blue-200">{crop.next_task}</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">{crop.next_task_date}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No upcoming tasks</p>
                  ) : (
                    tasks.slice(0, 5).map((task, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white">{task.task_name}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{task.task_date}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors" variant="outline">
                    <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                    Log Irrigation
                  </Button>
                  <Button className="w-full justify-start hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors" variant="outline">
                    <Sprout className="w-4 h-4 mr-2 text-green-500" />
                    Record Growth
                  </Button>
                  <Button className="w-full justify-start hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Crop Dialog */}
        <Dialog open={showAddCrop} onOpenChange={setShowAddCrop}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Crop</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Crop Name *</Label>
                  <Input id="name" {...register('name', { required: true })} placeholder="e.g., Tomatoes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variety">Variety</Label>
                  <Input id="variety" {...register('variety')} placeholder="e.g., Cherokee Purple" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plot_size">Plot Size</Label>
                  <Input id="plot_size" {...register('plot_size')} placeholder="e.g., 2 acres" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sowing_date">Sowing Date</Label>
                  <Input id="sowing_date" {...register('sowing_date')} type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expected_harvest">Expected Harvest</Label>
                  <Input id="expected_harvest" {...register('expected_harvest')} type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_stage">Current Stage</Label>
                  <Select onValueChange={(value) => setValue('current_stage', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Seedling">Seedling</SelectItem>
                      <SelectItem value="Vegetative Growth">Vegetative Growth</SelectItem>
                      <SelectItem value="Flowering">Flowering</SelectItem>
                      <SelectItem value="Fruit Development">Fruit Development</SelectItem>
                      <SelectItem value="Harvest Ready">Harvest Ready</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" {...register('notes')} placeholder="Any special notes or requirements..." />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  Add Crop
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddCrop(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CropManagement;
