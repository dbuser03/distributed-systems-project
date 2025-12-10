import React from "react";
import { DownloadIcon } from "../icons";

import { StoryFile } from "../../types/StoryTypes";

interface StoryAttachmentProps {
  file: StoryFile;
}

function StoryAttachment({ file }: StoryAttachmentProps) {
  const { fileName, fileData } = file;
  // Extract file extension and name
  const getFileExtension = (name: string): string => {
    const parts = name.split(".");
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "FILE";
  };

  const getFileIcon = (name: string): string => {
    const ext = name.split(".").pop()?.toLowerCase();

    // Return appropriate Font Awesome icon class based on file type
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext || "")) {
      return "fa fa-file-image-o";
    } else if (["pdf"].includes(ext || "")) {
      return "fa fa-file-pdf-o";
    } else if (["doc", "docx"].includes(ext || "")) {
      return "fa fa-file-word-o";
    } else if (["xls", "xlsx"].includes(ext || "")) {
      return "fa fa-file-excel-o";
    } else if (["zip", "rar", "7z"].includes(ext || "")) {
      return "fa fa-file-archive-o";
    } else if (["mp4", "avi", "mov", "mkv"].includes(ext || "")) {
      return "fa fa-file-video-o";
    } else if (["mp3", "wav", "ogg"].includes(ext || "")) {
      return "fa fa-file-audio-o";
    }
    return "fa fa-file-o";
  };

  const getFileBadgeColor = (name: string): string => {
    const ext = name.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext || "")) {
      return "badge-info";
    } else if (["pdf"].includes(ext || "")) {
      return "badge-error";
    } else if (["doc", "docx", "txt"].includes(ext || "")) {
      return "badge-primary";
    } else if (["xls", "xlsx"].includes(ext || "")) {
      return "badge-success";
    } else if (["zip", "rar", "7z"].includes(ext || "")) {
      return "badge-warning";
    }
    return "badge-neutral";
  };

  const handleDownload = () => {
    try {
      // Convert base64 to blob
      const byteCharacters = atob(fileData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  const getFileSize = (base64: string): string => {
    // Approximate size calculation from base64
    const sizeInBytes = (base64.length * 3) / 4;
    if (sizeInBytes < 1024) return `${sizeInBytes.toFixed(0)} B`;
    if (sizeInBytes < 1024 * 1024)
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="card bg-base-100 border border-base-300 mb-2">
      <div className="card-body p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1 min-w-0">
            {/* Icon and Label Vertical */}
            <div
              className="shrink-0 flex flex-col items-center"
              style={{ fontSize: "1.5rem" }}
            >
              <i className={`${getFileIcon(fileName)} text-primary`}></i>
              <span
                className={`badge badge-xs px-3 mt-3 ${getFileBadgeColor(
                  fileName
                )}`}
              >
                {getFileExtension(fileName)}
              </span>
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-1">
                <h3 className="font-semibold text-sm truncate" title={fileName}>
                  {fileName}
                </h3>
              </div>
              <p className="text-xs text-base-content/60">
                Attachment • {getFileSize(fileData)}
              </p>
            </div>
          </div>
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="btn btn-primary btn-sm gap-4 shrink-0 ml-4"
            aria-label={`Download ${fileName}`}
          >
            <DownloadIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Render a list of attachments
interface StoryAttachmentsProps {
  files: StoryFile[];
}

export function StoryAttachments({ files }: StoryAttachmentsProps) {
  if (!files || files.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {files.map((file, idx) => (
        <StoryAttachment key={file.fileName + idx} file={file} />
      ))}
    </div>
  );
}

export default StoryAttachment;
