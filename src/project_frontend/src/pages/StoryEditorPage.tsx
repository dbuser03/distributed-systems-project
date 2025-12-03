import { useParams } from "react-router-dom";
import { useStoryEditor } from "../hooks";
import { StoryEditorForm } from "../components/ui/editor";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useUserProfile } from "../hooks";
import { LoginRequired } from "../components/ui/LoginRequired";
import { LoadingProfile } from "../components/ui/LoadingProfile";

function StoryEditorPage() {
  const { id } = useParams<{ id?: string }>();
  const {
    formData,
    isEditing,
    updateField,
    addTag,
    removeTag,
    canSaveDraft,
    canPublish,
    handleSaveDraft,
    handlePublish,
    handleCancel,
  } = useStoryEditor(id);

    const { authClient, isAuthenticated, login } = useAuth() as any; 
  
    const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
  
    useEffect(() => {
  
      if (isAuthenticated && authClient) {
        const principal = authClient.getIdentity().getPrincipal().toText();
        setCurrentUserId(principal);
      }
    }, [isAuthenticated, authClient]);
  
  
    const profile = useUserProfile(currentUserId);
    
  
    if (!isAuthenticated) {
      return (
        <LoginRequired login={login} />
      );
    }
  
    if (!profile) {
      return (
        <LoadingProfile />
      );
    }
  
    const { userId, threadsCreated, contributions, credibilityScore } = profile;

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">
          {isEditing ? "Edit Story" : "Story Editor"}
        </h1>

        <StoryEditorForm
          formData={formData}
          canSaveDraft={canSaveDraft}
          canPublish={canPublish}
          onUpdateField={updateField}
          onAddTag={addTag}
          onRemoveTag={removeTag}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default StoryEditorPage;
