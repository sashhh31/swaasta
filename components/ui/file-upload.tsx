"use client"

import { useState } from "react"
import { Upload, CheckCircle, X } from "lucide-react"
import { Button } from "./button"

interface FileUploadProps {
  onChange?: (file: File | null) => void
  accept?: string
  maxSize?: number // in bytes
  className?: string
  label?: string
  description?: string
}

export function FileUpload({
  onChange,
  accept = "image/*,application/pdf",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "",
  label = "Upload file",
  description = "JPG, PNG or PDF (max 5MB)",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setError(null)

    if (!selectedFile) {
      setFile(null)
      onChange?.(null)
      return
    }

    // Check file size
    if (selectedFile.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`)
      return
    }

    setFile(selectedFile)
    onChange?.(selectedFile)
  }

  const removeFile = () => {
    setFile(null)
    setError(null)
    onChange?.(null)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {file ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <div className="text-sm font-medium truncate max-w-[200px]">{file.name}</div>
              <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile} className="h-8 w-8 p-0" aria-label="Remove file">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer relative">
          <div className="flex flex-col items-center text-gray-500">
            <Upload className="h-10 w-10 mb-2" />
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs mt-1">{description}</span>
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
          </div>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept={accept}
          />
        </div>
      )}
    </div>
  )
} 