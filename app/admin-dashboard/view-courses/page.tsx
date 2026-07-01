"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, DollarSign, Tag, Key, Link as LinkIcon, FileText, Edit, X, CheckCircle, AlertCircle, FileImage, Eye, EyeOff, Trash2 } from "lucide-react";

interface Course {
  courseId: string;
  title: string;
  slug: string;
  desc: string;
  fullDesc?: string;
  category: string;
  duration: string;
  price: string;
  image: string;
  isActive?: boolean;
  icon?: string;
}

export default function ViewCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editForm, setEditForm] = useState({
    courseId: "",
    title: "",
    slug: "",
    desc: "",
    fullDesc: "",
    duration: "",
    price: "",
    category: "",
    isActive: true,
    icon: ""
  });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [editIconFile, setEditIconFile] = useState<File | null>(null);
  const [editIconPreview, setEditIconPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    setEditForm({
      courseId: course.courseId,
      title: course.title,
      slug: course.slug,
      desc: course.desc,
      fullDesc: course.fullDesc || course.desc,
      duration: course.duration,
      price: course.price,
      category: course.category,
      isActive: course.isActive !== false,
      icon: course.icon || ""
    });
    setEditImagePreview(course.image);
    setEditImageFile(null);
    setEditIconPreview(course.icon || "");
    setEditIconFile(null);
    setStatus("idle");
    setMessage("");
    setIsEditModalOpen(true);
  };

  const toggleCourseStatus = async (course: Course) => {
    const updatedStatus = course.isActive === false ? true : false;
    try {
      const payload = {
        courseId: course.courseId,
        title: course.title,
        slug: course.slug,
        desc: course.desc,
        fullDesc: course.fullDesc || course.desc,
        duration: course.duration,
        price: course.price,
        category: course.category,
        image: course.image,
        isActive: updatedStatus
      };

      const res = await fetch("/api/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.success) {
        await fetchCourses();
      } else {
        alert(result.message || "Failed to update course status.");
      }
    } catch (err) {
      console.error("Error toggling course status:", err);
      alert("An unexpected error occurred while toggling status.");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/courses?courseId=${courseId}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (result.success) {
        alert("Course deleted successfully!");
        await fetchCourses();
      } else {
        alert(result.message || "Failed to delete course.");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("An unexpected error occurred while deleting the course.");
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setEditForm(prev => ({
        ...prev,
        title: value,
        slug: generatedSlug
      }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditIconFile(file);
      setEditIconPreview(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    setMessage("");

    try {
      let finalImageUrl = editingCourse?.image || "";
      let finalIconUrl = editingCourse?.icon || "";

      // If a new image was chosen, upload it first
      if (editImageFile) {
        const uploadData = new FormData();
        uploadData.append("file", editImageFile);

        const uploadRes = await fetch("/api/courses/upload", {
          method: "POST",
          body: uploadData
        });
        const uploadResult = await uploadRes.json();

        if (!uploadResult.success) {
          setStatus("error");
          setMessage(uploadResult.message || "Failed to upload new image.");
          setSaving(false);
          return;
        }
        finalImageUrl = uploadResult.imageUrl;
      }

      // If a new icon was chosen, upload it first
      if (editIconFile) {
        const uploadIconData = new FormData();
        uploadIconData.append("file", editIconFile);

        const uploadIconRes = await fetch("/api/courses/upload", {
          method: "POST",
          body: uploadIconData
        });
        const uploadIconResult = await uploadIconRes.json();

        if (!uploadIconResult.success) {
          setStatus("error");
          setMessage(uploadIconResult.message || "Failed to upload new icon.");
          setSaving(false);
          return;
        }
        finalIconUrl = uploadIconResult.imageUrl;
      }

      // Save course changes
      const payload = {
        ...editForm,
        image: finalImageUrl,
        icon: finalIconUrl
      };

      const res = await fetch("/api/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setMessage("Course details updated successfully!");
        // Refresh local courses list
        await fetchCourses();
        setTimeout(() => {
          setIsEditModalOpen(false);
          setEditingCourse(null);
        }, 1200);
      } else {
        setStatus("error");
        setMessage(result.message || "Failed to update course details.");
      }
    } catch (err: any) {
      console.error("Edit Submit Error:", err);
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in relative">
      
      {/* Page Header banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#2F3E56] leading-none">
            All Courses
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            View and manage all dynamic courses currently registered in the database.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
          <p className="text-sm font-semibold">Loading courses database...</p>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.courseId} className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group">
              
              <div>
                {/* Course Header Banner / Image */}
                <div className="h-36 w-full bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <BookOpen className="w-12 h-12 text-gray-300" />
                  )}
                  
                  {/* Status tag */}
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                    course.isActive !== false ? "bg-green-600 text-white" : "bg-red-500 text-white"
                  }`}>
                    {course.isActive !== false ? "Active" : "Hidden"}
                  </span>

                  {/* Category tag */}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2F3E56] text-white shadow-sm">
                    {course.category}
                  </span>
                </div>

                {/* Course Details Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 h-10">
                    {course.title}
                  </h3>

                  {/* Metadatas */}
                  <div className="grid grid-cols-1 gap-1.5 border-t border-gray-100 pt-3 text-[11px] font-semibold text-gray-500">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">ID:</span>
                      <span className="text-[#2F3E56]">{course.courseId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-[#2F3E56]">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Fee:</span>
                      <span className="text-[#2F3E56]">₹ {parseInt(course.price || "0").toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Description details */}
                  <div className="space-y-1 pt-2 border-t border-gray-100">
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                      {course.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit Card Footer Action Buttons */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(course)}
                  className="flex-1 py-2 bg-[#2F3E56] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                  title="Edit details"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>

                <button
                  onClick={() => toggleCourseStatus(course)}
                  className={`p-2 border rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-sm ${
                    course.isActive !== false 
                      ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300" 
                      : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300"
                  }`}
                  title={course.isActive !== false ? "Hide Course" : "Show Course"}
                >
                  {course.isActive !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleDeleteCourse(course.courseId)}
                  className="p-2 border border-red-200 bg-red-50 text-red-650 hover:bg-red-100 hover:text-red-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                  title="Delete Course"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-150 shadow-sm p-12 text-center text-gray-400 font-semibold">
          No courses currently registered in the database.
        </div>
      )}

      {/* Course Edit Modal Overlay Drawer */}
      {isEditModalOpen && editingCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 lg:p-8 relative shadow-2xl animate-scale-in my-auto">
            
            {/* Modal Close Button */}
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingCourse(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#2F3E56]/15 flex items-center justify-center text-[#2F3E56]">
                <Edit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2F3E56] leading-none">
                  Edit Course Details
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Update the information below for {editingCourse.title}.
                </p>
              </div>
            </div>

            {/* Toast status info */}
            {status !== "idle" && (
              <div className={`p-4 mb-6 rounded-xl flex items-center gap-3 border ${
                status === "success" 
                  ? "bg-green-50 text-green-700 border-green-200" 
                  : "bg-red-50 text-red-700 border-red-200"
              }`}>
                {status === "success" ? <CheckCircle className="shrink-0" /> : <AlertCircle className="shrink-0" />}
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleEditSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Course ID (Read-only / Disabled) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">Course ID (Uneditable)</label>
                  <input
                    type="text"
                    value={editForm.courseId}
                    disabled
                    className="w-full px-3 py-2 border border-gray-255 rounded-lg text-sm bg-gray-100 text-gray-400 cursor-not-allowed font-medium"
                  />
                </div>

                {/* Course Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    required
                    placeholder="Course Title"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56]"
                  />
                </div>

                {/* Course Slug */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600">Course Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={editForm.slug}
                    onChange={handleEditChange}
                    placeholder="Course Slug (Optional - will auto-generate from title if left empty)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56]"
                  />
                </div>

                {/* Course Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600">Category</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] cursor-pointer"
                  >
                    <option value="Hospitality">Hospitality</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Communication">Communication</option>
                    <option value="Management">Management</option>
                    <option value="Professional Skills">Professional Skills</option>
                  </select>
                </div>

                {/* Course Duration */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={editForm.duration}
                    onChange={handleEditChange}
                    required
                    placeholder="Duration"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56]"
                  />
                </div>

                {/* Course Fee */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600">Fee (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    required
                    placeholder="Fee amount"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56]"
                  />
                </div>

                {/* Course Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600">Status</label>
                  <select
                    name="isActive"
                    value={editForm.isActive ? "true" : "false"}
                    onChange={(e) => setEditForm(prev => ({ ...prev, isActive: e.target.value === "true" }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] cursor-pointer bg-white"
                  >
                    <option value="true">Active (Visible to users)</option>
                    <option value="false">Hidden (Invisible to users)</option>
                  </select>
                </div>

                {/* Short Description */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-600">Short Description</label>
                  <textarea
                    name="desc"
                    value={editForm.desc}
                    onChange={handleEditChange}
                    required
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] resize-none"
                  />
                </div>

                {/* Full Description */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-600">Full Description</label>
                  <textarea
                    name="fullDesc"
                    value={editForm.fullDesc}
                    onChange={handleEditChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] resize-none"
                  />
                </div>

                {/* Cover Image Upload Preview / Dropzone */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-600">Cover Image</label>
                  <div className="border border-dashed border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center shrink-0">
                        {editImagePreview ? (
                          <img src={editImagePreview} alt="Preview" className="w-full h-full object-contain" />
                        ) : (
                          <FileImage className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-gray-700">Change Cover Image</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">JPEG, PNG or WEBP (Max 300KB)</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-1.5 bg-[#2F3E56] text-white text-[11px] font-bold rounded-lg pointer-events-none"
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                {/* Icon Upload Preview / Dropzone (Optional) */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-600">Course Icon (Optional)</label>
                  <div className="border border-dashed border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center shrink-0">
                        {editIconPreview ? (
                          <img src={editIconPreview} alt="Preview icon" className="w-full h-full object-contain" />
                        ) : (
                          <FileImage className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-gray-700">Change Course Icon</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">JPEG, PNG or WEBP (Max 150KB)</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-1.5 bg-[#2F3E56] text-white text-[11px] font-bold rounded-lg pointer-events-none"
                    >
                      Choose File
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingCourse(null);
                  }}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#2F3E56] hover:bg-[#1E293B] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
