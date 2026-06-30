"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, FolderPlus, Upload, FileImage, CheckCircle, AlertCircle } from "lucide-react";

export default function AddCoursePage() {
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    slug: "",
    desc: "",
    duration: "",
    price: "",
    category: "Hospitality"
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [existingIds, setExistingIds] = useState<string[]>([]);
  const [isIdExists, setIsIdExists] = useState(false);

  // Fetch existing course IDs on mount
  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.courses) {
          setExistingIds(data.courses.map((c: any) => c.courseId.toUpperCase().trim()));
        }
      })
      .catch(err => console.error("Error loading existing course IDs:", err));
  }, []);

  // Validate ID uniqueness in real-time
  useEffect(() => {
    const enteredId = form.courseId.toUpperCase().trim();
    if (enteredId) {
      setIsIdExists(existingIds.includes(enteredId));
    } else {
      setIsIdExists(false);
    }
  }, [form.courseId, existingIds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug if title changes
    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setForm(prev => ({
        ...prev,
        title: value,
        slug: generatedSlug
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerateCourseId = () => {
    if (form.title) {
      // Generate initials from the title
      const initials = form.title
        .split(/\s+/)
        .map(word => word[0])
        .join("")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase();
      
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      setForm(prev => ({ ...prev, courseId: `${initials}-${randomSuffix}` }));
    } else {
      // Fallback random ID
      const randomId = "FC-" + Math.floor(100 + Math.random() * 900);
      setForm(prev => ({ ...prev, courseId: randomId }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setMessage("");

    if (isIdExists) {
      setStatus("error");
      setMessage("This Course ID is already in use. Please enter or generate a unique ID.");
      setSubmitting(false);
      return;
    }

    try {
      if (!imageFile) {
        setStatus("error");
        setMessage("Please select a cover image for the course.");
        setSubmitting(false);
        return;
      }

      // Step 1: Upload the Image
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      const uploadRes = await fetch("/api/courses/upload", {
        method: "POST",
        body: uploadData
      });
      const uploadResult = await uploadRes.json();

      if (!uploadResult.success) {
        setStatus("error");
        setMessage(uploadResult.message || "Failed to upload cover image.");
        setSubmitting(false);
        return;
      }

      const imageUrl = uploadResult.imageUrl;

      // Step 2: Register the Course
      const coursePayload = {
        ...form,
        image: imageUrl
      };

      const courseRes = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coursePayload)
      });
      const courseResult = await courseRes.json();

      if (courseResult.success) {
        setStatus("success");
        setMessage("Course created successfully!");
        // Add new ID to existingIds list
        const newId = form.courseId.toUpperCase().trim();
        if (newId) {
          setExistingIds(prev => [...prev, newId]);
        }
        // Reset form
        setForm({
          courseId: "",
          title: "",
          slug: "",
          desc: "",
          duration: "",
          price: "",
          category: "Hospitality"
        });
        setImageFile(null);
        setImagePreview("");
      } else {
        setStatus("error");
        setMessage(courseResult.message || "Failed to save course.");
      }
    } catch (err: any) {
      console.error("Save Course Error:", err);
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800">
      
      {/* Top Alert banner info matching card layout */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
          <FolderPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#2F3E56] leading-none">
            Add New Course
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Create a new course and provide the details below.
          </p>
        </div>
      </div>

      {/* Main Form container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6 lg:p-8 space-y-6">
        
        {/* Course Information Section Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-[#2F3E56]/15 flex items-center justify-center text-[#2F3E56]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#2F3E56]">
            Course Information
          </h3>
        </div>

        {/* Status Toast Message */}
        {status !== "idle" && (
          <div className={`p-4 rounded-xl flex items-center gap-3 border ${
            status === "success" 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {status === "success" ? <CheckCircle className="shrink-0" /> : <AlertCircle className="shrink-0" />}
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Course Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Course Title"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] bg-gray-50 focus:bg-white transition-all"
            />
          </div>

          {/* Course Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700">Course Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Enter Course Slug (E.g. ui-ux-design)"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] bg-gray-50 focus:bg-white transition-all"
            />
          </div>

          {/* Course ID (Dynamic User Input / Generation Support) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700">Course ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
                placeholder="Enter Course ID (E.g. HPF)"
                required
                className={`flex-1 px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-1 transition-all ${
                  isIdExists
                    ? "border-red-500 bg-red-50/30 focus:ring-red-500 text-red-900"
                    : "border-gray-200 bg-gray-50 focus:ring-[#2F3E56] focus:bg-white"
                }`}
              />
              <button
                type="button"
                onClick={handleGenerateCourseId}
                className="px-4 py-2 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0"
              >
                Generate ID
              </button>
            </div>
            {isIdExists && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                This Course ID is already in use and cannot be reused.
              </p>
            )}
          </div>

          {/* Course Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] bg-gray-50 focus:bg-white transition-all cursor-pointer"
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
            <label className="text-sm font-bold text-gray-700">Course Duration</label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Enter Course Duration"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] bg-gray-50 focus:bg-white transition-all"
            />
          </div>

          {/* Course Fee */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700">Course Fee</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter Course Fee"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] bg-gray-50 focus:bg-white transition-all"
            />
          </div>

          {/* Short Description (Full width) */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Short Description</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Enter A Short Description For The Course"
              required
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2F3E56] bg-gray-50 focus:bg-white transition-all resize-y"
            />
          </div>

          {/* Cover Image Upload (Full width) */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Cover Image Upload</label>
            
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-gray-100/50 transition-all relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="coverImageInput"
              />
              
              {imagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="max-h-48 object-contain rounded-lg border border-gray-200"
                  />
                  <p className="text-xs text-gray-500 font-medium">Selected file: {imageFile?.name}</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                    <FileImage className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700">Upload Course Cover Image</p>
                    <p className="text-xs text-gray-400 mt-1">Recommended Size: 1200x630px (Max 300KB)</p>
                  </div>
                </>
              )}

              <button
                type="button"
                className="px-6 py-2 bg-[#2F3E56] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-lg pointer-events-none transition-all shadow-sm"
              >
                Choose File
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-[#2F3E56] hover:bg-[#1E293B] text-white text-sm font-bold rounded-lg cursor-pointer transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              "+ Save Course"
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
